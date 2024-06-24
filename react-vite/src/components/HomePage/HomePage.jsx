import { useState, useEffect } from "react";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooksThunk, postBookThunk, putBookThunk, deleteBookThunk, selectAllBooks } from "../../redux/book";

export default function HomePage() {
  const [title, setTitle] = useState("");
  const [blurb, setBlurb] = useState("");
  const [coverArt, setCoverArt] = useState("");
  const [userBooks, setUserBooks] = useState([]);
  const [bookById, setBookById] = useState({});
  const [editBookId, setEditBookId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBlurb, setEditBlurb] = useState("");
  const [editCoverArt, setEditCoverArt] = useState("");

  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);

  const handleDetailsClick = async (bookId) => {
      const res = await fetch(`/api/books/${bookId}`);

      if (res.ok) {
        const data = await res.json();
        setBookById(data.Book);
      }
  };

  useEffect(() => {
    const fetchUserBooks = async () => {
      const res = await fetch("/api/books/my_books");

      if (res.ok) {
        const data = await res.json();
        setUserBooks(data.Books);
      }
    };
    fetchUserBooks();
  }, [dispatch, books]);

  useEffect(() => {
    dispatch(getAllBooksThunk());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { title, blurb, cover_art: coverArt };
    dispatch(postBookThunk(newBook));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedBook = { title: editTitle, blurb: editBlurb, cover_art: editCoverArt };
    dispatch(putBookThunk(editBookId, updatedBook));
    setEditBookId(null);
    setEditTitle("");
    setEditBlurb("");
    setEditCoverArt("");
  };

  const handleEditClick = (book) => {
    setEditBookId(book.id);
    setEditTitle(book.title);
    setEditBlurb(book.blurb);
    setEditCoverArt(book.cover_art);
  };

  const handleDeleteClick = (bookId) => {
    dispatch(deleteBookThunk(bookId));
  };

  return (
    <div>
      <h1>Books List</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id} onClick={() => handleDetailsClick(book.id)}>
            {book.title} by {book.author_name}
            <button onClick={() => handleEditClick(book)}>Edit</button>
            <button onClick={() => handleDeleteClick(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h1>Current User Books</h1>
      <ul>
        {userBooks && userBooks.map((book) => (
          <li key={book.id}>
            {book.title}
            {/* <img src={book.cover_art} alt={book.title} /> */}
          </li>
        ))}
      </ul>
      <h1>Book by Id</h1>
      {bookById && (<div>{bookById.title} by {bookById.author_name}</div>)}
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Blurb</label>
          <input
            type="text"
            value={blurb}
            onChange={(e) => setBlurb(e.target.value)}
          />
        </div>
        <div>
          <label>Cover Art URL</label>
          <input
            type="text"
            value={coverArt}
            onChange={(e) => setCoverArt(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
      </form>

      {editBookId && (
        <div>
          <h2>Edit Book</h2>
          <form onSubmit={handleEditSubmit}>
            <div>
              <label>Title</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Blurb</label>
              <input
                type="text"
                value={editBlurb}
                onChange={(e) => setEditBlurb(e.target.value)}
              />
            </div>
            <div>
              <label>Cover Art URL</label>
              <input
                type="text"
                value={editCoverArt}
                onChange={(e) => setEditCoverArt(e.target.value)}
              />
            </div>
            <button type="submit">Update Book</button>
          </form>
        </div>
      )}
    </div>
  );
}
