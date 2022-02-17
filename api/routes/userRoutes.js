const userBuilder = require('../controllers/userController')


module.exports = (app) => {
  app
      .route('/login')
      .post(userBuilder.loginUser)

  app
      .route('/register')
      .post(userBuilder.createUser)

}
