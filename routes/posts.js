module.exports = function(router, passport) {

  var db = require('monk')('bot:1234@ds161001.mlab.com:61001/fiintech');
  var multer = require('multer');
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  });

  var upload = multer({storage: storage});

  // Signup
  router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/master/posts/add',
        failureRedirect: '/master',
        failureFlash: true
      })
  );

  // login
  router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/master/categories/add',
        failureRedirect: '/master',
        failureFlash: true
      }));

  // Make sure user is authenticated in order to access the routes below
  router.use(function(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }

    res.redirect('/');
  });

  // List of all posts
  router.get('/posts', function(req, res, next) {
    var db = req.db;
    var posts = db.get('posts');
    posts.find({}, {}, function(err, posts) {
      res.render('posts', {
        "posts": posts
      });
    })
  });

  // Lists of all categories
  router.get('/categories', function(req, res, next) {
    var db = req.db;
    var categories = db.get('categories');
    categories.find({}, {}, function(err, categories) {
      res.render('categories', {
        "categories": categories
      });
    })
  });

  // List of all authors
  router.get('/authors', function(req, res, next) {
    var db = req.db;
    var authors = db.get('authors');
    authors.find({}, {}, function(err, authors) {
      res.render('authors', {
        "authors": authors
      });
    })
  });

  // Add author page
  router.get('/authors/add', function(req, res, next) {
    res.render('addauthors', {
      "title": "Add Authors"
    });
  });

  // Add new author (POST)
  router.post('/authors/add', upload.single('image'), function(req, res, next) {

    // Get Form Values
    var name = req.body.name;
    var role = req.body.role;

    // Check errors
    var errors = req.validationErrors();

    if(errors) {
      res.render('addauthors');
    } else {
      var authors = db.get('authors');

      if(req.file) {
        filename = req.file['filename'];
      } else {
        filename = 'noimage.png';
      }

      authors.insert({
        "name": name,
        "role": role,
        "image": filename
      }, function(err, author) {
        if(err){
          res.send('There was an issue submitting the author');
        } else {
          req.flash('success', 'Author Submitted');
          res.location('/master/authors');
          res.redirect('/master/authors');
        }
      });
    }

  });

  //Wait
    // Delete author page
    router.get('/authors/delete/:id', function(req, res, next) {
      var authors = db.get('authors');

      authors.remove( { _id: req.params.id }, function(err, authors) {
        if(err){
          res.send('There was an issue deleting the author');
        } else {
          req.flash('success', 'Author Deleted');
          console.log(req.params.id);
          res.location('/master/authors');
          res.redirect('/master/authors');
        }
      });
    });

    // Delete author (POST)
    router.get('/posts/delete/:id', function(req, res, next) {
      var posts = db.get('posts');

      posts.remove( { _id: req.params.id }, function(err, posts) {
        if(err){
          res.send('There was an issue deleting the post');
        } else {
          req.flash('success', 'Post Deleted');
          console.log(req.params.id);
          res.location('/master/posts');
          res.redirect('/master/posts');
        }
      });
    });

    // Add category
    router.get('/categories/add', function(req, res, next) {
      res.render('addtags', {
        "title": "Add Category"
      });
    });

    // Delete
    router.post('/categories/add', upload.single('image'), function(req, res, next) {
      // Get form values
      var name = req.body.name;
      var color = req.body.color;
      var icon = req.body.icon;

      // Check errors
      var errors = req.validationErrors();

      if(errors) {
        res.redirect('/categories/add');
      } else {
        var categories = db.get('categories');

        if(req.file) {
          var extension_name = req.file['filename'].split('.');
          filename = name.toLowerCase() + '.' + extension_name[1];
        } else {
          filename = 'noimage.png';
        }

        categories.insert({
          "name": name,
          "color": color,
          "icon": icon,
          "image": filename
        }, function(err, category) {
          if(err){
            res.send('There was an issue submitting the category');
          } else {
            req.flash('success', 'Tag Submitted');
            res.location('/master/categories');
            res.redirect('/master/categories');
          }
        });
      }
    });

    // Delete category page
    router.get('/categories/delete/:id', function(req, res, next) {
      var categories = db.get('categories');

      categories.remove( { _id: req.params.id }, function(err, categories) {
        if(err){
          res.send('There was an issue deleting the category');
        } else {
          req.flash('success', 'category Deleted');
          console.log(req.params.id);
          res.location('/master/categories');
          res.redirect('/master/categories');
        }
      });
    });

    // Add Post Page
    router.get('/posts/add', function(req, res, next) {
      var categories = db.get('categories');
      var authors = db.get('authors');
      categories.find({}, {}, function(err, categories) {
        authors.find({}, {}, function(err, authors) {
          res.render('addposts', {
            "title": "Add Post",
            "categories": categories,
            "authors": authors
          });
        })
      });
    });

  // Add Post (POST)
  router.post('/posts/add', upload.single('mainimage'), function(req, res, next) {
    // Get form values
    var title = req.body.title;
    var tags = req.body.tags;
    var description = req.body.description;
    var content = req.body.content;
    var author = req.body.author;
    var date = new Date();
    var likes = 0;

    // Check errors
    var errors = req.validationErrors();

    if(errors) {
      res.redirect('/posts/add')
    } else {
      var posts = db.get('posts');

      if(req.file) {
        filename = req.file['filename'];
      } else {
        filename = 'noimage.png';
      }

      posts.insert({
        "title": title,
        "description": description,
        "content": content,
        "tags": tags,
        "date": date,
        "author": author,
        "mainimage": filename,
        "likes": likes
      }, function(err, posts) {
        if(err){
          res.send('There was an issue submitting the post');
        } else {
          req.flash('success', 'Post Submitted');
          res.location('/master/posts');
          res.redirect('/master/posts');
        }
      });
    }
  });

  // Logout
  router.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
  });

}


//module.exports = router;