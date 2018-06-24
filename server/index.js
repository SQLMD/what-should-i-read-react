const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3001;
const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;
const GB_API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

const getRandomDate = (start, end) => {
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  const month = `0${randomDate.getMonth() + 1}`;
  const day = `0${randomDate.getDate() + 1}`;
  const year = randomDate.getFullYear();
  return [year, month.slice(0, 2), day.slice(0, 2)].join("-");
};

const getRandomBook = async (randomDate, list) => {
  try {
    const response = await axios.get(
      "https://api.nytimes.com/svc/books/v3/lists.json",
      {
        params: {
          "api-key": NYT_API_KEY,
          list: `combined-print-and-e-book-${list}`,
          "published-date": randomDate
        }
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getBookCover = async isbn => {
  const googleBook = await axios.get(
    "https://www.googleapis.com/books/v1/volumes",
    {
      params: {
        key: GB_API_KEY,
        q: `isbn:${isbn}`
      }
    }
  );
  return googleBook;
};

app.get("/api/book", async (req, res) => {
  // let fictionList = true;

  const list = "fiction";
  // if (fictionList) {
  //   list = "nonfiction";
  // }
  const randomDate = getRandomDate(new Date(2009, 7, 1), new Date());
  try {
    let response = await getRandomBook(randomDate, list);
    while (response.data.results.length === 0) {
      response = await getRandomBook(randomDate, list);
    }
    const body = response.data;
    let randomBook = Math.floor(Math.random() * body.results.length);
    while (body.results[randomBook].isbns.length === 0) {
      randomBook = Math.floor(Math.random() * body.results.length);
    }

    const title = body.results[randomBook].book_details[0].title.toLowerCase();
    const author = body.results[
      randomBook
    ].book_details[0].author.toLowerCase();
    const isbn = body.results[randomBook].isbns[0].isbn10;
    const amazon_url = body.results[randomBook].amazon_product_url;
    const book = {
      title,
      author,
      amazon_url,
      cover_url: "",
      description: ""
    };
    try {
      const googleBook = await getBookCover(isbn);
      if (googleBook.data.items !== undefined) {
        const cover_url =
          googleBook.data.items[0].volumeInfo.imageLinks.thumbnail;
        const description = googleBook.data.items[0].volumeInfo.description;
        book.cover_url = cover_url;
        book.description = description;
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(book);
    res.send(book);
  } catch (error) {
    console.log(error);
  }

  // fictionList = !fictionList;
});

// Serve any static files
app.use(express.static(path.join(__dirname, "../build")));
// Handle React routing, return all requests to React app
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
