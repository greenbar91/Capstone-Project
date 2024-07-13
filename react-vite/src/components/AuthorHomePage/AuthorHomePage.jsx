import { useEffect, useState } from "react";
import "./AuthorHomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookThunk, selectAllBooks } from "../../redux/book";
import {
  getAllChaptersThunk,
  deleteChapterThunk,
  selectAllChapters,
} from "../../redux/chapter";
import { useNavigate } from "react-router-dom";

const AuthorHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userBooks, setUserBooks] = useState([]);
  const [bookId, setBookId] = useState(null);

  const books = useSelector(selectAllBooks);
  const chapters = useSelector(selectAllChapters);

  const handleBookClick = async (bookId) => {
    await dispatch(getAllChaptersThunk(bookId));
    setBookId(bookId);
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

  const handleAddChapterNavClick = (bookId) => {
    navigate(`/books/my_books/add_chapter/${bookId}`);
  };

  const handleAddBookNavClick = () => {
    navigate(`/books/my_books/add_book`);
  };

  const handleEditClick = (book) => {
    navigate(`/books/my_books/edit/${book.id}`);
  };

  const handleDeleteClick = (bookId) => {
    dispatch(deleteBookThunk(bookId));
  };

  const handleEditChapterClick = (bookId, chapterId) => {
    navigate(`/books/my_books/${bookId}/edit_chapter/${chapterId}`);
  };

  const handleDeleteChapterClick = (chapterId) => {
    dispatch(deleteChapterThunk(bookId, chapterId));
  };

  return (
    <div className="author-page-container">
      <div className="author-stats-container"></div>
      <div className="author-page-books-container">
        <h3>Current User Books</h3>
        {userBooks &&
          userBooks.map((book) => (
            <div key={book.id}>
              <div onClick={() => handleBookClick(book.id)}>{book.title}</div>
              <button onClick={() => handleEditClick(book)}>Edit</button>
              <button onClick={() => handleDeleteClick(book.id)}>Delete</button>
            </div>
          ))}
      </div>

      <div>
        <h2>Add a New Book</h2>
        <button onClick={handleAddBookNavClick}> + </button>
      </div>

      <div>
        {bookId && (
          <div>
            <h2>Chapters</h2>
            {chapters.map((chapter) => (
              <div key={chapter.id}>
                <div>
                  {chapter.title}
                  <button
                    onClick={() => handleEditChapterClick(bookId, chapter.id)}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteChapterClick(chapter.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {bookId && (
        <div>
          <h2>Add a New Chapter</h2>
          <button onClick={() => handleAddChapterNavClick(bookId)}> + </button>
        </div>
      )}
    </div>
  );
};

export default AuthorHomePage;
