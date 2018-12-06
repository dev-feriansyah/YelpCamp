const express = require('express'),
  passport = require('passport'),
  router = express.Router(),
  User = require('../models/user');

// Landing Page
router.get('/', (req, res) => {
  res.render('landing', {
    pageTitle: 'Yelp Home Page',
  });
});

// REGISTER
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const newUser = new User({
    username: req.body.username,
  });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/register');
    }
    passport.authenticate('local')(req, res, () => {
      req.flash('success', `${user.username}, Welcome to the campgrounds`);
      // Jika tidak error, user telah dibuat
      res.redirect('/campgrounds');
    });
  });
});

// LOGIN
router.get('/login', (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: `Success to login, Welcome to campground`,
  })
);

// LOGOUT
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Success to log off');
  res.redirect('/login');
});

module.exports = router;
