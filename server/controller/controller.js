var User = require('../mongoose/userSchema.js');
var express = require('express')
var bcrypt = require('bcryptjs')
var cookieParser = require('cookie-parser')

module.exports = {
    provideData: function (app, req, res) {
        let user = ''
        if(req.session && req.session.user){
            user = req.session.user
        } else {
            user = req.body.user
        }
        
        app.get('myDb').collection('projects').find({ "user": user }).toArray(function (err, docs) {
            if (err) {
                console.error(err)
            }
            docs.push(user)
            res.json(docs)
        })
    },

    saveData: function (app, req, res) {
        let data = req.body.data
        let user = req.body.data.user
        
        app.get('myDb').collection('projects').updateOne(
            { 'user': user },
            {
                $set: {
                    'projects': data.projects,
                    'styles': data.styles
                },
            },
            { upsert: true },
            function (err, dbresp) {
                if (err) {
                    console.error(err)
                }
                res.json({ "msg": "save succesful" })
            })

    },

    signup: function (app, req, res) {
        let email = req.body.email;
        let user = req.body.user
        let password = req.body.password
        let confPassword = req.body.confPassword

        // If passwords don't match - return an error
        if (password !== confPassword) {

            let err = new Error('Passwords do not match');
            err.status = 400;
            return console.log(err);
        }

        if (email && user && password && confPassword) {

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    let userData = {
                        email: email,
                        user: user,
                        hash: hash,
                    }
                    
                    app.get('myDb').collection('users').insertOne(userData, function (err, docs) {
                        if (err) {
                            console.error(err)
                        }
                        // sets a cookie with user's info
                        req.session.user = user;
                        return res.json(docs)
                    })
                })
            })


        }
    },

    setupAccount: function (app, req, res) {
        let templateData =
        {
            "user": req.body.user,
            "projects": [],
            "styles": []
        }

        app.get('myDb').collection('projects').insertOne(templateData, function (err, docs) {
            if (err) {
                console.error(err)
            }
            return res.json(docs)
        }
        )
    },

    login: function (app, req, res) {
        
        let user = req.body.user
        let password = req.body.password

        //get hash
        app.get('myDb').collection('users').find({ "user": user }).toArray(function (err, docs) {
            if (err) {
                console.error(err)
            }
            
            if (docs.length !== 0) {

                let hash = docs[0].hash
                let response = false

                bcrypt.compare(password, hash).then(function (res) {
                    if(err){console.log(err)}
                    // res == true
                    if (res == true) {
                        // sets a cookie with user's info
                        req.session.user = user;
                        
                        response = true
                    }
                }).then(function () {
                    if (response == true) {
                        res.json(docs)
                    } else {
                        res.json([])
                    }

                })
            } else { res.json(docs) }
        })

    },

    logout: function (app, req, res){
        req.session.reset()
        res.json({'status': 'ok'})
    },

    deleteAccount: function (app, req, res) {
        let user = req.body.user
        app.get('myDb').collection('users').deleteMany({ "user": user }, function (err, docs) {
            if (err) {
                console.error(err)
            }
        })
        app.get('myDb').collection('projects').deleteMany({ "user": user }, function (err, docs) {
            if (err) {
                console.error(err)
            }
            req.session.reset()
            res.json(docs)
        })
    },
    shareCheck: function (app, req, res) {

        let user = req.body.user
                
        app.get('myDb').collection('projects').find({ "user": user }).toArray(function (err, docs) {
            if (err) {
                console.error(err)
            }
        
            if (docs.length == 0) {
                
            } else if (docs[0].projects == null) {
                docs[0].projects = []
            } 
                res.json(docs)
            
        })
    }

}