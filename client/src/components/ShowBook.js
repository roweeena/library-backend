import React, {Component} from 'react';

import {Link} from 'react-router-dom'


const ShowBook = (props) =>{

  const books = props.books

    return(
      <div>
      <Link to={`/books/${books._id}`}>
        <div>
          <h3> {books.title}</h3>
          <p><strong>By:</strong> {books.author}</p>
        </div>
      </Link>


      </div>
    )

}
export default ShowBook
