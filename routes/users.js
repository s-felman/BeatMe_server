var express = require('express');
var router = express.Router();
const controller=require("../controllers/userController");
var MongoClient = require('mongodb').MongoClient;
var urlToCreate = "mongodb://localhost:27017/BeatMeDB";
var url = "mongodb://localhost:27017/";
/* GET users listing. */

router.get("/createUserColection",() => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("BeatMeDB");
    dbo.createCollection("users", function (err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
});

router.get("/login", function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  const { userName, email, password } = req.query;
  //Check the pwd in the server
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("BeatMeDB");
    var query = { userName, email };
    dbo.collection("users").find(query).toArray(function (err, result) {
      if (err) throw err;
      if (!result || result.length === 0) {
        return res.status(401).send();
      }
      db.close();
      if (result[0].password = password) {
        const token = generateAccessToken(user);
        console.log("token", token);
        return res.json({ token }).send();
      } else {
        return res.status(401).send();
      }
    });
  });

});
router.post("/signup", function (req, res) {
  //console.log(req);
  //const { firstName, lastName, userName, phone, email, password, getEmail } = req.body;
  MongoClient.connect(url,{ useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("BeatMeDB");
    var myobj = { firstName: req.query.firstName,lastName: req.query.lastName, userName: req.query.userName, 
      phone: req.query.phone, email: req.query.email, password: req.query.password, getEmail: req.query.getEmail };
      console.log(myobj);
      //var myobj2={firstName,lastName,userName,phone,email,password,getEmail};
    dbo.collection("users").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
    // const token = generateAccessToken(user);
    // console.log("token", token);
    // return res.json({ token }).send();
  });
});

router.put("/update", function(req, res){
  MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db("BeatMeDB");
    var myobj1= req.params.myobj1 ;
    var myobj2 = { $set: req.params.myobj2 };
      dbo.collection("users").updateOne(myobj1, myobj2, function(err, res){
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
  });
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
