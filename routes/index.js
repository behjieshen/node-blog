module.exports = function(router, passport) {

  var db = require('monk')('bot:1234@ds161001.mlab.com:61001/fiintech');

  // Home page blog post
  router.get('/', function(req, res, next) {
    var db = req.db;
    var posts = db.get('posts');
    if(req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      posts.find({"title": regex}, {}, function(err, posts) {
        res.render('index', {
          "posts": posts
        });
      })
    } else {
      posts.find({}, {}, function(err, posts) {
        res.render('index', {
          "posts": posts
        });
      })
    }

  });

  router.get('/search', function(req, res, next) {
    var db = req.db;
    var posts = db.get('posts');
    var tags = db.get('categories');
    var authors = db.get('authors');
    posts.find({}, {}, function(err, posts) {
      tags.find({}, {}, function(err, tags) {
        authors.find({}, {}, function(err, authors) {
          res.render('results', {
            "posts": posts,
            "tags": tags,
            "authors": authors
          });
        })
      })
    })
  })

  router.get('/search/name-asc', function(req, res, next) {
    var db = req.db;
    var posts = db.get('posts');
    var tags = db.get('categories');
    var authors = db.get('authors');
    posts.find({}, {sort: { title : 1 } }, function(err, posts) {
      tags.find({}, {}, function(err, tags) {
        authors.find({}, {}, function(err, authors) {
          res.render('results', {
            "posts": posts,
            "tags": tags,
            "authors": authors
          });
        })
      })
    })
  })

  router.get('/search/name-desc', function(req, res, next) {
    var db = req.db;
    var posts = db.get('posts');
    var tags = db.get('categories');
    var authors = db.get('authors');
    posts.find({}, {sort: { title : -1 } }, function(err, posts) {
      tags.find({}, {}, function(err, tags) {
        authors.find({}, {}, function(err, authors) {
          res.render('results', {
            "posts": posts,
            "tags": tags,
            "authors": authors
          });
        })
      })
    })
  })

  router.get('/search/:category', function(req, res ,next) {
    var db = req.db;
    var posts = db.get('posts');
    var tags = db.get('categories');
    var authors = db.get('authors');
    posts.find({category: req.params.category}, {}, function(err, posts) {
      tags.find({}, {}, function(err, tags) {
        authors.find({}, {}, function(err, authors) {
          res.render('results', {
            "posts": posts,
            "tags": tags,
            "authors": authors
          });
        })
      })
    })
  });

  router.get('/search/time-newest', function(req, res ,next) {
    var db = req.db;
    var posts = db.get('posts');
    var tags = db.get('categories');
    var authors = db.get('authors');
    posts.find().sort({datefield: 1}), function(err, posts) {
      tags.find({}, {}, function(err, tags) {
        authors.find({}, {}, function(err, authors) {
          res.render('results', {
            "posts": posts,
            "tags": tags,
            "authors": authors
          });
        })
      })
    }
  });

  router.get('/search/time-oldest', function(req, res ,next) {
    var db = req.db;
    var posts = db.get('posts');
    var tags = db.get('categories');
    var authors = db.get('authors');
    posts.find({}, { sort: {datefield: -1} }, function(err, posts) {
      tags.find({}, {}, function(err, tags) {
        authors.find({}, {}, function(err, authors) {
          res.render('results', {
            "posts": posts,
            "tags": tags,
            "authors": authors
          });
        })
      })
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
    var id = req.params.id;
    var posts = db.get('posts');
    var authors = db.get('authors');
    var otherposts = db.get('posts');
    posts.findById(req.params.id, function(err, post) {
      authors.find({title: post.author}, {}, function(err, author) {
        otherposts.find({"_id": { $ne: id} }, { limit: 3, sort: {$natural:-1} }, function(err, otherpost) {
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

  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

}