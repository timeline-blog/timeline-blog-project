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


const { getUser, saveUser, googleSignIn, logout } = require('./controllers/authCtrl')

// massive(process.env.CONNECTION_STRING)
//         .then(db=> {app.set('db',db)
//         console.log('connected')
//     })
//         .catch(console.log)

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
   return done(null,profile)
}))

//endpoint for regular user login
app.get('/auth/login',getUser)

//endpoint for regular user signup
app.post('/auth/signup',saveUser)

//endpoint for sign in with google
app.get('/auth/google',passport.authenticate('google',{
    scope: ['profile','openid', 'email']
}))


//callback route for google to redirect to
app.get('/auth/google/redirect',passport.authenticate('google'),googleSignIn)

app.get('/auth/logout',logout)


//app listening
app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`)
})
