import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import { NavLink } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("https://karanfinal.onrender.com/api/book-list")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log("Error from BookList");
      });
  }, []);

  const bookList =
    books.length === 0
      ? "there is no book record!"
      : books.map((book, k) => (
          <BookCard
            title={book.title}
            desc={book.description}
            author={book.author}
            _id={book._id}
            handleDelete={() => handleDelete(book._id)}
          />
        ));
  const handleDelete = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch("https://karanfinal.onrender.com/api/delete-book/" + id, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBooks(books.filter((book) => book._id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div class="BookList">
      <div class="col-md-12">
        <br />
        <h2 class="display-4 text-center">Books in the list</h2>
        <div
          style={{
            backgroundColor: "yellow",
            color: "black",
            borderRadius: "50%",
            display: "inline-block",
            padding: "50px",
            marginLeft: "10px",
            fontSize: "24px",
            fontWeight: "bold",
            marginTop:"0",
            height:"15px",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <p class="text-center">{books.length}</p>
        </div>
      </div>
      <div class="col-md-11" style={{marginTop:"25px",textAlign:"end"}}>
        <a class="btn btn-info float-right" href="/create-book">
          + Add New Book
        </a>
        <br />
        <br />
        <hr />
      </div>
      <div class="list">{bookList}</div>
    </div>
  );
}

export default BookList;
