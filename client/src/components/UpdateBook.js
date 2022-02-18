import React, {Component} from 'react';
import axios from 'axios';

class UpdateBook extends Component {
  constructor(props){
    super()
    this.state = {
      title: '',
      author: '',
      description: '',
      isbn: '',
      image: '',
      published_date: '',
      publisher:''
    }

    this._onChange = this._onChange.bind(this)
    this._onSubmit = this._onSubmit.bind(this)
  }

  componentDidMount(){
    console.log(this.props.match.params.id);
    axios.get(`http://localhost:3001/books/` + this.props.match.params.id).then((response) => {
      console.log(response.data);
      this.setState({
        title: response.data.title,
        author: response.data.author,
        description: response.data.description,
        isbn: response.data.isbn,
        published_date: response.data.published_date,
        publisher:response.data.publisher
      })
    })
  }
  _onSubmit(e) {
    const bookId = this.props.match.params.id
    e.preventDefault()
    console.log("heloooo");
    const data = {
      title: this.state.title,
      author: this.state.author,
      description: this.state.description,
      isbn: this.state.isbn,
      image: this.state.image,
      published_date: this.state.published_date,
      publisher: this.state.publisher
    }
    axios.put('http://localhost:3001/books/'+bookId, data)
    .then((response) => {
      this.props.history.push('/books/'+bookId)

    }).catch((err) =>{
      console.log('hope');
    })

  }
  _onChange(e) {
    console.log(e.target.name);
    this.setState ({
      [e.target.name]: e.target.value
    })
  }
  render(){
    return (
      <div>
        <h3> Update a book in the library</h3>
        <form onSubmit={this._onSubmit}>
          <div>
            <input type="text" placeholder="Title" name="title" onChange={this._onChange} value={this.state.title} className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..." required/>
          </div>
          <div>
            <input type="text" placeholder="Author" name="author" onChange={this._onChange} value={this.state.author} className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..."  required/>
          </div>
          <div>
            <input type="text" placeholder="Description" name="description" onChange={this._onChange} className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..." value={this.state.description}/>
          </div>
          <div>
            <input type="date" placeholder="Date of Publication" name="published_date" onChange={this._onChange} className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..." value={this.state.published_date} required/>
          </div>
          <div>
            <input type="file" placeholder="Image" name="image" onChange={this._onChange} value={this.state.image} className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..." required/>
          </div>
          <div>
            <input type="text" placeholder="Publisher" name="publisher" onChange={this._onChange} className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..." value={this.state.publisher}/>
          </div>
          <div>
            <input type="text" placeholder="ISBN" name="isbn" onChange={this._onChange} value={this.state.isbn} className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..." required/>
          </div>
          <div>
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ...">Update Info </button>
          </div>


        </form>
      </div>
    )
  }
}
export default UpdateBook
