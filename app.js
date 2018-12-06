const expressSession = require('express-session'),
  LocalStrategy = require('passport-local'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  express = require('express'),
  flash = require('connect-flash'),
  app = express(),
  User = require('./models/user'),
  seedDB = require('./seeds');

// ROUTER RESTFUL ROUTE
const campgroundRoutes = require('./routes/campground'),
  commentRoutes = require('./routes/comment'),
  indexRoutes = require('./routes/index');

/**
 * SERVER STARTER CONFIG
 */

// Connect to Database

// LOCAL
// mongoose.connect(
//   'mongodb://192.168.1.1/yelp_camp_v10',
//   { useNewUrlParser: true }
// );

// REMOTE
mongoose.connect(
  'mongodb://feri:feriansyah123@ds033400.mlab.com:33400/yelpcamp',
  { useNewUrlParser: true }
);

// Run seed.js for removing and adding data to database manually
// seedDB();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());

// KONFIGURASI AUTHENTICATION
app.use(
  expressSession({
    secret: 'Yelp-Camp the best',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MASUKKAN DATA KE SEMUA RESTFUL - SEBAGAI MIDDLEWARE, yang akan diberikan ke views. hanya bisa dilihat pada ejs, di dalam views "res.render"
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.errorMessage = req.flash('error');
  res.locals.successMessage = req.flash('success');
  next();
});

/**
 * RESTFUL ROUTES
 */

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

// Server Running in port 8080
app.listen(8080, () => {
  console.log('Server run in port 8080');
});
