
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var guid = require('guid');
var diskdb = require('diskdb');

var app = express();
var blogDb = diskdb.connect('./localdb',['posts']);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//main page, get all posts
var title = 'ADD YOUR BLOG TITLE IN HERE.'
app.get('/', function(req, res){
  var posts = blogDb.posts.find();
  res.render('index',{title: title,blogPosts:posts});
});

//Comment both app.get('/newpost' and app.post('/newpost', if you are putting this online.
//I normally update locally and then commit and push the changes to my server.
app.get('/newpost', function(req, res){
  res.render('newPost');
});


//save new post
app.post('/newpost', function(req, res){
  var post = {id:guid.raw(), title: req.param('title'), text: req.param('postText'), created_at: new Date()};
  blogDb.posts.save(post);
  res.redirect('/');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});




/*var bp1 = new BlogPost({title: 'titulo', text: '<p>some text</p>', created_at: new Date()});
bp1.save(function(err, blogpost){
  if (err) return console.error(err);
  else console.log('success');
});
*/

