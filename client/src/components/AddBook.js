import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getAllAuthors, getAllBooks, addBook } from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }

  displayAuthors= () => {
    return this.props.getAllAuthors.loading ? <option disabled>
        Loading...
      </option> : this.props.getAllAuthors.authors.map(author => {
        return <option key={author.id} value={author.id}>
            {author.name}
          </option>;
      });
  }

  addBoook = (e) => {
    e.preventDefault();
    this.props.addBook({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getAllBooks}]
    });
  }

  render() {
    return <form onSubmit={this.addBoook}>
      <div className="field">
          <label>Book name:</label>
        <input type="text" value={this.state.name} onChange={e => this.setState(
                {
                  name: e.target.value
                }
              )} />
        </div>

      <div className="field">
          <label>Genre:</label>
        <input type="text" value={this.state.genre} onChange={e => this.setState(
                {
                  genre: e.target.value
                }
              )} />
        </div>

      <div className="field">
          <label>Author:</label>
        <select value={this.state.authorId} onChange={e => this.setState(
                {
                  authorId: e.target.value
                }
              )}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>;
  }
}

export default compose(
  graphql(getAllAuthors, { name:'getAllAuthors'}),
  graphql(addBook, { name: 'addBook' })
)(AddBook);
