import "bootstrap/dist/css/bootstrap.min.css";
function BookCard(props) {
  const { title, desc, author, _id, handleDelete } = props;

  return (
    <div class="card-container" style={{ textAlign: "start" }}>
      <img
        src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
        alt="Books"
        height="200"
      />

      <div class="desc">
        <h2 style={{ fontWeight: "bold" }}>{title}</h2>
        <h3>{author}</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ marginTop: "0" }}>{desc}</p>
          <img src="./cross.jpg" alt="cross" height="20" onClick={handleDelete}></img>
          {/* <a onClick={handleDelete}>Delete</a> */}
        </div>
      </div>
    </div>
  );
}

export default BookCard;
