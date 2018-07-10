const bcrypt = require('bcryptjs');



//gets user details when they login using the regular login
const getUser=(req,res)=>{

    const auth = req.app.get('db').auth;

    //gets the username & password of req.body
    const { email,password } = req.body
    
   auth.default.getPassword([email])
                .then(response=>{        
                  if ( bcrypt.compareSync(response[0],password)){
                      res.redirect('homepage')
                  }else{
                      res.status(500).json('Wrong username or password')
                  }
                })

    //write a query to get password from db using username. for now, let assume password is 1234
    // const inputPassword = '1234'
    // const savedPassword = '$2a$10$e7CEBqoL.YPkYhw1qyxJU..8dZwG3Zd7cK7pwuAnRyPox67dpkP2O' //1234 as a hash

    //this compares the inputed password with the password saved in the db
    // bcrypt.compareSync(inputPassword,savedPassword) //will output true if passwords match or false if not
    //if password don't match, notify the user
    //if passwords match, get user details and direct them to homescreen

}

//save user details when they login using the regular login

const saveUser=(req,res)=>{

    const auth = req.app.get('db').auth;

    //get user details from req.body, for now, let's assume password is 1234
      const { username,password,email } = req.body 
    let  image= "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password,salt)

    auth.default.signUp([username,image,email,hash])
                .then(response=>{
                    res.redirect('homepage')
                })


     //hash the password 10 signifies the number of times you want the salt applied
    

     //then save details in database and then send a response to user telling them details saved
     // then ask them to login
    
}

const googleSignIn=(req,res)=>{

    const auth = req.app.get('db').auth;

    const { user }= req

    auth.google.getUserByEmail([user.emails[0].value])
                .then(response=>{
                    if(response){                                   
                        res.redirect('homepage')
                    } else{
                        auth.google.signUp([user.displayName,user.picture,user.emails[0].value,user.id])
                                    .then(response=>{
                                        res.redirect('homepage')
                                    })
                    }
                })

    //sql statement to save user details


}

const logout=(req,res) =>{
    req.session.destory(()=>{
        res.redirect('/')
    })

}


module.exports={
    getUser,
    saveUser,
    googleSignIn,
    logout
}