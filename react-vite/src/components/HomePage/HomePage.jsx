import { useEffect } from "react";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooksThunk, selectAllBooks } from "../../redux/book";
import { NavLink, useNavigate } from "react-router-dom";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const books = useSelector(selectAllBooks);

  const handleDetailsClick = (bookId) => {
    navigate(`books/${bookId}`);
  };

  useEffect(() => {
    dispatch(getAllBooksThunk());
  }, [dispatch]);

  return (
    <div>
      <h1>Books List</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <div onClick={() => handleDetailsClick(book.id)}>
              <div>
                {book.title} by {book.author_name}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <NavLink to={"/books/my_books"}>Author Home Page</NavLink>
    </div>
  );
}
