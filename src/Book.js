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
      <div>{props.isbn}</div>
      <button id="try" onClick={props.getRandomBook}>
        Already read that one? Try Again.
      </button>
      <img
        alt={`"${props.title} by ${props.author} ${props.isbn} "`}
        src={`http://covers.openlibrary.org/b/isbn/${props.isbn}-L.jpg`}
      />
    </div>
  );
}

export default Book;
