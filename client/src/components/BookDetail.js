import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'


class BookDetail extends Component {
  constructor(props) {
    super();
    this.state={
      book:{}
    }
    this._onDelete = this._onDelete.bind(this)
    this._navigate = this._navigate.bind(this)
  }
  componentDidMount(){
    console.log(this.props.match.params.id);
    axios.get(`http://localhost:3001/books/` + this.props.match.params.id).then((response) => {
      console.log(response.data);
      this.setState({
        book: response.data
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  _onDelete(){
    const bookId = this.props.match.params.id
    axios.delete(`http://localhost:3001/books/`+ bookId).then((response) => {
      this.props.history.push('/books')
    }).catch(err => {
      console.log(err);
    })
  }

  _navigate(){
    const bookId = this.props.match.params.id
    console.log('hello', bookId);
    this.props.history.push(`/edit-book/${bookId}`)
  }
  render() {
    const bookInfo = this.state.book
    const date = new Date(bookInfo.published_date).toLocaleDateString()
    return(
      <div>
        <h2>{bookInfo.title}</h2>
        <div className="book-details">
          <div className="book image">
            {bookInfo.image === undefined ? <img src="../icons8-story-book-96.png" style={{width: "300"+"px"}} alt="Image is unavailable"/>:
            <img src={bookInfo.image} alt={bookInfo.title} />
            }
          </div>
          <div className="book info">
            <h3>By: {bookInfo.author}</h3>
            <p>Description: {bookInfo.description}</p>
            <p>Publisher: {bookInfo.publisher}</p>
            {date === "Invalid Date" ?
             "Published date doesn't exist" : <p>Published: {date}</p>
            }
          </div>

        </div>
        <button onClick={this._onDelete} className="bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ..."> Delete</button>
        <button onClick={this._navigate} className=" bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ..."> Update</button>
      </div>
    )
  }
}
export default BookDetail
