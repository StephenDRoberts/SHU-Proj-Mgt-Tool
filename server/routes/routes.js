var express = require("express");
var router = express.Router();
var myControllers = require('../controller/controller.js')


router = function(app){

    app.route('/api/provideData')
    .get((req,res)=>{myControllers.provideData(app,req,res);})

    app.route('/api/saveData')
    .put((req,res)=>{myControllers.saveData(app,req,res);})

    app.route('/api/signup')
    .post((req,res)=>{myControllers.signup(app,req,res);})

}

module.exports = router