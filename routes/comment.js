const express = require('express'),
  router = express.Router({ mergeParams: true }),
  Campground = require('../models/campground'),
  Comment = require('../models/comment'),
  middleware = require('../middleware');

// NEW - Show add new comment form
router.get('/new', middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (!err) {
      res.render('comments/new', {
        campground: foundCampground,
      });
    } else {
      console.log(err);
      res.redirect('/campgrounds');
    }
  });
});

// CREATE - Add new comment to Database
router.post('/', middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (!err) {
      const newComment = { ...req.body.comment, author: req.user.id };
      Comment.create(newComment, (err, comment) => {
        if (!err) {
          campground.comments.push(comment);
          campground.save(err => {
            if (!err) {
              res.redirect(`/campgrounds/${req.params.id}`);
            } else {
              console.log(err);
              res.redirect(`/campgrounds/${req.params.id}`);
            }
          });
        } else {
          console.log(err);
          res.redirect(`/campgrounds/${req.params.id}`);
        }
      });
    } else {
      console.log(err);
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

// EDIT - EDIT SPECIFIC COMMENT
router.get('/:comment_id/edit', middleware.isLoggedIn, middleware.checkCommentOwner, (req, res) => {
  Campground.findById(req.params.id)
    .select('name')
    .exec((err, campground) => {
      if (!err) {
        Comment.findById(req.params.comment_id)
          .populate('author')
          .exec((err, comment) => {
            if (!err) {
              res.render('comments/edit', { comment, campground });
            } else {
              res.redirect('back');
            }
          });
      } else {
        res.redirect('back');
      }
    });
});

// UPDATE - UPDATE SPECIFIC COMMENT
router.put('/:comment_id', middleware.isLoggedIn, middleware.checkCommentOwner, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, err => {
    if (!err) {
      res.redirect(`/campgrounds/${req.params.id}`);
    } else {
      res.redirect('back');
    }
  });
});

// DELETE - DELETE SPECIFIC COMMENT
router.delete('/:comment_id', middleware.isLoggedIn, middleware.checkCommentOwner, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, err => {
    if (!err) {
      res.redirect(`/campgrounds/${req.params.id}`);
    } else {
      res.redirect('back');
    }
  });
});

module.exports = router;
