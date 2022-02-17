const bookBuilder = require('../controllers/bookController')

module.exports = (app) => {
  app
      .route('/books')
      .get(bookBuilder.listAllBooks)
      .post(bookBuilder.createBook)

  app
      .route('/books/:bookId')
      .get(bookBuilder.readBook)
      .put(bookBuilder.updateBook)
      .delete(bookBuilder.deleteBook)
}
