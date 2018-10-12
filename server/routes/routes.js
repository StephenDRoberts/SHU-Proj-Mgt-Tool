var express = require("express");
var router = express.Router();
var myControllers = require('../controller/controller.js')

router = function(app){

    app.route('/api/provideData')
    .get((req,res)=>{myControllers.provideData(app,req,res);})

}

module.exports = router