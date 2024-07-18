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
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
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
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const trimmedBody = body.trim();
    if (!trimmedBody) newErrors.body = "Review body is required.";
    if (trimmedBody.length > 2000) newErrors.body = "Review body must be less than 2000 characters.";
    return newErrors;
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
      <h2 className="review-modal-header">
        {type === "Create" ? "Leave a Review" : "Edit Review"}
      </h2>
          {errors.body && <p className="review-error-message">{errors.body}</p>}
      <form className="review-modal" onSubmit={handleSubmit}>
        <div className="review-text-area-container">
          <textarea
            className="review-text-area"
            value={body}
            onChange={(e) => setBody(e.target.value)}

            placeholder="Leave your review here..."
          />
        </div>
        <div>
          <h3 className="star-rating-title">Leave your rating</h3>
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
        <div className="review-button-container">
          <button className="leave-review-button"  type="submit">
            {type === "Create" ? "Submit Review" : "Update Review"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewModal;
