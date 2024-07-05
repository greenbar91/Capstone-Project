import { useEffect, useState } from "react";
import "./HeavilyDiscussedBooks.css";
import { NavLink } from "react-router-dom";

function HeavilyDiscussedBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchHeavilyDiscussedBooks = async () => {
      const res = await fetch("/api/books/heavily_discussed");

      if (res.ok) {
        const data = await res.json();
        setBooks(data);
      }
    };
    fetchHeavilyDiscussedBooks();
  }, []);

  return (
    <div className="heavily-discussed-container">
      {books &&
        books.map((book) => (
          <div key={book.id} className="heavily-discussed-books-container">
            <NavLink className="heavily-discussed-cover-art" to={`/books/${book.id}`}>
              <img src={book.cover_art}/>
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
        ))}
    </div>
  );
}

export default HeavilyDiscussedBooks;
