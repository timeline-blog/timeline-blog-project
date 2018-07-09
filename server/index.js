require('dotenv').config();
//regular setup
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const massive = require('massive');
const bcrypt = require('bcryptjs');

const PORT = process.env.PORT || 3001;
const app = express();

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


//app listening
app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`)
})
