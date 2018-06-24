import React from "react";

import "./App.css";
import Book from "./Book";
import Loader from "react-loader-spinner";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { title: "", author: "", amazon_url: "", cover_url: "" };
    this.state = {
      isLoaded: false,
      type: "fiction",
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
    await this.setState({ isLoaded: false });
    const response = await axios.get("api/book?type=" + this.state.type);
    const book = response.data;
    const type = this.state.type === "fiction" ? "nonfiction" : "fiction";
    await this.setState({ type, isLoaded: true, book });
  }

  async componentDidMount() {
    await this.getRandomBook();
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
          {this.state.isLoaded ? (
            <Book
              type={this.setState}
              book={this.state.book}
              getRandomBook={this.getRandomBook}
            />
          ) : (
            <Loader type="Grid" color="#00BFFF" height="100" width="100" />
          )}
        </main>
        <footer>
          <img src="/images/nyt.png" alt="Data provided by New York Times" />
        </footer>
      </div>
    );
  }
}

export default App;
