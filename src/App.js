import React, { Component } from "react";

import "./App.css";
import Book from "./Book";

class App extends Component {
  render() {
    return (
      <div className="App">
        {" "}
        <main>
          <header>
            <h1>What Should I read next?</h1>
          </header>
          <Book />
        </main>
        <footer>
          <img src="/images/nyt.png" alt="Data provided by New York Times" />
        </footer>
      </div>
    );
  }
}

export default App;
