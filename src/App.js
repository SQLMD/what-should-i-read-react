import React from "react";

import "./App.css";
import Book from "./Book";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { title: "", author: "", amazon_url: "", cover_url: "" };
    this.state = {
      book: {
        title: "",
        author: "",
        amazon_url: "",
        cover_url: "",
        description: ""
      }
    };
    this.getRandomBook = this.getRandomBook.bind(this);
  }

  async getRandomBook() {
    const response = await axios.get("api/book");
    const book = response.data;
    await this.setState({ book });
  }

  componentDidMount() {
    this.getRandomBook();
    console.log(this.state.book);
  }

  render() {
    return (
      <div className="App">
        {" "}
        <main>
          <header>
            <h1>What the Heck Should I read?</h1>
          </header>
          <Book book={this.state.book} getRandomBook={this.getRandomBook} />
        </main>
        <footer>
          <img src="/images/nyt.png" alt="Data provided by New York Times" />
        </footer>
      </div>
    );
  }
}

export default App;
