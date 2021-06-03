const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

var MongoClient = require('mongodb').MongoClient;
var urlToCreate = "mongodb://localhost:27017/BeatMeDB";
var url = "mongodb://localhost:27017/";

const TOKEN_SECRET =
  "F9EACB0E0AB8102E999DF5E3808B215C028448E868333041026C481960EFC126";

const generateAccessToken = (username) => {
  return jwt.sign({ username }, TOKEN_SECRET);
};

router.get("/createDB", (req, res) => {
  MongoClient.connect(urlToCreate, function (err, db) {
    console.log("err", err)
    res.send();
  });
})

router.get("/createUserColection", () => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("BeatMeDB");
    dbo.createCollection("users", function (err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
})

router.get("/createComptitonColection", () => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("BeatMeDB");
    dbo.createCollection("comptitions", function (err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
})

router.get("/login", function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  console.logre("req", req.query);
  const { userName, email , password } = req.query;
  //Check the pwd in the server
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("BeatMeDB");
    var query = { userName };
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

router.get("/signup", (req, res)=> {
  const { username, firstname, lastname, email, password, } = req.params; //Adress, phone ....
  //Validations.
  //Check if user exists
  MongoClient.connect(url,{ useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("BeatMeDB");
    var myobj = { username: `${username}`, password: password, firstname: "שני",lastname: "lastname",email:"email" };
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

router.post("/signn",()=>{
MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("BeatMeedb");
  var myobj = { name: "Cobaaaampany Inc", address: "kkkHighway 37" };
  dbo.collection("users").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});})

router.get("/addParticipant",(req,res)=>{
  console.log(req.params);
  const { comptitonName,userName, email} = req.params;
  MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("BeatMedb");
    var myobj = { comptitonName: comptitonName, userName:`${userName}`, email:"email" };
    dbo.collection("comptitions").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });})
module.exports = router;

