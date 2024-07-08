import { useEffect, useRef, useState } from "react";
import "./RecommendedBooks.css";
import { csrfFetch } from "../../redux/csrf";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function RecommendedBooks({ type }) {
  const [books, setBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const slideTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const endpoint = type === "recommended" ? "/api/books/my_recommended" : "/api/books/popular";
      const res = await csrfFetch(endpoint);

      if (res.ok) {
        const data = await res.json();
        setBooks(data.Books);
      }
    };

    fetchBooks();
  }, [type]);

  const handlePrev = () => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 5, 0));
    resetSliding();
  };

  const handleNext = () => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 5, books.length - 5));
    resetSliding();
  };

  const resetSliding = () => {
    if (slideTimeoutRef.current) {
      clearTimeout(slideTimeoutRef.current);
    }
    slideTimeoutRef.current = setTimeout(() => {
      setIsSliding(false);
    }, 500);
  };

  return (
    <div>
      <div className="recommended-books">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="io-arrows"
        >
          <IoIosArrowBack className="io-arrows-button left" />
        </button>
        <div className="books-container">
          <div
            className="books-list"
            style={{ transform: `translateX(-${currentIndex * 20}%)` }}
          >
            {books.map((book) => (
              <div className="book" key={book.id}>
                <NavLink to={`/books/${book.id}`}>
                  <img src={book.cover_art} alt={book.title} />
                </NavLink>
                <h5 style={{cursor:"default"}} className="recommended-books-title-text">{book.title}</h5>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleNext}
          disabled={currentIndex >= books.length - 5}
          className="io-arrows"
        >
          <IoIosArrowForward className="io-arrows-button right" />
        </button>
      </div>
    </div>
  );
}

export default RecommendedBooks;
