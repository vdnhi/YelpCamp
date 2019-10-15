const Campground = require('./models/campground');
const Comment = require('./models/comment');

const initialData = [
  {
    name: "Cloud's Rest", 
    image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    cost: "12.00",
  },
  {
    name: "Desert Mesa", 
    image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    cost: "8.10",
  },
  {
    name: "Canyon Floor", 
    image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    cost: "13.00",
  }
];

function seedDB() {
  Campground.remove({}, (error) => {
    if (error) {
      console.log(`Remove data error!`);
    } else {
      console.log(`Removed all campgrounds!`);
      initialData.forEach((seed) => {
        Campground.create(seed, (error, campground) => {
          if (error) {
            console.log(`Add seed data error ${error}`);
          } else {
            console.log(`Added a campground`);
            Comment.create({
              text: "This place is great, but I wsh there was internet",
              author: "NhiVD"
            }, (error, comment) => {
              if (error) {
                console.log(error);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log(`Created new comment`);
              }
            });
          }
        });
      });
    }
  });
}

module.exports = seedDB;