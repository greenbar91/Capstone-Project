import { NavLink } from "react-router-dom";
import "./RecentlyUpdatedBooks.css";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

function RecentlyUpdatedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentlyUpdated = async () => {
      const res = await fetch("/api/books/recently_updated");

      if (res.ok) {
        const data = await res.json();
        setBooks(data);
        setLoading(false);
      }
    };
    fetchRecentlyUpdated();
  }, []);

  return (
    <div className="recently-updated-container">
      {loading ? (
        <div className="loading-circle">
          <FaSpinner className="spinner" />
        </div>
      ) : (
        books &&
        books.map((book) => (
          <div key={book.id} className="recent-books-container">
            <NavLink
              to={`/books/${book.book_id}`}
              className="recent-books-cover"
            >
              <img className="book-cover-art" src={book.cover_art} />
            </NavLink>

            <NavLink
              to={`/books/${book.book_id}`}
              className={"recent-books-book-title"}
            >
              {book.book_title}
            </NavLink>

            <NavLink
              to={`/books/${book.book_id}/chapters/${book.id}`}
              className={"recent-books-chapter-title"}
            >
              {book.title}
            </NavLink>
            <div className="recent-books-tags"></div>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentlyUpdatedBooks;
