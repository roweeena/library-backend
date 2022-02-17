const mongoose = require('mongoose');
const Book = mongoose.model('Book');

exports.listAllBooks = (req, res) => {
  Book.find({}, (err, books) => {
    if(err) res.send(err);
    console.log(res.json(books));
  })
};
  exports.createBook = (req, res) => {
    const newBook = new Book(req.body)
    newBook.save((err, book) => {
      if (err) res.send(err);
      res.json(book)
    });  
  };

  exports.readBook = (req, res) =>{
    Book.findById(req.params.bookId, (err, book) => {
      if (err) res.send(err);
      res.json(book)
    })
  };

  exports.updateBook = (req, res) =>{
    Book.findOneAndUpdate(
      {_id: req.params.bookId}, req.body,
      {new: true},
      (err, book) => {
        if (err) res.send(err);
        res.json(book)
      }
    )
  };

  exports.deleteBook = (req, res) => {
    Book.deleteOne({_id:req.params.bookId}, (err) => {
      if (err) res.send(err);
      res.json({
        message: "Book successfully deleted",
        _id: req.params.bookId
      })
    })
  }