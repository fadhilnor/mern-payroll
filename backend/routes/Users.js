const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
let User = require('../models/Users');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  let errors = [];

  // User validation
  if (!name || !email || !password || !passwordConfirm) {
    errors.push({ msg: 'Please enter all fields' });
  }

  // Password validation
  if (password !== passwordConfirm) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 5) {
    errors.push({ msg: 'Passwords must be at least 5 characters' });
  }

  // Save if passed validation
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      passwordConfirm,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              console.log('Error: ' + err);
              throw err;
            }
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash('success_msg', 'You are now registered and can log in');
                res.redirect('/users/login');
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
