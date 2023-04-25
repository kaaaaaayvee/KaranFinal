import { NavLink,useNavigate } from "react-router-dom";
import React, { useState } from "react";

const AddBook = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    author: "",
    description: "",
  });
  const navigate = useNavigate(); // Add useHistory hook

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, author, description } = formData;
    if (!title) {
      setErrors({ ...errors, title: "Title is required" });
      return;
    }
    if (!author) {
      setErrors({ ...errors, author: "Author is required" });
      return;
    }
    if (!description) {
      setErrors({ ...errors, description: "Description is required" });
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Add this line
      },
      body: JSON.stringify({ title, author, description }),
    };
    fetch("https://karanfinal.onrender.com/api/create-book", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFormData({
          title: "",
          description: "",
          author: "",
        });
        setErrors({});
        navigate('/booksList'); // Navigate to "/booksList" on success
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="CreateBook">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <NavLink
                to={{
                  pathname: "/booksList",
                }}
              >
                <div style={{ textAlign: "start" }}>
                  <h2 className="btn btn-info float-left" href="/">
                    Show BooK List
                  </h2>
                </div>
              </NavLink>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Book</h1>
              <p className="lead text-center">Create new book</p>
              <form noValidate onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Title of the Book"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleInputChange}
                    spellCheck="false"
                    data-ms-editor="true"
                  />
                  {errors.title && (
                    <div className="invalid-feedback">{errors.title}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Author"
                    name="author"
                    className="form-control"
                    value={formData.author}
                    onChange={handleInputChange}
                    spellCheck="false"
                    data-ms-editor="true"
                  />
                  {errors.author && (
                    <div className="invalid-feedback">{errors.author}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Describe this book"
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleInputChange}
                    spellCheck="false"
                    data-ms-editor="true"
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <input
                  style={{ width: "100%" }}
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
