var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

var MongoClient = require('mongodb').MongoClient;
var urlToCreate = "mongodb://localhost:27017/BeatMeDB";
var url = "mongodb://localhost:27017/";


const controller=require("../controllers/userController");

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



router.get("/createComptitonColection", () => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("BeattMeDB");
    dbo.createCollection("comptitions", function (err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
})




// router.get("/signup", (req, res)=> {
//   const { username, firstname, lastname, email, password, } = req.params; //Adress, phone ....
//   //Validations.
//   //Check if user exists
//   MongoClient.connect(url,{ useUnifiedTopology: true }, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("BeatMeDB");
//     var myobj = { username: `${username}`, password: password, firstname: "שני",lastname: "lastname",email:"email" };


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

router.post("/addCompetiton",(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;

    var dbo = db.db("BeatMeDB");
    var query = JSON.parse(req.query.competition);
    dbo.collection("competitions").insertOne(myobj, function(err, res) {
    var myobj = {  comptitonName: query.name, type:query.type, userList:query.userList, details: query.details, target: query.target, targetDate: query.targetDate};
      if (err) throw err;
      console.log("1 dohcument inserted to competiton");
      db.close();
    });
  });})
module.exports = router;

