require('dotenv').config();
//regular setup
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const massive = require('massive');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')


const PORT = process.env.PORT || 3001;
const app = express();


const { getUser, saveUser, googleSignIn, logout } = require(`${__dirname}/controllers/authCtrl`);
const { getStory } = require(`${__dirname}/controllers/storyCtrl`);
const { getFollowing, getFollowers, addFollow, unfollow } = require(`${__dirname}/controllers/followsCtrl`);
const { getHome, getLiked } = require(`${__dirname}/controllers/homeCtrl`);
const { getFiltered, getAll } = require(`${__dirname}/controllers/discoverCtrl`);
const { getProfile } = require(`${__dirname}/controllers/profileCtrl`);


massive(process.env.CONNECTION_STRING)
        .then(db=> {app.set('db',db)
    
    })
        .catch(console.log)

app.use(bodyParser.json())
app.use(cors())

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 60
        }
    })
)

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  
  return done(null, user);
});

  //create google strategy
  passport.use(new GoogleStrategy({
    //options for the google strat
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL:'/auth/google/redirect'

},(accessToken, refreshToken, profile, done)=>{
    //passport callback function
   return done(null, profile)
}));

//endpoint for regular user login
app.get('/auth/login', getUser);

//endpoint for regular user signup
app.post('/auth/signup', saveUser);

//endpoint for sign in with google
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'openid', 'email']
}));


//callback route for google to redirect to
app.get('/auth/google/redirect', passport.authenticate('google'), googleSignIn);

//specific story endpoint
app.get('/api/story/:story_id', getStory);

//get people you are following
app.get('/api/people/following/:user_id', getFollowing);

//get followers
app.get('/api/people/followers/:user_id', getFollowers);

//follow a user
app.post('/api/people/follow', addFollow);

//unfollow a user
app.post('/api/people/unfollow', unfollow);


//home following
app.get('/api/home/:user_id', getHome);
app.get('/api/likes/:user_id', getLiked);

//discover page
app.get('/api/discover/sort/:category', getFiltered);
app.get('/api/discover/all', getAll);

//profile page
app.get('/api/profile/:user_id', getProfile);

//logout
app.get('/auth/logout', logout);


//app listening
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});
