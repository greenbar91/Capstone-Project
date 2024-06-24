import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllChaptersThunk, selectAllChapters } from "../../redux/chapter";

const BookDetails = () => {
  const [book, setBook] = useState({});
  const [visibleChapters, setVisibleChapters] = useState({});
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

  const toggleChapterVisibility = (chapterId) => {
    setVisibleChapters((prevState) => ({
      ...prevState,
      [chapterId]: !prevState[chapterId],
    }));
  };

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
      <h2>Chapters</h2>
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <div onClick={() => toggleChapterVisibility(chapter.id)} style={{ cursor: 'pointer', color: 'blue' }}>
              {chapter.title}
            </div>
            {visibleChapters[chapter.id] && <div>{chapter.body}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookDetails;
