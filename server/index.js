require('dotenv').config();
//regular setup
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const massive = require('massive');


const PORT = process.env.PORT || 3001;
const app = express();


const { getUser, saveUser } = require('./controllers/authCtrl')

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

//endpoint for regular user login
app.get('/api/login',getUser)
//endpoint for regular user signup
app.post('/api/signup',saveUser)


//app listening
app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`)
})
