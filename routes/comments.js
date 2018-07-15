const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middlewares = require('../middlewares');

router.get('/new', middlewares.checkLoggedInMiddleware, (req, res) => {
  Campground.findById(req.params.id, (error, foundCampground) => {
    if (error) {
      console.log(error);
    } else {
      res.render('comments/new', { campground: foundCampground });
    }
  });
});

router.post('/', middlewares.checkLoggedInMiddleware, (req, res) => {
  Campground.findById(req.params.id, (error, foundCampground) => {
    if (error) {
      console.log(error);
      res.redirect('/campgrounds');
    } else {  
      Comment.create(req.body.comment, (error, comment) => {
        if (error) {
          console.log(error);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          foundCampground.comments.push(comment);
          foundCampground.save();
          res.redirect(`/campgrounds/${foundCampground._id}`);
        }
      })
    }
  });
});

router.get('/:comment_id/edit', middlewares.checkCommentOwnerShip, (req, res) => {
  Comment.findById(req.params.comment_id, (error, foundComment) => {
    if (error) {
      req.flash('error', `You don't have permission to do that!`);
      res.redirect('back');
    } else {
      res.render('comments/edit', { 
        comment: foundComment,
        campground_id: req.params.id 
      });
    }
  });
});

router.put('/:comment_id', middlewares.checkCommentOwnerShip, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (error, updatedComment) => {
    if (error) {
      console.log(`Can't update comment`);
      res.redirect('back');
    } else {
      console.log(`Comment updated ${updatedComment}`);
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

router.delete('/:comment_id', middlewares.checkCommentOwnerShip, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (error) => {
    if (error) {
      console.log(`Can't delete comment`);
      res.redirect('back');
    } else {
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});


module.exports = router;