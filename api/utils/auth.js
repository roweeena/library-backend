const jwt = require('jsonwebtoken');
const jwtAuthenticate = require ('express-jwt');

exports.createJWT = (email, userId, duration) => {
  const payload = {
    email, userId, duration
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: duration
  })
}

exports.checkAuth = () =>{
  console.log(process.env.TOKEN_SECRET);
  return jwtAuthenticate({
    secret: process.env.TOKEN_SECRET,
    algorithms: ['HS256']
  })
}
