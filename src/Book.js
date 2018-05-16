import React, { Component } from "react";

import "./Book.css";

class Book extends Component {
  render() {
    return (
      <div className="Book">
        <div>
          <a href="#" target="_blank">
            Title
          </a>
        </div>
        <div>by</div>
        <div>Author</div>
        <form name="try-again" action="/" method="GET">
          <input type="submit" />
          <div id="try" onClick="document.forms['try-again'].submit()">
            Already read that one? Try Again.
          </div>
        </form>
      </div>
    );
  }
}

export default Book;
