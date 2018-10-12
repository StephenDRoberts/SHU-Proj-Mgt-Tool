var express = require('express');
var app = express();
var routes = require('./routes/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// app.use(express.static("./super6-react/build"));

routes(app)

var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, function (err, client) {

    app.set('myDb', client.db('projMgt'));

})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("server listening on port " + PORT));