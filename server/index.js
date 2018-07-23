require("dotenv").config();
//regular setup
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const massive = require("massive");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

const PORT = process.env.PORT || 3001;
const app = express();


const { createEvent,deleteEvent, updateEvent } = require(`${__dirname}/controllers/eventCtrl`)

const {
  getLoggedInUser,
  getUser,
  saveUser,
  googleSignIn,
  logout
} = require(`${__dirname}/controllers/authCtrl`);
const {
  getStory,
  addStory,
  editStory,
  deleteStory,
  addLike,
  unlike,
  likeCount
} = require(`${__dirname}/controllers/storyCtrl`);
const {
  getFollowing,
  getFollowers,
  addFollow,
  unfollow,
  followCheck,
  getFollowerCount,
  searchUsers
} = require(`${__dirname}/controllers/followsCtrl`);
const { getHome, getLiked } = require(`${__dirname}/controllers/homeCtrl`);
const {
  getFiltered,
  getAll
} = require(`${__dirname}/controllers/discoverCtrl`);
const {
  getProfile,
  editUser,
  getUserById
} = require(`${__dirname}/controllers/profileCtrl`);
const {
  getComments,
  addComment,
  editComment,
  deleteComment
} = require(`${__dirname}/controllers/commentCtrl`);

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(console.log);

app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 60
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

//create google strategy
passport.use(
  new GoogleStrategy(
    {
      //options for the google strat
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      //passport callback function
      return done(null, profile);
    }
  )
);
//get logged in user
app.get("/auth/loggedIn", getLoggedInUser);

//endpoint for regular user login
app.post("/auth/login", getUser);

//endpoint for regular user signup
app.post("/auth/signup", saveUser);

//endpoint for sign in or sign up with google
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "openid", "email"]
  })
);

//callback route for google to redirect to
app.get("/auth/google/redirect", passport.authenticate("google"), googleSignIn);

//specific story endpoint
app.get("/api/story/:story_id", getStory);
app.post("/api/story", addStory);
app.put("/api/story/:story_id", editStory);
app.delete("/api/story/:story_id", deleteStory);
app.post("/api/like", addLike);
app.delete("/api/unlike/:user_id", unlike);

//like count
app.get("/api/like/:story_id", likeCount);

//comments endpoints
app.get("/api/comments/:event_id", getComments);
app.post("/api/comments", addComment);
app.put("/api/comments/:comment_id", editComment);
app.delete("/api/comments/:comment_id", deleteComment);

//get people you are following
app.get("/api/people/following/:user_id", getFollowing);

//get followers
app.get('/api/user/search/:name', searchUsers);
app.get("/api/people/followers/:user_id", getFollowers);
app.post("/api/followcheck", followCheck);
app.get("/api/followercount/:user_id", getFollowerCount);

//follow a user
app.post("/api/people/follow", addFollow);

//unfollow a user
app.post("/api/people/unfollow", unfollow);

//event controller
app.post('/api/event/:story_id',createEvent)
app.delete('/api/event/:event_id',deleteEvent)
app.put('/api/event/:event_id', updateEvent)

//home following
app.get("/api/home/:user_id", getHome);
app.get("/api/likes/:user_id", getLiked);

//discover page
app.get("/api/discover/sort/:category", getFiltered);
app.get("/api/discover/all", getAll);

//profile page
app.get("/api/profile/:user_id", getProfile);
app.put("/api/user/:user_id", editUser);
app.get("/api/user/:user_id", getUserById);

//logout
app.get("/auth/logout", logout);

//app listening
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});