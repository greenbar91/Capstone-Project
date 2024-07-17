import { useEffect, useState } from "react";
import "./HeavilyDiscussedBooks.css";
import { NavLink } from "react-router-dom";
import { FaSpinner } from "react-icons/fa"; 

function HeavilyDiscussedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeavilyDiscussedBooks = async () => {
      const res = await fetch("/api/books/heavily_discussed");

      if (res.ok) {
        const data = await res.json();
        setBooks(data);
        setLoading(false);
      }
    };
    fetchHeavilyDiscussedBooks();
  }, []);

  return (
    <div className="heavily-discussed-container">
      {loading ? (
        <div className="loading-circle">
          <FaSpinner className="spinner" />
        </div>
      ) : (
        books &&
        books.map((book) => (
          <div key={book.id} className="heavily-discussed-books-container">
            <NavLink className="heavily-discussed-cover-art" to={`/books/${book.id}`}>
              <img className="book-cover-art" src={book.cover_art}/>
            </NavLink>
            <NavLink className="heavily-discussed-book-title" to={`/books/${book.id}`}>
              {book.title}
              <div className="tag-container" >
                {book.tags.map((tag)=> (<div key={tag.id} className="tag">{tag.tag_name}</div>))}
              </div>
              <div className="heavily-discussed-comment-count">
                Comments: {book.comment_count}
              </div>
            </NavLink>
          </div>
        ))
      )}
    </div>
  );
}

export default HeavilyDiscussedBooks;
