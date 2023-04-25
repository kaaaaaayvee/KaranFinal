// import "bootstrap/dist/css/bootstrap.min.css";
import "../src/css/styles.css"
import BookList from "./components/FrontPage_BookList";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddBook from "./components/AddBook";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/create-book" element={<AddBook />} />
          <Route path="/" element={<BookList />} />
         <Route path="/booksList" element={<BookList />} />
          {/*  <Route path="book-details" element={<BookDetails />} />
          <Route path="edit-book" element={<EditBook />} /> */}
        </Routes>
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;
