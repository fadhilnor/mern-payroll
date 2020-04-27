const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
let User = require('../models/Users');

// Get all user
router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Register new user
router.route('/register').post((req, res) => {
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
    errors.forEach((error) => {
      console.log('Errors found: ' + error.msg);
    });
    res.status(400).json({ error: errors });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        console.log('Errors: ' + errors[0].msg);
        res.status(400).json({ error: errors });
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
              errors.push({ msg: 'Something went wrong. Please try again' });
              res.status(400).json({ error: errors });
            }
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.json('User added!');
                req.flash('success_msg', 'You are now registered and can log in');
                //res.redirect('/users/login');
              })
              .catch((err) => res.status(400).json({ error: err }));
          });
        });
      }
    });
  }
});

// Login
router.route('/login').post((req, res) => {
  const { email, password } = req.body;
  let errors = [];

  // User validation
  if (!email || !password) {
    errors.push({ msg: 'Please enter all fields' });
  }

  // Login if passed validation
  if (errors.length > 0) {
    res.status(400).json({ error: errors });
  } else {
    // Find user
    User.findOne({ email: email }).then((user) => {
      if (!user) {
        errors.push({ msg: 'Email is not registered' });
        console.log('Errors: ' + errors[0].msg);
        res.status(400).json({ error: errors });
      } else {
        const currentUser = new User({
          email,
          password,
        });

        // Match password
        bcrypt.compare(currentUser.password, user.password, (err, isMatch) => {
          if (err) {
            errors.push({ msg: 'Something went wrong. Please try again' });
            console.log('Errors: ' + errors[0].msg);
            res.status(400).json({ error: errors });
          }
          if (isMatch) {
            res.json('Login successful!');
          } else {
            errors.push({ msg: 'Incorrect email or password' });
            res.status(400).json({ error: errors });
          }
        });
      }
    });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
