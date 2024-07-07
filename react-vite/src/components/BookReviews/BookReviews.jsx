import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReviewThunk,
  getAllReviewsThunk,
  selectAllReviews,
} from "../../redux/review";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReviewModal from "../ReviewModal.jsx";
import "./BookReviews.css";
import { formatDistanceToNow } from "date-fns";
import StarRating from "../StarRating/StarRating.jsx";

function BookReviews({ bookId }) {
  const dispatch = useDispatch();
  const reviews = useSelector(selectAllReviews);
  const user = useSelector((state) => state.session.user);

  const userHasReviewed = reviews.some((review) => review.user_id === user.id);

  useEffect(() => {
    dispatch(getAllReviewsThunk(bookId));
  }, [bookId, dispatch]);

  const handleDeleteReviewClick = (reviewId) => {
    dispatch(deleteReviewThunk(bookId, reviewId));
  };

  const getTimeAgo = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  };

  return (
    <div className="reviews">
      {!userHasReviewed && (
        <div style={{ display: "flex", justifyContent: "start" }}>
          <div
            className="review-button"
            style={{
              backgroundColor: "white",
              width: "15%",
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
              padding: "20px",
              paddingBottom: "20px",
              marginBottom: "10px",
            }}
          >
            {!userHasReviewed && (
              <OpenModalButton
                buttonText={"Leave a Review"}
                modalComponent={<ReviewModal type="Create" bookId={bookId} />}
              />
            )}
          </div>
        </div>
      )}
      <h5
        style={{
          backgroundColor: "white",
          color: "red",
          fontWeight: "bold",
          padding: "20px",
          borderBottom: "1px solid #E5E5E5",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        REVIEWS
        <div style={{ color: "black" }}>{reviews.length} Reviews</div>
      </h5>
      {reviews.map((review) => (
        <div className="reviews-container" key={review.id}>
          <div className="review-user">
            {review.profile_pic}
            <div>
              <StarRating rating={review.star_rating} />
            </div>
          </div>
          <div className="review-body">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "20px",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <h5
                  style={{
                    color: "red",
                    paddingRight: "10px",
                  }}
                >
                  BY
                </h5>
                <div style={{ fontSize: "13px" }}>{review.username}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  fontStyle: "italic",
                  fontSize: "12px",
                }}
              >
                {getTimeAgo(review.created_at)}
              </div>
            </div>
            <div>{review.body}</div>
            {user.id === review.user_id && (
              <div style={{ padding: "20px" }}>
                <OpenModalButton
                  buttonText={"Edit"}
                  modalComponent={
                    <ReviewModal type="Edit" review={review} bookId={bookId} />
                  }
                />
                <button onClick={() => handleDeleteReviewClick(review.id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookReviews;
