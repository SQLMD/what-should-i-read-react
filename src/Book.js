import React from "react";

import "./Book.css";

function Book(props) {
  return (
    <div className="Book">
      <div id="book-container">
        <div id="title-container">
          <div>
            <a
              href={props.book.amazon_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.book.title}
            </a>
          </div>
          <div> by </div>
          <div>{props.book.author}</div>
        </div>
        {props.book.cover_url !== "" ? (
          <img
            alt={`Book cover for ${props.book.title} by ${props.book.author}`}
            src={props.book.cover_url}
          />
        ) : (
          ""
        )}
      </div>
      <div id="description">{props.book.description}</div>
      <div> Already read that one? </div>
      <button id="try" onClick={() => props.getRandomBook()}>
        Try Again.
      </button>
    </div>
  );
}

export default Book;
