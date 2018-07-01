import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getAllBooks } from "../queries/queries";
import BookDetails from "./BookDetails"

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }
  displayBooks() {
    return this.props.data.loading ? (
      <div>Loading...</div>
    ) : (
      this.props.data.books.map(book => {
          return <li key={book.id}
            onClick={(e)=>{this.setState({selected: book.id})}}
          >{book.name}</li>;
      })
    );
  }
  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId = {this.state.selected}/>
      </div>
    );
  }
}

export default graphql(getAllBooks)(BookList);
