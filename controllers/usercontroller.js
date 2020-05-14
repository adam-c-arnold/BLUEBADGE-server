require('dotenv').config();
const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const User = sequelize.import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/createuser', function (req, res) {
    
    let firstName = req.body.user.firstName;
    let lastName = req.body.user.lastName;
    let email = req.body.user.email;
    let password = req.body.user.password;

    User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: bcrypt.hashSync(password, 10)
    })
    .then(
        function createSuccess(user) {

            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

router.post('/signin', function(req, res) {

    User.findOne({ where: {email: req.body.user.email}}).then(

        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                    //console.log("value matches:", matches);
                    if (matches) {

                        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({ error: "kick rocks!"});
                    }
                }) ;
            } else {
                res.status(500).send({ error: "failed to authenticate!"});
            }
        },
        function (err) {
            res.status(501).send({ error: "get to steppin!"});
        }

    );
});




module.exports = router;
    
    
    
    
    
    
    
    
    
    
    //import { Router } from "express";
    
    
    
    
    // var express = require('express')
    // var router = express.Router()
// var sequelize = require('../db')
// var User = sequelize.import('../models/user')


// router.post('/createuser', function (req, res) {

//     var username = 'Deadpool';
//     var pass = 'maximumeffort';

//     User.create({
//         username: username,
//         passwordhash: pass
//     }).then(
//         function message(){
//             res.send('whose litterbox did i just shit in?');
//         }
//     );
// })


// module.exports = router;

