var express = require('express');
var app = express();
var routes = require('./routes/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(require('body-parser').urlencoded({ extended: true }));


routes(app)

var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/projMgt',
    {
        useNewUrlParser: true,
        useCreateIndex: true
    })
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    //we're connected
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("server listening on port " + PORT));