const Campground = require('../models/campground');
const Comment = require('../models/comment');

let middlewares = {};

middlewares.checkCommentOwnerShip = (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (error, foundComment) => {
      if (error) {
        console.log(`Can't find comment in middleware`);
        res.redirect('back');
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', `You don't have permission to do that!`);
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', `You need to be logged in to do that!`);
    res.redirect('back');
  }
};

middlewares.checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You must login to do that!');
  res.redirect('/login');
}

middlewares.checkCampgroundOwnerShip = (req, res, next) => {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (error, foundCampground) => {
      if (error) {
        req.flash('error', 'Campground not found!');
        res.redirect('back');
      } else {
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', `You don't have permission to do that!`);
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', `You need to be logged in to do that!`);    
    res.redirect('back');
  }
}

module.exports = middlewares;