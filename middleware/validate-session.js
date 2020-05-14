require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../db").import("../models/user");

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;

    if (req.method == "OPTIONS") {
        next();
    } else {
        if (!token) {
            return res
                .status(403)
                .send({ auth: false, message: "No Token Provided" });
        } else {
            jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
                if (!err && decodeToken) {
                    User.findOne({
                        where: {
                            id: decodeToken.id,
                        },
                    })
                        .then((user) => {
                            if (!user) {
                                throw err;
                                console.log('ya done fucked it 2 electric boogaloo')    
                            } else {
                                console.log('ya didnt done fucked it')
                            }

                            req.user = user;
                            return next();
                        })
                        .catch((err) => next(err));
                } else {
                    req.errors = err;
                    return res.status(500).send("Not Authorized");
                }
            });
        }
    }
};

module.exports = validateSession;

// var jwt = require('jsonwebtoken');
// var sequelize = require('..db');
// var User = sequelize.import('../models/user');

// module.exports = function(req, res, next) {
//     if (req.method == 'OPTIONS') {
//         next()
//     } else {
//         var sessionToken = req.headers.authorization;
//         console.log(sessionToken)
//         if (!sessionToken) return res.status(403).send({auth: false, message: 'No token provided.'});
//         else {
//             jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
//                 if(decoded){
//                     User.findOne({where: {id: decoded.id}}).then(user => {
//                         req.user = user;
//                         next();
//                     },
//                     function(){
//                         res.status(401).send({error: 'Not Authorized'});
//                     });
//                 } else {
//                     res.status(400).send({error: 'Not Authorized'});
//                 }
//             })
//         }
//     }
// }
