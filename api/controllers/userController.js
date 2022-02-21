const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {createJWT} = require ('../utils/auth')
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

// newUser.save((err, user) => {
//   if (err) res.send(err);
//   res.json(user)
// });


exports.loginUser = (req,res) => {
  User.findOne(
    {email: req.body.email}, (err, user) =>{
      if (user){
        if (req.body.password === user.password){
          res.send({message: "login successful", user: user})
        } else {
          res.send(err)
        }
      }
    }
  )
}
exports.getAllBooks = async(req, res) => {

  let foundUser = await  User.find({_id:req.body._id}).populate("books");
  res.json(foundUser)
};
