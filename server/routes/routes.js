var express = require("express");
var router = express.Router();
var myControllers = require('../controller/controller.js')

router = function(app){

    app.route('/api/provideData')
    .post((req,res)=>{myControllers.provideData(app,req,res);})

    app.route('/api/saveData')
    .put((req,res)=>{myControllers.saveData(app,req,res);})

    app.route('/api/signup')
    .post((req,res)=>{myControllers.signup(app,req,res);})

    app.route('/api/login')
    .post((req,res)=>{myControllers.login(app,req,res);})

    app.route('/api/deleteAccount')
    .post((req,res)=>{myControllers.deleteAccount(app,req,res);})

    app.route('/api/setupAccount')
    .post((req,res)=>{myControllers.setupAccount(app,req,res);})

    app.route('/api/shareCheck')
    .post((req,res)=>{myControllers.shareCheck(app,req,res);})

}

module.exports = router