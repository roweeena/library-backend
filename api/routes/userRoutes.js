const userBuilder = require('../controllers/userController')


module.exports = (app) => {
  app
      .route('/login')
      .post(userBuilder.loginUser)

  app
      .route('/register')
      .post(userBuilder.createUser)
  app
      .route('users/:_id/books')
      .get(userBuilder.getAllBooks)
  app
      .route('/users')
      .get(userBuilder.listAllUsers)
}
