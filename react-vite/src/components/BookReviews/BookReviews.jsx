import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReviewThunk, getAllReviewsThunk, selectAllReviews } from "../../redux/review";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReviewModal from "../ReviewModal.jsx";

function BookReviews({ bookId }) {
  const dispatch = useDispatch();
  const reviews = useSelector(selectAllReviews);
  const user = useSelector((state) => state.session.user);

  const userHasReviewed = reviews.some((review) => review.user_id === user.id);

  useEffect(() => {
    dispatch(getAllReviewsThunk(bookId));
  }, [bookId, dispatch]);

  const handleDeleteReviewClick = (reviewId) => {
    dispatch(deleteReviewThunk(bookId, reviewId))
  }

  return (
    <div>
      <ul>
        {reviews.map((review) => (
          <div key={review.id}>
            <div>{review.username}</div>
            <div>{review.body}</div>
            <div>{review.star_rating}</div>
            {user.id === review.user_id && (
              <div>
                <OpenModalButton
                  buttonText={"Edit"}
                  modalComponent={
                    <ReviewModal type="Edit" review={review} bookId={bookId} />
                  }
                />
                <button onClick={(()=> handleDeleteReviewClick(review.id))}>Delete</button>
              </div>
            )}
          </div>
        ))}
        {!userHasReviewed && (
          <OpenModalButton
            buttonText={"Leave a Review"}
            modalComponent={<ReviewModal type="Create" bookId={bookId} />}
          />
        )}
      </ul>
    </div>
  );
}

export default BookReviews;
