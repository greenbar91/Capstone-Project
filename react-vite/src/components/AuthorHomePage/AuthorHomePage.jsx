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
import { FaBook } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdMenuBook } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { MdFavorite } from "react-icons/md";

const AuthorHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userBooks, setUserBooks] = useState([]);
  const [userChapters, setUserChapters] = useState([]);
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
    const fetchUserChapters = async () => {
      const res = await fetch("/api/books/my_chapters");

      if (res.ok) {
        const data = await res.json();
        setUserChapters(data.Chapters);
      }
    };
    fetchUserChapters();
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

  const totalWordCount = () => {
    let wordCount = 0;

    userChapters.forEach((chapter) => {
      if (chapter.body) {
        wordCount += chapter.body.split(" ").length;
      }
    });

    return wordCount;
  };

  const totalChapters = () => {
    let chapterCount = 0;

    userBooks.forEach((book) => {
      if (book.chapter_count) {
        chapterCount += book.chapter_count;
      }
    });

    return chapterCount;
  };

  const totalReviews = () => {
    let reviewCount = 0;

    userBooks.forEach((book) => {
      if (book.reviews) {
        reviewCount += book.reviews.length;
      }
    });

    return reviewCount;
  };

  const totalFavorites = () => {
    let favoriteCount = 0

    userBooks.forEach((book) => {
      if (book.reviews) {
        favoriteCount += book.favorites.length;
      }
    });

    return favoriteCount
  }

  return (
    <div className="author-page-container">
      <div className="author-page-header">
        <h2>Author Dashboard</h2>
      </div>
      <div className="author-stats-container">
        <div className="author-stats">
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <FaBook style={{ paddingRight: "5px", fontSize: "24px" }} />
            <div style={{ display: "flex", flexDirection: "row" }}>
              Books:{" "}
              <div
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  fontWeight: "normal",
                  paddingLeft: "2px",
                }}
              >
                {userBooks.length}
              </div>
            </div>
          </div>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <MdMenuBook style={{ paddingRight: "5px", fontSize: "24px" }} />
            <div style={{ display: "flex", flexDirection: "row" }}>
              Total chapters:
              <div
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  fontWeight: "normal",
                  paddingLeft: "2px",
                }}
              >
                {totalChapters()}
              </div>
            </div>
          </div>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <FaPencil style={{ paddingRight: "5px", fontSize: "24px" }} />
            <div style={{ display: "flex", flexDirection: "row" }}>
              Total words:
              <div
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  fontWeight: "normal",
                  paddingLeft: "2px",
                }}
              >
                {totalWordCount()}
              </div>
            </div>
          </div>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <MdRateReview style={{ paddingRight: "5px", fontSize: "24px" }} />
            <div style={{ display: "flex", flexDirection: "row" }}>
              Reviews received:
              <div
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  fontWeight: "normal",
                  paddingLeft: "2px",
                }}
              >
                {totalReviews()}
              </div>
            </div>
          </div>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <MdFavorite style={{ paddingRight: "5px", fontSize: "24px" }} />
            <div style={{ display: "flex", flexDirection: "row" }}>
              Total favorites:
              <div
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  fontWeight: "normal",
                  paddingLeft: "2px",
                }}
              >
                {totalFavorites()}
              </div>
            </div>
          </div>
        </div>
      </div>
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
