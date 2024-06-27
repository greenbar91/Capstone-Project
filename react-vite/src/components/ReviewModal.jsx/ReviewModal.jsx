import { useState } from "react";
import { useDispatch } from "react-redux";
import { postReviewThunk, updateReviewThunk } from "../../redux/review";
import { useModal } from "../../context/Modal";

function ReviewModal({ type, review, bookId }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState(review ? review.body : "");
  const [starRating, setStarRating] = useState(review ? review.star_rating : 1);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      body,
      star_rating: starRating,
    };

    if (type === "Create") {
      await dispatch(postReviewThunk(bookId, reviewData));
        closeModal()
    } else if (type === "Edit") {
      await dispatch(updateReviewThunk(bookId, review.id, reviewData));
      closeModal()
    }
  };

  return (
    <div>
      <h2>{type === "Create" ? "Leave a Review" : "Edit Review"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Review</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Star Rating</label>
          <input
            type="number"
            value={starRating}
            onChange={(e) => setStarRating(e.target.value)}
            min="1"
            max="5"
            required
          />
        </div>
        <button type="submit">{type === "Create" ? "Submit Review" : "Update Review"}</button>
      </form>
    </div>
  );
}

export default ReviewModal;
