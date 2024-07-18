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
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal.jsx";
import { selectAllBooks } from "../../redux/book.js";

function BookReviews({ bookId }) {
  const dispatch = useDispatch();
  const reviews = useSelector(selectAllReviews);
  const user = useSelector((state) => state.session.user);
  const books = useSelector(selectAllBooks)
  const selectedBook = books[bookId]


  // const userHasReviewed = reviews.some((review) => review.user_id === user?.id);

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
      {user && !reviews.some((review) => review.user_id === user?.id) && !(selectedBook?.author_id === user?.id) &&  (
        <div style={{ display: "flex", justifyContent: "center" }}>
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
            {user && !reviews.some((review) => review.user_id === user?.id) &&  (
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
            <img src={review.profile_pic} style={{width:"5rem", height:"auto"}} />
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
                <div
                  style={{
                    fontSize: "14px",
                    color: "#456e96",
                    fontWeight: "bold",
                  }}
                >
                  {review.username}
                </div>
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
            <div style={{ fontSize: "14px" }}>{review.body}</div>
            {user && user.id === review.user_id && (
              <div className="review-edit-delete-buttons">
                <div style={{ paddingRight: "10px" }}>
                  <OpenModalButton
                    buttonText={"Edit"}
                    modalComponent={
                      <ReviewModal
                        type="Edit"
                        review={review}
                        bookId={bookId}
                      />
                    }
                  />
                </div>
                <div className="review-delete-button">
                  <OpenModalButton
                    buttonText={"Delete"}
                    modalComponent={
                      <DeleteConfirmModal
                        handleDelete={()=> handleDeleteReviewClick(review.id)}
                      />
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookReviews;
