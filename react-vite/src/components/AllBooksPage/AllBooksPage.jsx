import { useDispatch, useSelector } from "react-redux";
import "./AllBooksPage.css"
import { NavLink, useNavigate } from "react-router-dom";
import { getAllBooksThunk, selectAllBooks } from "../../redux/book";
import { useEffect } from "react";

function AllBooksPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const books = useSelector(selectAllBooks);

    useEffect(() => {
        dispatch(getAllBooksThunk());
      }, [dispatch]);


    const handleDetailsClick = (bookId) => {
      navigate(`/books/${bookId}`);
    };

    useEffect(() => {
      dispatch(getAllBooksThunk());
    }, [dispatch]);

    return (<div>
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
    </div>)
}

export default AllBooksPage
