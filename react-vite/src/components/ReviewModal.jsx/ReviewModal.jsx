import { useState } from "react";
import { useDispatch } from "react-redux";
import { postReviewThunk, updateReviewThunk } from "../../redux/review";
import { useModal } from "../../context/Modal";
import "./ReviewModal.css";
import ReviewStars from "../ReviewStars/ReviewStars";

function ReviewModal({ type, review, bookId }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState(review ? review.body : "");
  const [starRating, setStarRating] = useState(review ? review.star_rating : 1);
  const [hoverRating, setHoverRating] = useState(0);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      body,
      star_rating: starRating,
    };

    if (type === "Create") {
      await dispatch(postReviewThunk(bookId, reviewData));
      closeModal();
    } else if (type === "Edit") {
      await dispatch(updateReviewThunk(bookId, review.id, reviewData));
      closeModal();
    }
  };

  const handleStarClick = (rating) => {
    setStarRating(rating);
  };

  const handleStarMouseEnter = (rating) => {
    setHoverRating(rating);
  };

  const handleStarMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="review-modal-container">
      <h2
        style={{ color: "white", backgroundColor: "#2a3642", padding: "10px" }}
      >
        {type === "Create" ? "Leave a Review" : "Edit Review"}
      </h2>
      <form className="review-modal" onSubmit={handleSubmit}>
        <div>
          <textarea
            className="review-text-area"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            placeholder="Leave your review here..."
          />
        </div>
        <div>
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            Leave your rating
          </h3>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((rating) => (
              <ReviewStars
                key={rating}
                filled={hoverRating >= rating || starRating >= rating}
                onClick={() => handleStarClick(rating)}
                onMouseEnter={() => handleStarMouseEnter(rating)}
                onMouseLeave={handleStarMouseLeave}
              />
            ))}
          </div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", padding: "10px" }}
        >
          <button className="leave-review-button" disabled={!body.trim().length} type="submit">
            {type === "Create" ? "Submit Review" : "Update Review"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewModal;
