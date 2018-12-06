const express = require('express'),
  router = express.Router(),
  Campground = require('../models/campground'),
  middleware = require('../middleware');

// Index - Show all campground
router.get('/', (req, res) => {
  // Receive all campground data in MongoDB
  Campground.find({}, (err, campgrounds) => {
    if (!err) {
      res.render('campgrounds/index', {
        pageTitle: 'Yelp Campgrounds',
        campgrounds,
      });
    } else {
      console.log(err);
    }
  });
});

// New - Display form to make a new campground
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

// Create - Add new campground to Database
router.post('/', middleware.isLoggedIn, (req, res) => {
  // Creating new Data to database
  const newCampground = { ...req.body.campground, author: req.user.id };
  newCampground.price = parseFloat(newCampground.price);
  Campground.create(newCampground, (err, campground) => {
    if (!err) {
      // Redirect in default will go to use "Get" Protocol
      req.flash('success', `Success create ${campground.name}'s campground`);
      res.redirect('/campgrounds');
    } else {
      req.flash('error', "Can't create campground");
      res.redirect('back');
    }
  });
});

// Show - Display spesific campground
router.get('/:id', (req, res) => {
  // Find data by ID with Mongoose ('findById')
  Campground.findById(req.params.id)
    .populate('author') // Populate author inside campground
    .populate({
      path: 'comments',
      populate: { path: 'author' }, // Populate author inside comment inside campground
    })
    .exec((err, foundCampground) => {
      if (!err) {
        res.render('campgrounds/show', {
          campground: foundCampground,
        });
      } else {
        console.log(err);
      }
    });
});

// EDIT - EDIT SPECIFIC CAMPGROUND
router.get('/:id/edit', middleware.isLoggedIn, middleware.checkCampgroundOwner, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (!err) {
      res.render('campgrounds/edit', { campground });
    } else {
      res.redirect('/campgrounds');
    }
  });
});

router.put('/:id', middleware.isLoggedIn, middleware.checkCampgroundOwner, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, err => {
    if (!err) {
      res.redirect(`/campgrounds/${req.params.id}`);
    } else {
      res.redirect('/campgrounds');
    }
  });
});

// DESTROY - DESTROY SPECIFIC CAMPGROUND
router.delete('/:id', middleware.isLoggedIn, middleware.checkCampgroundOwner, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, err => {
    if (!err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds');
    }
  });
});

module.exports = router;
