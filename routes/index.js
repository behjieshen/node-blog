module.exports = function(router, passport) {

  var db = require('monk')('bot:1234@ds161001.mlab.com:61001/fiintech');

  // Home page blog post
  router.get('/', function(req, res, next) {
    var db = req.db;
    var posts = db.get('posts');
    posts.find({}, {}, function(err, posts) {
      res.render('index', {
        "posts": posts
      });
    })
  });

  router.get('/master', function(req, res){
    if(req.isAuthenticated()) {
      res.redirect('/master/posts');
    }
    var messages = req.flash('error');
    res.render('master.jade', { messages: messages, hasErrors: messages.length > 0 });
  });

  router.get('/posts/show/:id', function(req, res, next) {
    var db = req.db;
    var posts = db.get('posts');
    var authors = db.get('authors');
    var otherposts = db.get('posts');
    console.log(otherposts);
    posts.findById(req.params.id, function(err, post) {
      authors.find({title: post.author}, {}, function(err, author) {
        //otherposts.find().limit(-1).skip(Math.random() * count);
        otherposts.find({}, { limit: 3, sort: {$natural:-1} }, function(err, otherpost) {
          res.render('show', {
            "post": post,
            "author": author,
            "otherpost": otherpost
          });
        })
      })
    });
  });

  router.post('/posts/addcomment', function(req, res, next) {
    // Get form values
    var name = req.body.name;
    var email = req.body.email;
    var body = req.body.body;
    var postid = req.body.postid;
    var commentdate = new Date();

    // Form Validation
    req.check('name', 'Name field is required').notEmpty();
    req.check('email', 'Email field is required').notEmpty();
    req.check('email', 'Email is invalid').isEmail();
    req.check('body', 'Body field is required').notEmpty();

    // Check errors
    var errors = req.validationErrors();

    if(errors) {
      var posts = db.get('posts');
      posts.findById(postid, function(err, post) {
        res.render('show', {
          "errors": errors,
          "post": post
        });
      });
    } else {
      var comment = {"name": name, "email": email, "body": body, "commentdate": commentdate}

      var posts = db.get('posts');

      posts.update({
          "_id": postid
        },
        {
          $push: {
            "comments": comment
          }
        },
        function(err, comment) {
          if(err) {
            throw err;
          } else {
            req.flash('success', 'Comment Added');
            res.location('/posts/show/' + postid);
            res.redirect('/posts/show/' + postid);
          }
        }
      );
    }
  });

  router.get('/categories/show/:category', function(req, res ,next) {
    var db = req.db;
    var posts = db.get('posts');
    posts.find({category: req.params.category}, {}, function(err, posts) {
      res.render('index', {
        "title": req.params.category,
        "posts": posts
      });
    });
  });

}