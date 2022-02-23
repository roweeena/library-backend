const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {createJWT} = require ('../utils/auth');
const User = mongoose.model('User');



exports.listAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if(err) res.send(err);
    res.json(users);
  })
};
exports.createUser = (req, res) => {

  let {username, password, email} = req.body
   User.findOne({username: username, email: email})
        .then(user =>{
          if(user){
            return res.status(422).json({errors: [{user: "Email or username is already taken"}]})
          }else {
            const newUser = new User(req.body);

            bcrypt.genSalt(10, function(err, salt){
              bcrypt.hash(password, salt, function(err, hash){
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(response => {
                  res.json({
                    success:true,
                    result: response
                  })
                }) //then
                .catch(err => {
                  res.json({
                    errors: [{error: err}]
                  })
                })//catch
              })//bcrypt.hash
            })//bcrupt.genSalt
          }//else
   }) //then
};//createUser

exports.loginUser = (req,res) => {
  let {email, password} = req.body
  User.findOne({email:email}).then(user =>{
    if(!user){
      return res.status(404).json({
        errors: [{user: "not found, please sign up to the library"}]
      })
    } else {
      bcrypt.compare(password, user.password, function(err, isMatch){
        if (err){
        throw err
      } else if (!isMatch) {
        return res.status(400).json({errors: [{password: "incorrect password"}]
        })
      } else {
          let jwt_token = createJWT(
            user.email,
            user._id,
            '72hr'
          )//jwt_token


          jwt.verify(jwt_token, process.env.TOKEN_SECRET, (err, decoded)=>{
            if (err) {

              res.status(500).json({errors:err})
            }
            if (decoded){
              return res.status(200).json({
                succes: true,
                token: jwt_token,
                user: user
              })
            }//if decoded

          })//verify
        } //else

      })//compare

    }//else
  })//then
  .catch(err=>{
    res.status(500).json({errors: err})
  })
}//login

exports.getProfile =  (checkAuth(), req, res =>{

  console.log('Profile', req.user);
})

exports.getAllBooks = async(req, res) => {

  let foundUser = await  User.find({_id:req.body._id}).populate("books");
  res.json(foundUser)
};
