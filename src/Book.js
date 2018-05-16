import React from "react";

import "./Book.css";

function Book(props) {
  return (
    <div className="Book">
      <div>
        <a href="{props.url}" target="_blank">
          {props.title}
        </a>
      </div>
      <div>by</div>
      <div>{props.author}</div>
      <form name="try-again" action="/" method="GET">
        <input type="submit" />
        <div id="try" onClick="document.forms['try-again'].submit()">
          Already read that one? Try Again.
        </div>
      </form>
    </div>
  );
}

export default Book;
