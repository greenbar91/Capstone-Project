import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteChapterThunk,
  getAllChaptersThunk,
  selectAllChapters,
} from "../../redux/chapter";
import { deleteBookThunk, selectAllBooks } from "../../redux/book";
import { useEffect, useState } from "react";
import "./AuthorHomePageBooks.css";
import { IoMdAddCircle } from "react-icons/io";

import StarRating from "../StarRating/StarRating";

function AuthorHomePageBooks() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bookId, setBookId] = useState(null);
  const [userBooks, setUserBooks] = useState([]);
  const chapters = useSelector(selectAllChapters);
  const books = useSelector(selectAllBooks);

  useEffect(() => {
    const fetchUserBooks = async () => {
      const res = await fetch("/api/books/my_books");

      if (res.ok) {
        const data = await res.json();
        setUserBooks(data.Books);
      }
    };

    fetchUserBooks();
  }, [dispatch, books, chapters]);

  const handleBookClick = async (bookId) => {
    await dispatch(getAllChaptersThunk(bookId));
    setBookId(bookId);
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

  const handleAddChapterNavClick = (bookId) => {
    navigate(`/books/my_books/add_chapter/${bookId}`);
  };

  const handleEditChapterClick = (bookId, chapterId) => {
    navigate(`/books/my_books/${bookId}/edit_chapter/${chapterId}`);
  };

  const handleDeleteChapterClick = (chapterId) => {
    dispatch(deleteChapterThunk(bookId, chapterId));
  };

  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce(
      (acc, review) => acc + review.star_rating,
      0
    );
    return totalRating / reviews.length;
  };

  return (
    <div>
      <div className="author-page-books-container">
        <h3
          style={{
            padding: "10px",
            backgroundColor: "#2A3642",
            color: "white",
            marginBottom: "10px",
          }}
        >
          Books
        </h3>
        <div className="author-books-container">
          {userBooks &&
            userBooks.map((book) => {
              const averageRating = getAverageRating(book.reviews);

              return (
                <div key={book.id} className="author-book">
                  <h5
                    style={{
                      cursor: "pointer",
                      fontSize: "12px",
                      padding: "5px",
                    }}
                    onClick={() => handleBookClick(book.id)}
                  >
                    {book.title}
                  </h5>
                  <img
                    style={{ cursor: "pointer" }}
                    onClick={() => handleBookClick(book.id)}
                    src={book.cover_art}
                  />
                  <div className="tag-container">
                    {book.tags.map((tag) => (
                      <div key={tag.id} className="tag">
                        {tag.tag_name}
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "20px",
                      fontSize: "20px",
                      alignItems: "center",
                    }}
                  >
                    <StarRating rating={averageRating} />
                  </div>
                  <div className="author-book-buttons">
                    <button
                      className="author-page-edit-buttons"
                      onClick={() => handleEditClick(book)}
                    >
                      Edit
                    </button>

                    <button
                      className="author-page-delete-buttons"
                      style={{ backgroundColor: "red" }}
                      onClick={() => handleDeleteClick(book.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          <div className="add-book-button">
            <IoMdAddCircle
              className="add-circle-button"
              style={{ cursor: "pointer" }}
              title="Add a new book"
              onClick={handleAddBookNavClick}
            ></IoMdAddCircle>
          </div>
        </div>
      </div>
      <div className="author-chapters-container">
        <h3
          style={{
            padding: "10px",
            backgroundColor: "#2A3642",
            color: "white",
            marginBottom: "10px",
          }}
        >
          Chapters
        </h3>
        {bookId && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                // padding: "10px",
                borderBottom: "2px solid #E5E5E5",
              }}
            >
              <h2
                style={{
                  fontWeight: "bold",
                  fontSize: "15px",
                  padding: "10px",
                  color: "red",
                }}
              >
                Chapter Name
              </h2>
              <h2
                style={{
                  fontWeight: "bold",
                  fontSize: "15px",
                  padding: "10px",
                  paddingRight: "50px",
                }}
              >
                Edit/Delete Chapters
              </h2>
            </div>
            {chapters.map((chapter) => (
              <div key={chapter.id} className="chapters-container">
                <div className="chapter-title">{chapter.title}</div>
                <div className="chapter-release-date">
                  <div
                    className="author-book-buttons"
                    style={{ paddingRight: "50px" }}
                  >
                    <button
                      className="author-page-edit-buttons"
                      onClick={() => handleEditChapterClick(bookId, chapter.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="author-page-delete-buttons"
                      onClick={() => handleDeleteChapterClick(chapter.id)}
                      style={{ backgroundColor: "red", border: "none" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {bookId && (
              <div
                className="add-book-button"
                style={{
                  padding: "20px",
                  justifyContent: "start",
                  fontSize: "32px",
                }}
              >
                <IoMdAddCircle
                  className="add-circle-button"
                  style={{ cursor: "pointer" }}
                  title="Add a new chapter"
                  onClick={() => handleAddChapterNavClick(bookId)}
                >
                  {" "}
                </IoMdAddCircle>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthorHomePageBooks;
