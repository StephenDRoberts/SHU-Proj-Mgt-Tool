var express = require('express');
var app = express();
var routes = require('./routes/routes');
var session = require('client-sessions')
var myControllers = require('./controller/controller.js')
var cookieParser = require('cookie-parser')

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(cookieParser())

//SESSION SETUP
// HELP FROM https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions
app.use(session({
    cookieName: 'session',
    secret: 'projMgt_session',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}))

app.use(function (req, res, next) {
    if (req.session && req.session.user) {

        app.get('myDb').collection('users').find({ "user": req.session.user }).toArray(function (err, docs) {
            if (err) {
                console.error(err)
            }
            if (docs.length !== 0) {
                req.user = docs[0].user;
                delete req.user.password; // delete the password from the session
                req.session.user = docs[0].user;  //refresh the session value
                res.locals.user = docs[0].user;
            }
            // finishing processing the middleware and run the route
            next()
        })
    } else {
        next()
    }
});

// app.route('/api/logout')
//     .get((req,res)=>{myControllers.logout(app,req,res);})

routes(app)

var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, function (err, client) {

    app.set('myDb', client.db('projMgt'));

})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("server listening on port " + PORT));