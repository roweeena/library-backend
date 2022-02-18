const mongoose = require('mongoose');
const User = mongoose.model('User');


exports.listAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if(err) res.send(err);
    console.log(res.json(users));
  })
};
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
exports.getAllBooks = async(req, res) => {

  let foundUser = await  User.find({_id:req.body._id}).populate("books");
  res.json(foundUser)
};
