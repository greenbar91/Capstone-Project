import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";

const GET_ALL_REVIEWS = "reviews/getAllReviews";
const POST_REVIEW = "reviews/postReview";
const UPDATE_REVIEW = "reviews/updateReview";
const DELETE_REVIEW = "reviews/deleteReview";
const CLEAR_REVIEWS = "reviews/clearReviews";

const getAllReviews = (reviews) => ({
  type: GET_ALL_REVIEWS,
  payload: reviews,
});

const postReview = (review) => ({
  type: POST_REVIEW,
  payload: review,
});

const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  payload: review,
});

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  payload: reviewId,
});

const clearReviews = () => ({
  type: CLEAR_REVIEWS,
});

export const getAllReviewsThunk = (bookId) => async (dispatch) => {
  dispatch(clearReviews());
  const res = await fetch(`/api/books/${bookId}/reviews`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getAllReviews(data.Reviews));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const postReviewThunk = (bookId, reviewData) => async (dispatch) => {
  const res = await csrfFetch(`/api/books/${bookId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(postReview(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const updateReviewThunk =
  (bookId, reviewId, reviewData) => async (dispatch) => {
    const res = await csrfFetch(`/api/books/${bookId}/reviews/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(updateReview(data));
      return data;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

export const deleteReviewThunk = (bookId, reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/books/${bookId}/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    dispatch(deleteReview(reviewId));
    return { message: "Successfully deleted" };
  } else {
    const errors = await res.json();
    return errors;
  }
};

const initialState = {
  byReviewId: {},
  allReviews: [],
};

function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_REVIEWS: {
      const byReviewId = { ...state.byReviewId };
      const allReviews = [...state.allReviews];

      action.payload.forEach((review) => {
        byReviewId[review.id] = review;
        if (!allReviews.includes(review.id)) {
          allReviews.push(review.id);
        }
      });

      return {
        ...state,
        byReviewId,
        allReviews,
      };
    }
    case POST_REVIEW: {
      const review = action.payload;
      return {
        ...state,
        byReviewId: { ...state.byReviewId, [review.id]: review },
        allReviews: state.allReviews.includes(review.id)
          ? state.allReviews
          : [...state.allReviews, review.id],
      };
    }
    case UPDATE_REVIEW: {
      const review = action.payload;
      return {
        ...state,
        byReviewId: { ...state.byReviewId, [review.id]: review },
      };
    }
    case DELETE_REVIEW: {
      const reviewId = action.payload;
      // eslint-disable-next-line no-unused-vars
      const { [reviewId]: _, ...newByReviewId } = state.byReviewId;
      const allReviews = state.allReviews.filter((id) => id !== reviewId);
      return {
        ...state,
        byReviewId: newByReviewId,
        allReviews,
      };
    }
    case CLEAR_REVIEWS:
      return initialState;
    default:
      return state;
  }
}

export default reviewsReducer;

const selectReviewsState = (state) => state.reviews;

export const selectAllReviews = createSelector(
  [selectReviewsState],
  (reviewsState) =>
    reviewsState.allReviews.map((id) => reviewsState.byReviewId[id])
);
