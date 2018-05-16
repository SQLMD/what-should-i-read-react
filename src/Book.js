import React from "react";

import "./Book.css";

function Book(props) {
  return (
    <div className="Book">
      <div>
        <a href={props.url} target="_blank">
          {props.title}
        </a>
      </div>
      <div>by</div>
      <div>{props.author}</div>
      <button id="try" onClick={props.getRandomBook}>
        Already read that one? Try Again.
      </button>
    </div>
  );
}

export default Book;
