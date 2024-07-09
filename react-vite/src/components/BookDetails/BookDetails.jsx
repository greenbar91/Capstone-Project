import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getAllChaptersThunk, selectAllChapters } from "../../redux/chapter";
import BookReviews from "../BookReviews/BookReviews";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import "./BookDetails.css";
import { formatDistanceToNow } from "date-fns";
import { FaBook } from "react-icons/fa6";
import { selectAllReviews } from "../../redux/review";
import StarRating from "../StarRating/StarRating";

const BookDetails = () => {
  const [book, setBook] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookId } = useParams();
  const chapters = useSelector(selectAllChapters);
  const reviews = useSelector(selectAllReviews)
  const user = useSelector((state)=> state.session.user)

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

  const getTimeAgo = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  };

  const handleStartReadingClick = () => {
    navigate(`/books/${bookId}/chapters/${book.chapter_ids[0]}`);
  };

  const getAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.star_rating, 0);
    return totalRating / reviews.length;
  };

  const averageRating = getAverageRating();


  return (
    <div className="book-details-container">
      {book && (
        <div className="book-details-book-container">
          <div className="book-details-cover">
            <h2
              style={{
                textAlign: "center",
                paddingBottom: "10px",
                paddingTop: "20px",
                fontSize: "28px",
              }}
            >
              {book.title}
            </h2>
            <h4 style={{ textAlign: "center", paddingBottom: "10px" }}>
              by {book.author_name}
            </h4>
            <div className="book-details-cover-art">
              <img src={book.cover_art} alt={book.title} />
            </div>
          </div>
          <div className="book-details-blurb">
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
            <p style={{ padding: "30px" }}>{book.blurb}</p>
            <div>
              <div style={{display:"flex", justifyContent:"center", marginBottom:"20px", fontSize:"20px",alignItems:"center"}}>
                <StarRating rating={averageRating}/>

              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={handleStartReadingClick}
                  style={{
                    width: "150px",
                    height: "40px",
                    backgroundColor: "#557492",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  <FaBook style={{ paddingRight: "5px" }} />
                  Start Reading
                </button>
              </div>
              <div
                style={{
                  justifyContent: "center",
                  display: "flex",
                  fontSize: "14px",
                  paddingTop: "10px",
                  // paddingRight: "50px",
                }}
              >
                {user && (<FavoriteButton book={book} />)}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="TOC-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            borderBottom: "1px solid #E5E5E5",
            marginRight: "10px",
            marginLeft: "10px",
          }}
        >
          <h5 style={{ color: "red", fontWeight: "bold", padding: "5px" }}>
            TABLE OF CONTENTS
          </h5>
          <h5
            style={{
              backgroundColor: "#bebfba",
              padding: "5px",
              fontSize: "12px",
              color: "white",
            }}
          >
            {chapters.length} Chapters
          </h5>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            // padding: "10px",
            borderBottom: "2px solid #E5E5E5",
          }}
        >
          <h5 style={{ fontWeight: "bold", fontSize: "15px", padding: "10px" }}>
            Chapter Name
          </h5>
          <h5 style={{ fontWeight: "bold", fontSize: "15px", padding: "10px" }}>
            Release Date
          </h5>
        </div>
        <div style={{ paddingBottom: "20px" }}>
          {chapters.map((chapter) => (
            <div key={chapter.id} className="chapters-container">
              <div className="chapter-title">
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={`/books/${bookId}/chapters/${chapter.id}`}
                >
                  {chapter.title}

                  <br></br>
                </NavLink>
              </div>
              <div className="chapter-release-date">
                {getTimeAgo(chapter.created_at)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <BookReviews bookId={bookId} />
    </div>
  );
};

export default BookDetails;
