import { NavLink } from "react-router-dom";
import "./RecentlyUpdatedBooks.css";
import { useEffect, useState } from "react";

function RecentlyUpdatedBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchRecentlyUpdated = async () => {
      const res = await fetch("/api/books/recently_updated");

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setBooks(data);
      }
    };
    fetchRecentlyUpdated();
  }, []);

  return (
    <div className="recently-updated-container">
      {books &&
        books.map((book) => (
          <div key={book.id} className="recent-books-container">
            <NavLink
              to={`/books/${book.book_id}`}
              className="recent-books-cover"
            >
              <img src={book.cover_art} />
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
        ))}
    </div>
  );
}

export default RecentlyUpdatedBooks;
