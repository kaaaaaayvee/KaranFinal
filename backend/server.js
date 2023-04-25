const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const uri = process.env.MONGODB_URI;
// connect to your MongoDB Atlas cluster

// create an Express app
const app = express();
app.use(express.json());
app.use(cors());
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

// Add the CORS middleware
app.use(
  cors({
    origin: "https://localhost:3002", // Replace with your React app's origin
  })
);

// allow CORS for all routes
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});
console.log(uri);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// define a schema for your yoga programs

// Book SCHEMA
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
});

// create a model for your books  based on the schema
const BookModel = mongoose.model("300356108-Karan", bookSchema);

// define a route to fetch all books
app.get("/api/book-list", async (req, res) => {
  const booksList = await BookModel.find();
  res.json(booksList);
});

// define a route to fetch all yoga Challenges
app.get("/api/book-details", async (req, res) => {
  const booksList = await BookModel.findById(req.query.id);
  res.json(booksList);
});

app.post("/api/create-book", async (req, res) => {
  try {
    // code to save form data to MongoDB
    console.log("#@@@@@", req.body);
    const bookData = req.body;
    console.log("$$$$$$$$$", bookData);
    const newBook = new BookModel(bookData);

    newBook
      .save()
      .then(() => res.status(201).json({ message: "Book Added successfully!" }))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (error) {
    console.error(error);
  }
});

app.put("/api/update-book/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const bookData = req.body;
    console.log("Updating book with ID: ", bookId);
    console.log("New book data: ", bookData);

    const updatedBook = await BookModel.findByIdAndUpdate(bookId, bookData, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res
      .status(200)
      .json({ message: "Book updated successfully!", book: updatedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.delete("/api/delete-book/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log("Deleting book with ID: ", bookId);

    const deletedBook = await BookModel.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res
      .status(200)
      .json({ message: "Book deleted successfully!", book: deletedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// start the server
const port = process.env.PORT || 9001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
