var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser =require('body-parser');


mongoose.connect(process.env.MONGO_DB);

var db = mongoose.connection;

db.once("open", function(){
  console.log("DB connected!!");
});

db.on("error", function(err){
  console.log("DB Error : ", err);
});

/*
var dataSchema = mongoose.Schema({
  name:String,
  count:Number
});

var Data = mongoose.model('data',dataSchema);
Data.findOne({name:"myData"}, function(err, data){
  if(err) return console.log("Data Error:", err);
  if(!data){
    Data.create({name:"myData", count:0}, function(err, data){
        if(err) return console.log("Data Error :", err);
        console.log("Counter Initialzed====", data);
    });
  }
});
*/

/*
app.get('/', function(req,res){
  res.send('Hello World!!!!!');
});
*/

//app.use(express.static(__dirname + '/public'));


app.set("view engine", 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname);
app.use(bodyParser.json());

var postSchema = mongoose.Schema({
  title: {type:String, required:true},
  body: {type:String, required:true},
  createdAt: {type:Date, defalut:Date.now},
  updatedAt: Date
});

var Post = mongoose.model('post', postSchema);

app.get('/posts', function(req, res){
  Post.find({}, function(err, posts){
    if(err) return res.json({success:false, message:err});
    res.json({success:true, data:posts});
  });
});

app.post('/posts', function(req, res){
  Post.create(req.body.post, function(err, post){
    if(err) return res.json({success:false, message:err});
    res.json({success:true, data:post});
  });
});

app.get('/posts/:id', function(req, res){
  Post.findById(req.params.id, function(err, post){
    if(err) return res.json({success:false, message:err});
    res.json({success:true, data:post});
  });
});

app.put('/posts/:id', function(req, res){
  Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, post){
    if(err) return res.json({success:false, message:err});
    res.json({success:true, message:post._id+" Updated!!"});
  });
});

app.delete('/posts/:id', function(req, res){
  Post.findByIdAndRemove(req.params.id, function(err, post){
    if(err) return res.json({success:false, message:err});
    res.json({success:true, message:post._id+" Deleted!!"});
  });
});

//var data={count:0};
/*
app.get('/', function(req,res){
  Data.findOne({name:"myData"}, function(err, data){
    if(err) return console.log("Data Error :", err);
    data.count++;
    data.save(function (err) {
      if(err) return console.log("Data Error :", err);
      res.render('first_ejs', data);
    });
  });

  //data.count++;
  //res.render('first_ejs',data);


});

app.get('/reset', function(req,res){
  setCounter(res, 0);

  //data.count=0;
  //res.render('first_ejs',data);

});

app.get('/set/count', function(req,res){
  if(req.query.count) setCounter(res, req.query.count);
  else getCounter(res);

  //if(req.query.count) data.count=req.query.count;
  //res.render('first_ejs',data);

});

app.get('/set/:num', function(req,res){

  if(req.params.num) setCounter(res,req.params.num);
  else getCounter(res);

  //data.count=req.params.num;
  //res.render('first_ejs',data);

});

function setCounter(res, num){
  console.log("setCounter");

  Data.findOne({name:"myData"}, function(err, data){
    if(err) return console.log("Data Error :", err);
    data.count = num;
    data.save(function(err){
      if(err) return console.log("Data Error :", err);
      res.render('first_ejs', data);
    });
  });
}

function getCounter(res) {
  console.log("getCounter");

  Data.findOne({name:"myData"}, function(err, data){
    if(err) return console.log("Data Error :", err);
    res.render('first_ejs', data);
  });
}
*/

/*
app.get('/', function(req,res){
  res.render('first_ejs');
});
*/

app.listen(3000, function(){
  console.log('Server On!!!');
});
