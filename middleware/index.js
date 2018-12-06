const Campground = require('../models/campground'),
  Comment = require('../models/comment');

// ALL MIDDLEWARE - EXPORT AS OBJECT
module.exports = {
  // CHECK USER AUTHENTICATION - IS ALREADY LOGIN OR NOT
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    // FLASH MESSAGE
    req.flash('error', 'You have to login first');
    // JIKA BELUM LOGIN KEMBALI KE SEBELUMNYA
    res.redirect('/login');
  },
  // CHECK USER AUTHORIZATION - CHECK APAKAH USER YANG PUNYA CAMPGROUND
  checkCampgroundOwner(req, res, next) {
    Campground.findById(req.params.id, (err, campground) => {
      if (!err) {
        if (campground.author.equals(req.user.id)) {
          return next();
        } else {
          req.flash('error', "You don't have permission to do that!!");
          res.redirect(`/campgrounds/${req.params.id}`);
        }
      } else {
        req.flash('error', "Can't find campground in database");
        res.redirect(`/campgrounds/${req.params.id}`);
      }
    });
  },
  // CHECK USER AUTHORIZATION - CHECK APAKAH USER YANG PUNYA COMMENT
  checkCommentOwner(req, res, next) {
    Comment.findById(req.params.comment_id, (err, comment) => {
      if (!err) {
        if (comment.author.equals(req.user.id)) {
          return next();
        } else {
          req.flash('error', "You don't have permission to do that!!");
          res.redirect(`/campgrounds/${req.params.id}`);
        }
      } else {
        req.flash('error', "Can't find comment in database");
        res.redirect(`/campgrounds/${req.params.id}`);
      }
    });
  },
};
