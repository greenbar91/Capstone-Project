import "./ChapterDetails.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Comments from "../Comments";
import { useSelector } from "react-redux";
import { selectAllReviews } from "../../redux/review";
import StarRating from "../StarRating/StarRating";

function ChapterDetails() {
  const [chapterObject, setChapterObject] = useState({});
  const [chapters, setChapters] = useState([]);
  const { bookId, chapterId } = useParams();
  const reviews = useSelector(selectAllReviews);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapterDetails = async () => {
      const res = await fetch(`/api/books/${bookId}/chapters/${chapterId}`);

      if (res.ok) {
        const data = await res.json();
        setChapterObject(data);
      }
    };

    const fetchChapters = async () => {
      const res = await fetch(`/api/books/${bookId}/chapters`);

      if (res.ok) {
        const data = await res.json();
        setChapters(data.Chapters);
      }
    };

    fetchChapterDetails();
    fetchChapters();
  }, [bookId, chapterId]);

  const convertNewlinesToBr = (text) => {
    return text.replace(/\n/g, "<br>");
  };

  const currentChapterIndex = chapters.findIndex(
    (chapter) => chapter.id === parseInt(chapterId)
  );
  const previousChapterId =
    currentChapterIndex > 0 ? chapters[currentChapterIndex - 1]?.id : null;
  const nextChapterId =
    currentChapterIndex < chapters.length - 1
      ? chapters[currentChapterIndex + 1]?.id
      : null;

  const handlePreviousClick = () => {
    if (previousChapterId) {
      navigate(`/books/${bookId}/chapters/${previousChapterId}`);
    }
  };

  const handleNextClick = () => {
    if (nextChapterId) {
      navigate(`/books/${bookId}/chapters/${nextChapterId}`);
    }
  };

  const handleBackToIndexClick = () => {
    navigate(`/books/${bookId}`);
  };

  const getAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce(
      (acc, review) => acc + review.star_rating,
      0
    );
    return totalRating / reviews.length;
  };

  const averageRating = getAverageRating();

  return (
    <div className="chapter-details-container">
      <div className="chapter-header-container">
        <div className="book-cover-art-container">
          <img src={chapterObject.cover_art} />
          <StarRating rating={averageRating} />
        </div>
        <header className="book-and-chapter-header-info">
          <h3 style={{ padding: "5px" }}>{chapterObject.book_title}</h3>
          <h4 style={{ padding: "5px" }}>by {chapterObject.author_name}</h4>
          <h2 style={{ padding: "5px" }}> {chapterObject.title}</h2>
        </header>
        <div className="donate-and-back-to-book-details">
          <button className="index-button" onClick={handleBackToIndexClick}>
            Back to Index
          </button>
          {/* <button className="donate-button">Donate</button> */}
        </div>
      </div>

      {chapterObject.body && (
        <div className="chapter-body-container">
          <div
            dangerouslySetInnerHTML={{
              __html: convertNewlinesToBr(chapterObject?.body),
            }}
          />
        </div>
      )}

      <div className="chapter-navigation-container">
        <button className="prev-button" onClick={handlePreviousClick} disabled={!previousChapterId}>
          Previous
        </button>
        <button className="back-to-index-button" onClick={handleBackToIndexClick}>Back to Index</button>
        <button className="next-button" onClick={handleNextClick} disabled={!nextChapterId}>
          Next
        </button>
      </div>
      <div>
        <Comments chapterId={chapterObject.id} />
      </div>
    </div>
  );
}

export default ChapterDetails;
