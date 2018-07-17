const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middlewares = require('../middlewares');

router.get('/', (req, res) => {
  Campground.find({}, (error, campgrounds) => {
    if (error) {
      console.log(error);
    } else {
      res.render('campgrounds/index', { campgrounds: campgrounds });      
    }
  });
});

router.post('/', middlewares.checkLoggedIn, (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let cost = req.body.cost;
  let newCampground = {
    name: name,
    image: image,
    cost: cost,
    description: description,
    author: {
      id: req.user._id,
      username: req.user.username
    }
  };
  Campground.create(newCampground, (error, campground) => {
    if (error) {
      console.log(error);
    } else {
      console.log(campground);
    }
  });

  res.redirect('/campgrounds');
});

router.get('/new', middlewares.checkLoggedIn, (req, res) => {
  res.render('campgrounds/new')
});

router.get('/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec((error, foundCampground) => {
    if (error) {
      consle.log(`Meet an error!`);
    } else {
      res.render('campgrounds/show', { campground: foundCampground });
    }
  });
});

router.get('/:id/edit', middlewares.checkCampgroundOwnerShip, (req, res) => {
  Campground.findById(req.params.id, (error, foundCampground) => {
    res.render('campgrounds/edit', { campground: foundCampground });
  });
});

router.put('/:id', middlewares.checkCampgroundOwnerShip, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (error, updatedCampground) => {
    if (error) {
      res.redirect('/campgrounds');
    } else {
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

router.delete('/:id', middlewares.checkCampgroundOwnerShip, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (error) => {
    if (error) {
      res.redirect('/campgrounds'); 
    } else {
      req.flash('success', 'Delete post successful!');
      res.redirect('/campgrounds');
    }
  });
});

module.exports = router;