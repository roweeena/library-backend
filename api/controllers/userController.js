const mongoose = require('mongoose');
const User = mongoose.model('User');


exports.createUser = (req, res) => {
  const newUser = new User(req.body)
  newUser.save((err, user) => {
    if (err) res.send(err);
    res.json(user)
  });
};

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
