import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllChaptersThunk, selectAllChapters } from "../../redux/chapter";
import BookReviews from "../BookReviews/BookReviews";
import FavoriteButton from "../FavoriteButton/FavoriteButton";


const BookDetails = () => {
  const [book, setBook] = useState({});
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const chapters = useSelector(selectAllChapters);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`/api/books/${bookId}`);
      if (res.ok) {
        const data = await res.json();
        setBook(data.Book);
      }
    };
    fetchBook();
  }, [bookId]);

  useEffect(() => {
    dispatch(getAllChaptersThunk(bookId));
  }, [bookId, dispatch]);


  return (
    <div>
      <h1>Book Details</h1>
      {book && (
        <div>
          <h2>{book.title}</h2>
          <p>{book.author_name}</p>
          <p>{book.blurb}</p>
          <img src={book.cover_art} alt={book.title} />
        </div>
      )}
      <FavoriteButton book={book}/>
      <h2>Chapters</h2>
      <ul>
        {chapters.map((chapter) => (
          <NavLink to={`/books/${bookId}/chapters/${chapter.id}`} key={chapter.id}>
            {chapter.title}<br></br>
          </NavLink>
        ))}
      </ul>
      <h2>Reviews</h2>
      <BookReviews bookId={bookId}/>
    </div>
  );
};

export default BookDetails;
