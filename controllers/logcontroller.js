require("dotenv").config();
var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var Log = sequelize.import("../models/log");
var jwt = require("jsonwebtoken");
const validateSession = require("../middleware/validate-session");

/* *************************
 *** CREATE LOG ***
 ************************** */

router.post("/", validateSession, (req, res) => {
    const logRequest = {
        date: req.body.log.date,
        activity: req.body.log.activity,
        duration: req.body.log.duration,
        notes: req.body.log.notes,
        owner: req.user.id,
    };
    Log.create(logRequest)
        .then((log) => {
            res.status(200).json(log);
            console.log("this definitely fired.");
        })
        .catch((err) => {
            res.status(500).json({ error: err });
            console.log(
                "ya done ducked it-----------------------------------------------------------"
            );
        });
});

/* *************************
 *** GET ALL BY OWNER ***
 ************************** */

router.get("/", validateSession, (req, res) => {
    Log.findAll({
        where: { owner: req.user.id },
    })
        .then((logs) => res.status(200).json({ response: logs }))
        .catch((err) => {
            res.status(500).json({ error: err });
            console.log(
                "ya done ducked it-----------------------------------------------------------"
            );
        });
});

/* *************************
 *** GET LOGS BY ID ***
 ************************** */

router.get("/:id", validateSession, (req, res) => {
    Log.findOne({
        where: {
            id: req.params.id,
            owner: req.user.id,
        },
    })
        .then((log) => res.status(200).json(log))
        .catch((err) => res.status(500).json({ error: err }));
});

/* *************************
 *** UPDATE BY ID ***
 ************************** */

router.put("/:id", validateSession, (req, res) => {
    Log.update(req.body.log, {
        where: {
            id: req.params.id,
            owner: req.user.id,
        },
        returning: true,
    })
        .then((log) => res.status(200).json(log))
        .catch((err) => res.status(500).json({ error: err }));
});

/* *************************
 *** DELETE LOG ***
 ************************** */

router.delete("/:id", validateSession, (req, res) => {
    Log.destroy({
        where: {
            id: req.params.id,
            owner: req.user.id,
        },
        returning: true,
    })
        .then((log) => res.status(200).json(log))
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
