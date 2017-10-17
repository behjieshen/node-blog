module.exports = function(router, passport) {

  var db = require('monk')('bot:1234@ds161001.mlab.com:61001/fiintech');
  var request = require("request");
  var querystring = require("query-string");
  var xml = require('xml');


  // Home page blog post
  router.get('/', function(req, res, next) {
    var db = req.db;
    var posts = db.get('posts');
    var authors = db.get('authors');
    var tags = db.get('categories');
    posts.find({}, {}, function(err, posts) {
      authors.find({}, {sort: {$natural:1}}, function(err, authors) {
        tags.find({}, {}, function(err, tags)  {
          res.render('index', {
            "posts": posts,
            "authors": authors,
            "tags": tags
          });
        })
      })
    })
  });

  router.get('/about', function(req,res,next) {
    res.render('about');
  })

  router.get('/contact', function(req,res,next) {
    console.log(req.flash('success'));
    res.render('contact', { success: req.flash('success'), error: req.flash('error') } );
  })

  router.post('/contact', function(req, res, next) {
    // Get Form Values
    var given_name = req.body.given_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var company = req.body.company;
    var know_about_fiintech = req.body.know_about_fiintech;
    var connection = req.body.connection;
    var mobile_number = req.body.mobile_number;
    var message = req.body.message;

    // Check errors
    var errors = req.validationErrors();

    if(errors) {
      req.flash('error', 'An error has occurred');
      res.render('contact');
    } else {
      var db = req.db;
      var contacts = db.get('contact');

      contacts.insert({
        "given_name": given_name,
        "last_name": last_name,
        "email": email,
        "company": company,
        "know_about_fiintech": know_about_fiintech,
        "connection": connection,
        "mobile_number": mobile_number,
        "message": message
      }, function(err, form) {
        if(err){
          res.send('There was an issue submitting the form');
        } else {
          req.flash('success', 'Success! We will get back to you soon!');
          res.redirect('/contact');
        }
      });
    }
  })


  router.post('/', function(req, res, next) {
    var email = req.body.email;

    var options = {
      method: 'POST',
      url: 'https://us16.api.mailchimp.com/3.0/lists/eaa6cc34c7/members',
      headers:
       { 'postman-token': '9055b3b2-44a2-18b8-0e77-e371149eede4',
         'cache-control': 'no-cache',
         authorization: 'Basic YW55c3RyaW5nOjQ0ZTc5MDYwN2NjN2I4OWI0ZjU3YjlkMTVlMzNjYmM2LXVzMTY=',
         'content-type': 'application/json' },
      body: { email_address: email, status: 'subscribed' },
      json: true
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      var messages;
      if(body.status == 400) {
        switch(body.title) {
          case "Member Exists":
            messages = "Email already subscribed";
            break;
          case "Invalid Resource":
            messages = "Invalid email address";
            break;
        }
        req.session['message'] = messages;
      } else {
        req.session['message'] = "Success";
      }
      res.redirect('/error');
    });
  })

  router.get('/error', function(req, res, next) {
    if(req.session['message'] == "Success") {
      res.send({messages: req.session['message'], success: true});
    } else {
      res.send({messages: req.session['message'], success: false});
    }
  })


  router.get('/sitemap', function(req,res,next) {
    res.render('sitemap');
  })

  /*router.get('/search', function(req, res, next) {
    var db = req.db;
    var posts = db.get('posts');
    var tags = db.get('categories');
    var authors = db.get('authors');
    console.log(req.query.term);
    if(req.query.term) {
      const regex = new RegExp(escapeRegex(req.query.term), 'gi');
      posts.find({"title": regex}, {}, function(err, posts) {
        tags.find({}, {}, function(err, tags) {
          authors.find({}, {}, function(err, authors) {
            res.render('results', {
              "posts": posts,
              "tags": tags,
              "authors": authors,
              "search_term": req.query.term
            });
          })
        })
      })
    } else {
      posts.find({}, {}, function(err, posts) {
        tags.find({}, {}, function(err, tags) {
          authors.find({}, {}, function(err, authors) {
            res.render('results', {
              "posts": posts,
              "tags": tags,
              "authors": authors,
              "search_term": ""
            });
          })
        })
      })
    }
  })*/

  /*router.get('/search', function(req, res, next) {
    var db = req.db;
    var posts = db.get('posts');
    var tags = db.get('categories');
    var authors = db.get('authors');

    var querystring = "";
    var mongoqueryfind = {};
    var mongoquerysort = {};

    for (var key in req.query) {
      if (req.query.hasOwnProperty(key) && (key == "name" || key == "tag"
          || key == "time" || key == "likes" || key == "author" || key == "term") ) {
        querystring = querystring.concat(key + "=" + req.query[key] + "&");
        switch(req.query[key]) {
          case "a-z":
            mongoquerysort.title = -1;
            break;
          case "z-a":
            mongoquerysort.title = 1;
            break;
          case "newest":
            mongoquerysort.date = -1;
            break;
          case "oldest":
            mongoquerysort.date = 1;
            break;
          case "highest":
            mongoquerysort.likes = -1;
            break;
          case "lowest":
            mongoquerysort.likes = 1;
            break;
        }
      }
      console.log("Query: " + querystring);

      if (req.query['tag'])
        mongoqueryfind.tags = new RegExp(escapeRegex(req.query['tag']), 'gi');
      if (req.query['author'])
        mongoqueryfind.author = new RegExp(escapeRegex(req.query['author']), 'gi');
    }

    querystring = querystring.substring(0, querystring.length - 1);
    console.log("Query: " + querystring);

    console.log("MongoQueryFind:");
    console.log(querystring);
    console.log("MongoQuerySort:");
    console.log(mongoquerysort);

    if(req.query.term) {
      const regex = new RegExp(escapeRegex(req.query.term), 'gi');
      mongoqueryfind.title = regex;
      posts.find(mongoqueryfind, {sort: mongoquerysort }, function(err, posts) {
        tags.find({}, {}, function(err, tags) {
          authors.find({}, {}, function(err, authors) {
            res.render('results', {
              "posts": posts,
              "tags": tags,
              "authors": authors,
              "search_term": req.query.term,
              "searchquerystring": querystring
            })
          })
        })
      })
    } else {
      posts.find(mongoqueryfind, {sort: mongoquerysort}, function(err, posts) {
        tags.find({}, {}, function(err, tags) {
          authors.find({}, {}, function(err, authors) {
            res.render('results', {
              "posts": posts,
              "tags": tags,
              "authors": authors,
              "search_term": "",
              "searchquerystring": querystring
            });
          })
        })
      })
    }


  })

  router.get('/search/name-asc/term=:term?', function(req, res, next) {
    var db = req.db;
    var posts = db.get('posts');
    var tags = db.get('categories');
    var authors = db.get('authors');
    console.log("Hello");
    console.log(req.params.term);
    if(req.params.term) {
      const regex = new RegExp(escapeRegex(req.params.term), 'gi');
      posts.find({"title": regex}, {sort: { title : 1 } }, function(err, posts) {
        tags.find({}, {}, function(err, tags) {
          authors.find({}, {}, function(err, authors) {
            res.render('results', {
              "posts": posts,
              "tags": tags,
              "authors": authors,
              "search_term": req.params.term
            });
          })
        })
      })
    } else {
      req.params.term = "";
      posts.find({}, {sort: { title : 1 } }, function(err, posts) {
        tags.find({}, {}, function(err, tags) {
          authors.find({}, {}, function(err, authors) {
            res.render('results', {
              "posts": posts,
              "tags": tags,
              "authors": authors,
              "search_term": req.params.term
            });
          })
        })
      })
    }
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

  router.get('/search/time-newest', function(req, res, next) {
    var db = req.db;
    var posts = db.get('posts');
    var tags = db.get('categories');
    var authors = db.get('authors');
    posts.find({}, {sort: { date : -1 } }, function(err, posts) {
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

  router.get('/search/time-oldest', function(req, res ,next) {
    var db = req.db;
    var posts = db.get('posts');
    var tags = db.get('categories');
    var authors = db.get('authors');
    posts.find({}, {sort: { date : 1 } }, function(err, posts) {
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

  router.get('/search/likes-highest', function(req, res ,next) {
    var db = req.db;
    var posts = db.get('posts');
    var tags = db.get('categories');
    var authors = db.get('authors');
    posts.find({}, {sort: { likes : -1 } }, function(err, posts) {
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

  router.get('/search/likes-lowest', function(req, res ,next) {
    var db = req.db;
    var posts = db.get('posts');
    var tags = db.get('categories');
    var authors = db.get('authors');
    posts.find({}, {sort: { likes : 1 } }, function(err, posts) {
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

  router.get('/search/author/:author', function(req, res ,next) {
    var db = req.db;
    var posts = db.get('posts');
    var tags = db.get('categories');
    var authors = db.get('authors');
    posts.find({author: req.params.author}, {}, function(err, posts) {
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
  })

  */

  router.get('/post/:date/:title', function(req, res, next) {
    var db = req.db;
    var title = decodeURIComponent(req.params.title).replace(/-/g, ' ');
    var posts = db.get('posts');
    var authors = db.get('authors');
    var otherposts = db.get('posts');
    var tags = db.get('categories');
    posts.find({title: title}, {}, function(err, post) {
      authors.find({}, {}, function(err, authors) {
        tags.find({}, {}, function(err, tags) {
          otherposts.find({ title : { $ne : title } }, { limit: 5, sort: {$natural:-1} }, function(err, otherposts) {
            req.session.post_url = req.protocol + '://localhost:3000' + encodeURIComponent(req.originalUrl);
            res.render('showing', {
              "post": post,
              "authors": authors,
              "tags": tags,
              "otherposts": otherposts
            });
          })
        })
      })
    });
  });

  router.get('/post/:date/:title/liked', function(req, res, next) {
    var db = req.db;
    var title = decodeURIComponent(req.params.title).replace(/-/g, ' ');
    var posts = db.get('posts');
    var authors = db.get('authors');
    var otherposts = db.get('posts');
    var tags = db.get('categories');
    posts.find({title: title}, {}, function(err, post) {
      authors.find({}, {}, function(err, authors) {
        tags.find({}, {}, function(err, tags) {
          otherposts.find({}, { limit: 5, sort: {$natural:-1} }, function(err, otherposts) {
            req.session.post_url = req.protocol + '://localhost:3000' + encodeURIComponent(req.originalUrl);
            res.render('showliked', {
              "post": post,
              "authors": authors,
              "tags": tags,
              "otherposts": otherposts
            });
          })
        })
      })
    });
  });

  router.get('/post/:date/:title/:id/add-likes', function(req, res, next) {
    var db = req.db;
    var date = req.params.date;
    var title = req.params.title;
    var id = req.params.id;
    var test = 0;
    var posts = db.get('posts');
    posts.findById(id, function(err, post) {
      test = post.likes + 1;
      posts.findOneAndUpdate({_id: id}, {$set: {likes : test}},
        function(err, post) {
          if (err) console.log(err);
          else res.redirect('/post/' + date + '/' + title +'/liked');
      })
    })
  })

  router.get('/post/:date/:title/:id/subtract-likes', function(req, res, next) {
    var db = req.db;
    var date = req.params.date;
    var title = req.params.title;
    var id = req.params.id;
    var test = 0;
    var posts = db.get('posts');
    posts.findById(id, function(err, post) {
      test = post.likes - 1;
      posts.findOneAndUpdate({_id: id}, {$set: {likes : test}},
        function(err, post) {
          if (err) console.log(err);
          else res.redirect('/post/' + date + '/' + title);
      })
    })
  })

  router.post('/getpocket/save', function(req, res, next) {
    console.log(req.session.post_url);
    var request = require("request");

    var options = { method: 'POST',
      url: 'https://getpocket.com/v3/oauth/request',
      headers:
       { 'postman-token': '618c1233-759e-3110-7bba-ebfd4b5907af',
         'cache-control': 'no-cache',
         'content-type': 'application/x-www-form-urlencoded' },
      form:
       { consumer_key: '68668-6b08779b70de653430b3901e',
         redirect_uri: 'http://fiintech.com/post/12062017/Say-No-to-Cars%3F' } };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      var request_token = body.replace('code=', '');
      console.log(request_token);
      console.log('https://getpocket.com/auth/authorize?request_token=' + request_token + '&redirect_uri=http://fiintech.com');
      res.redirect('https://getpocket.com/auth/authorize?request_token=' + request_token + '&redirect_uri=http://fiintech.com');
    });

  })

  router.get('/master', function(req, res){
    if(req.isAuthenticated()) {
      res.redirect('/master/posts');
    }
    var messages = req.flash('error');
    res.render('master.jade', { messages: messages, hasErrors: messages.length > 0 });
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