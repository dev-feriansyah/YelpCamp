const Campground = require('./models/campground'),
  Comment = require('./models/comment');
// mongoose    = require('mongoose'),

const data = [
  {
    name: 'Glory Hell',
    image:
      'https://images.unsplash.com/photo-1518466287196-1ba82e3bb69b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5178806447c0b33ac9a15a305e0d5cdf&auto=format&fit=crop&w=500&q=60',
    description: 'Some thing Glory here',
  },
  {
    name: 'Night Camp',
    image:
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c43eff2f7cb0c2f6838152683da69f81&auto=format&fit=crop&w=500&q=60',
    description: 'Camp in night surrounding by people',
  },
  {
    name: 'Clasy Jump',
    image:
      'https://images.unsplash.com/photo-1505232070786-2f46d15f9f5e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8d0b72c290cbac7926edb604b1f40793&auto=format&fit=crop&w=500&q=60',
    description: 'Make your hollidays wonderful in Clasy Jump',
  },
];

// Hapus semua data dan isi ulang data dari awal
// export function yang akan dijalankan di app.js
function seedDB() {
  // Remove all Campground
  Campground.deleteMany({}, err => {
    if (err) {
      console.log(err);
    } else {
      console.log('All Campground Removed');
      // Remove all Comments mongoose V.5.3 - replace remove() with deleteMany()
      Comment.deleteMany({}, err => {
        // if (err) {
        //   console.log(err);
        // } else {
        //   console.log('All Comment in campground Removed');
        //   // Add few Campground to database
        //   data.forEach(seed => {
        //     Campground.create(seed, (err, campground) => {
        //       if (err) {
        //         console.log(err);
        //       } else {
        //         console.log('Added campground to database');
        //         // Add comment to campground
        //         Comment.create(
        //           {
        //             author: 'Homer',
        //             text: 'This place is great, but I wish there was internet',
        //           },
        //           (err, comment) => {
        //             if (err) {
        //               console.log(err);
        //             } else {
        //               campground.comments.push(comment);
        //               campground.save();
        //               console.log('Created a new comment');
        //             }
        //           }
        //         );
        //       }
        //     });
        //   });
        // }
      });
    }
  });
}

module.exports = seedDB;
