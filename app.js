var express = require('express');
var path = require('path');

var app = express();

/*
app.get('/', function(req,res){
  res.send('Hello World!!!!!');
});
*/

//app.use(express.static(__dirname + '/public'));


app.set("view engine", 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname);

var data={count:0};
app.get('/', function(req,res){
  data.count++;
  res.render('first_ejs',data);
});

app.get('/reset', function(req,res){
  data.count=0;
  res.render('first_ejs',data);
});

app.get('/set/count', function(req,res){
  if(req.query.count) data.count=req.query.count;
  res.render('first_ejs',data);
});

app.get('/set/:num', function(req,res){
  data.count=req.params.num;
  res.render('first_ejs',data);
});

/*
app.get('/', function(req,res){
  res.render('first_ejs');
});
*/

app.listen(3000, function(){
  console.log('Server On!!!');
});
