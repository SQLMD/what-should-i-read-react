import React, { Component } from "react";

import "./App.css";
import Book from "./Book";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", author: "", url: "" };
    this.getRandomBook = this.getRandomBook.bind(this);
  }

  getRandomBook() {
    const axios = require("axios");
    const API_KEY = process.env.REACT_APP_API_KEY;
    const randomDate = (start, end) => {
      let d = new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        ),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    };
    let fictionList = true;

    let list = "fiction";
    if (fictionList) {
      list = "nonfiction";
    }
    const rDate = randomDate(new Date(2009, 7, 1), new Date());

    axios
      .get("https://api.nytimes.com/svc/books/v3/lists.json", {
        params: {
          "api-key": API_KEY,
          list: "combined-print-and-e-book-" + list,
          "published-date": rDate
        }
      })
      .then(response => {
        const body = response.data;
        const randomBook = Math.floor(Math.random() * body.results.length);
        if (body.results[randomBook] !== undefined) {
          const title = body.results[
            randomBook
          ].book_details[0].title.toLowerCase();
          const author = body.results[
            randomBook
          ].book_details[0].author.toLowerCase();
          const url = body.results[randomBook].amazon_product_url;
          fictionList = !fictionList;
          this.setState({ title, author, url });
        } else this.getRandomBook();
      })

      .catch(err => {
        console.log("Error:", err);
      });
  }

  componentDidMount() {
    this.getRandomBook();
  }

  render() {
    return (
      <div className="App">
        {" "}
        <main>
          <header>
            <h1>What Should I read next?</h1>
          </header>
          <Book
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
            getRandomBook={this.getRandomBook}
          />
        </main>
        <footer>
          <img src="/images/nyt.png" alt="Data provided by New York Times" />
        </footer>
      </div>
    );
  }
}

export default App;
