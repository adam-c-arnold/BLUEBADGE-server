var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var TestModel = sequelize.import('../models/test');


router.post('/one', function(req, res){
    res.send('test 1 went through')
});

router.post('/two', function(req, res) {
    let testData = "test data for endpoint 2";

    TestModel.create({
        testdata: testData
    }).then(dataFromDatabase => {
        res.send('test 2 went through!')
    })
});


router.post('/three', function (req, res) {
    
    var testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    res.send("test 3 went through!")
    console.log("test 3 went thru!")

});


router.post('/four', function (req, res) {
    var testData = req.body.testdata.item;
    TestModel
    .create({
        testdata: testData
    })
    .then(
        function message() {
            res.send("this is test 4, ya heard?!");
        }
    );
});

router.post('/five', function(req, res) {
    var testData = req.body.testdata.item;
    TestModel
    .create({
        testdata: testData
    })
    .then(
        function message(data) {
            res.send(data);
        }
    );
});

router.post('/six', function (req, res) {
    var testData = req. body.testdata.item;
    TestModel
    .create({
        testdata: testData
    })
    .then(
        function message(testdata) {
            res.json({
                testdata: testdata
            });
        }
    );
});

router.post('/seven', function (req, res) {
    var testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    .then(
        function createSuccess(testdata) {
            res.json({
                testdata: testdata
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

router.get('/helloclient', function (req, res) {
    res.send('This is a message from the server to the client')
})

router.get('/one', function(req, res) {

    TestModel
    .findAll({
        attributes: ['id', 'testdata']
    })
    .then(
        function findAllSuccess(data) {
            console.log("Controller data:", data);
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    )
})





module.exports = router;

// router.get('/', function (req, res) {
//     res.send('hey, this is a test route')
// });

// router.get('/about', function (req, res) {
//     res.send('this is an about route')
// });

// router.get('/contact', function (req, res) {
//     res.send({user: "kenn", email:"kenn@beastmode.com"})
// });

// router.get('/projects', function (req, res) {
//     res.send(['project 1', 'project 2'])
// });

// router.get('/mycontacts', function (req, res) {
//     res.send([
//         {user: "quincy", email: "quincy@beastmode.com"},
//         {user: "adam", email: "adam@beastmode.com"},
//         {user: "loki", email: "loki@beastmode.com"}
//     ])
// });




