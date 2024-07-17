import { useDispatch, useSelector } from "react-redux";
import "./AllBooksPage.css";
import { useNavigate } from "react-router-dom";
import { getAllBooksThunk, selectAllBooks } from "../../redux/book";
import { useEffect } from "react";
import StarRating from "../StarRating/StarRating";

function AllBooksPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const books = useSelector(selectAllBooks);

  useEffect(() => {
    dispatch(getAllBooksThunk());
  }, [dispatch]);

  const handleDetailsClick = (bookId) => {
    navigate(`/books/${bookId}`);
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
    <div className="allbooks-container">
      <h1 className="allbooks-header">All books</h1>
      <div className="books-grid-container">
        {books.map((book) => {
           const averageRating = getAverageRating(book.reviews);
          return (

          <div title={book.title} key={book.id} className="book-item" onClick={() => handleDetailsClick(book.id)}>
            <div className="book-details" >
              <div style={{fontSize:"14px"}}>{book.title}</div>
              <div>by</div>
              <div>{book.author_name}</div>
            </div>
            <div className="book-cover">
              <img className="book-cover-art" src={book.cover_art} alt={`${book.title} cover`} />
            </div>
            <div
              className="tag-container"
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "10px",
              }}
            >
              {book.tags &&
                book.tags.map((tag) => (
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
          </div>
        )})}
      </div>
    </div>
  );
}

export default AllBooksPage;
