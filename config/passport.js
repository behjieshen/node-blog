var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function(passport) {


  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });


  passport.use('local-signup', new LocalStrategy({
    usernameField: 'signup_email',
    passwordField: 'signup_password',
    passReqToCallback: true
  },
  function(req, signup_email, signup_password, done){
    process.nextTick(function(){
      var confirm_password = req.body.signup_confirm_password;
      req.check('signup_email', 'Invalid Email').isEmail();
      req.check('signup_password', 'Passwords do not match').equals(confirm_password);

      var errors = req.validationErrors();
      if(errors) {
        var messages = errors[0].msg;
        return done(null, false, req.flash('error', messages));
      }
      User.findOne({'local.username': signup_email}, function(err, user){
        if(err){
          return done(err);
        }
        if(user){
          return done(null, false, req.flash('error', 'That email already taken'));
        } else {
          var newUser = new User();
          newUser.local.username = signup_email;
          newUser.local.password = newUser.generateHash(signup_password);

          newUser.save(function(err){
            if(err){
              return done(err);
            }
            return done(null, newUser);
          })
        }
      })

    });
  }));

  passport.use('local-login', new LocalStrategy({
      usernameField: 'login_email',
      passwordField: 'login_password',
      passReqToCallback: true
    },
    function(req, login_email, login_password, done){
      process.nextTick(function(){
        req.check('login_email', 'Invalid Email / Password').isEmail();

        var errors = req.validationErrors();
        if(errors) {
          var messages = errors[0].msg;
          return done(null, false, req.flash('error', messages));
        }
        User.findOne({ 'local.username': login_email}, function(err, user){
          if(err)
            return done(err);
          if(!user || !user.validPassword(login_password))
            return done(null, false, req.flash('error', 'Invalid Email / Password'));
          return done(null, user);

        });
      });
    }
  ));

};