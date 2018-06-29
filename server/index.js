require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');

const strategy = require('./strategy');

const app = express();

app.use(json());
app.use(cors());
app.use(morgan('tiny'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2 * 7 * 24 * 60 * 60 * 1000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(strategy);

passport.serializeUser((user, done) => {
  return done(null, user);
});
passport.deserializeUser((user, done) => {
  return done(null, user);
});

//middleware - look at line 49, you just need to throw it in before an
//        endpoint body to check if a user is logged in
function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('http://localhost:3000');
  }
}

app.get('/', isLoggedIn, (req, res, next) => {
  res.send('Hello, World!');
});

app.get(
  '/login',
  passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: '/login',
    failureFlash: true
  })
);

app.get('/logout', isLoggedIn, (req, res, next) => {
  req.session.destroy();
  res.redirect('http://localhost:3000');
});

app.get('/me', (req, res, next) => {
  const { user } = req;
  return res.status(200).json(user);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
