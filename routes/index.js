var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', items: [] });
});

/* POST home page. */
router.post('/handler', function(req, res) {
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect('mongodb://localhost:27017/myFirstDatabase', function(err, db) {
    if(err){ return console.log("ERROR! ", err); }
    
    var myObject = {"myTerm": req.body.myInput};
    db.collection('myFirstCollection').insert(myObject, function(err) {
      console.log("New Document Inserted");
      
      db.collection('myFirstCollection').find().toArray(function(err, items){
        res.render('index', { title: 'Express' , items: items});
      });
    });
  });
});

/* POST form handler2 */
router.post('/handler2', function(req, res) {
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/myFirstDatabase');
  
  var Shirt = mongoose.model('Shirt', {name: String});
  var myShirt = new Shirt({name: req.body.myInput});
  myShirt.save(function(err){
    res.render('index', { title: 'Express', items: [] });
    console.log('New Document Inserted');
  });
});

module.exports = router;
