var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var path = require('path');
var db = require('monk')('localhost/blog');

router.get('/show/:category', function(req, res ,next) {
  var db = req.db;
  var posts = db.get('posts');
  posts.find({category: req.params.category}, {}, function(err, posts) {
    res.render('index', {
      "title": req.params.category,
      "posts": posts
    });
  });
});

router.get('/add', function(req, res, next) {
  res.render('addcategories', {
    "title": "Add Category"
  });
});

router.post('/add', function(req, res, next) {
  // Get form values
  var title = req.body.title;
  console.log(req.body.title);
  console.log(req.body.title1);
  console.log(title);
  console.log(req.body);

  // Form Validation
  req.check('title', 'Title field is required').notEmpty();

  // Check errors
  var errors = req.validationErrors();

  if(errors) {
    console.log(errors);
    res.render('addcategories', {
      "errors": errors,
      "title": title
    });
  } else {
    var categories = db.get('categories');

    categories.insert({
      "title": title
    }, function(err, category) {
      if(err){
        res.send('There was an issue submitting the category');
      } else {
        req.flash('success', 'Category Submitted');
        res.location('/');
        res.redirect('/');
      }
    });
  }
});

module.exports = router;