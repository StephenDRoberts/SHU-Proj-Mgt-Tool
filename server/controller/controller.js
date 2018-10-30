var User = require('../mongoose/userSchema.js');
var express = require('express')

module.exports = {
    provideData: function (app, req, res) {
        
        let user = req.body.user
        
        app.get('myDb').collection('projects').find({"user":user}).toArray(function (err, docs) {
            if (err) {
                console.error(err)
            }
            res.json(docs)
        })
    },

    saveData: function (app, req, res) {
        let data = req.body
        app.get('myDb').collection('projects').updateOne(
            { 'user': 'user1' },
            {
                $set: {
                    'projects': data.projects
                },
            },
            { upsert: true },
            function (err, dbresp) {
                if (err) {
                    console.error(err)
                }
            })

    },

    signup: function (app, req, res) {


        let email = req.body.email;
        let user = req.body.user
        let password = req.body.password
        let confPassword = req.body.confPassword

        let userData = {
            email: email,
            user: user,
            password: password,
            confPassword: confPassword
        }

        // If passwords don't match - return an error
        if (password !== confPassword) {

            let err = new Error('Passwords do not match');
            err.status = 400;
            return console.log(err);
        }

        if (email && user && password && confPassword) {
            console.log('trying to create a new user...')

            app.get('myDb').collection('users').insertOne(userData, function (err, docs) {
                if (err) {
                    console.error(err)
                }
                return res.json({ 'msg': 'succesful' })
            })
        }
    },

    login: function (app, req, res) {

        let user = req.body.user
        let password = req.body.password

        let userData = {
            "user": user,
            "password": password,
        }

        app.get('myDb').collection('users').find(userData).toArray(function (err, docs) {
            if (err) {
                console.error(err)
            }
            res.json(docs)
        })
    },

    deleteAccount: function (app, req, res) {

        let user = req.body.user
    

        app.get('myDb').collection('users').deleteMany({"user": user}, function (err, docs) {
            if (err) {
                console.error(err)
            }
            res.json(docs)
        })
    }

}