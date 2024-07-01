import { useEffect, useState } from "react";
import "./RecommendedBooks.css";
import { csrfFetch } from "../../redux/csrf";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function RecommendedBooks() {
  const [books, setBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      const res = await csrfFetch("/api/books/my_recommended");

      if (res.ok) {
        const data = await res.json();
        setBooks(data.Books);
      }
    };

    fetchRecommendedBooks();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 5, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 5, books.length - 5));
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", backgroundColor:"aliceblue" }}>Recommended Books</h2>
      <div className="recommended-books">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="io-arrows"
        >
          <IoIosArrowBack className="io-arrows-button" />
        </button>
        <div className="books-container">
          {books.slice(currentIndex, currentIndex + 5).map((book) => (
            <div className="book" key={book.id}>
              <NavLink to={`/books/${book.id}`}>
                <img src={book.cover_art} alt={book.title} />
              </NavLink>
              <h3 className="recommended-books-title-text">{book.title}</h3>
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={currentIndex >= books.length - 5}
          className="io-arrows"
        >
          <IoIosArrowForward className="io-arrows-button" />
        </button>
      </div>
    </div>
  );
}

export default RecommendedBooks;
