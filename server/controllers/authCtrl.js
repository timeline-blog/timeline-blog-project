const bcrypt = require('bcryptjs');

//gets user details when they login using the regular login
const getUser=(req,res)=>{

    //gets the username & password of req.body
   // const { username,password } = req.body
   

    //write a query to get password from db using username. for now, let assume password is 1234
    const inputPassword = '1234'
    const savedPassword = '$2a$10$e7CEBqoL.YPkYhw1qyxJU..8dZwG3Zd7cK7pwuAnRyPox67dpkP2O' //1234 as a hash

    //this compares the inputed password with the password saved in the db
    bcrypt.compareSync(inputPassword,savedPassword) //will output true if passwords match or false if not
    //if password don't match, notify the user
    //if passwords match, get user details and direct them to homescreen

}

//save user details when they login using the regular login

const saveUser=(req,res)=>{

    //get user details from req.body, for now, let's assume password is 1234
    //  const { username,password,email } = req.body 
    // this is the default profile image: https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png
     let password = '1234'

     //hash the password
     let salt = bcrypt.genSaltSync(10)
     let hash = bcrypt.hashSync(password,salt)
     console.log(hash)

     //then save details in database and then send a response to user telling them details saved
     // then ask them to login
    
}


module.exports={
    getUser,
    saveUser,
}