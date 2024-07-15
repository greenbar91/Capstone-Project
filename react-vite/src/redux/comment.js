import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";

const GET_CHAPTER_COMMENTS = "comments/getChapterComments";
const POST_COMMENT = "comments/postComment";
const UPDATE_COMMENT = "comments/updateComment";
const DELETE_COMMENT = "comments/deleteComment";
const CLEAR_COMMENTS = "comments/clearComments";

const getChapterComments = (comments) => ({
  type: GET_CHAPTER_COMMENTS,
  payload: comments,
});

const postComment = (comment) => ({
  type: POST_COMMENT,
  payload: comment,
});

const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  payload: comment,
});

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId,
});

const clearComments = () => ({
  type: CLEAR_COMMENTS,
});

export const getChapterCommentsThunk = (chapterId) => async (dispatch) => {
  dispatch(clearComments());
  const res = await fetch(`/api/chapters/${chapterId}/comments`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getChapterComments(data.Comments));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const postCommentThunk =
  (chapterId, commentData) => async (dispatch) => {
    const res = await csrfFetch(`/api/chapters/${chapterId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(postComment(data));
      return data;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

export const updateCommentThunk =
  (chapterId, commentId, commentData) => async (dispatch) => {
    const res = await csrfFetch(`/api/chapters/${chapterId}/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(updateComment(data));
      return data;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

export const deleteCommentThunk =
  ({chapterId, commentId}) => async (dispatch) => {
    const res = await csrfFetch(
      `/api/chapters/${chapterId}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res)

    if (res.ok) {
      dispatch(deleteComment(commentId));
      return { message: "Successfully deleted" };
    } else {
      const errors = await res.json();
      return errors;
    }
  };

const initialState = {
  byCommentId: {},
  allComments: [],
};

function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHAPTER_COMMENTS: {
      const byCommentId = { ...state.byCommentId };
      const allComments = [...state.allComments];

      action.payload.forEach((comment) => {
        byCommentId[comment.id] = comment;
        if (!allComments.includes(comment.id)) {
          allComments.push(comment.id);
        }
      });

      return {
        ...state,
        byCommentId,
        allComments,
      };
    }
    case POST_COMMENT: {
      const comment = action.payload;
      return {
        ...state,
        byCommentId: { ...state.byCommentId, [comment.id]: comment },
        allComments: state.allComments.includes(comment.id)
          ? state.allComments
          : [...state.allComments, comment.id],
      };
    }
    case UPDATE_COMMENT: {
      const comment = action.payload;
      return {
        ...state,
        byCommentId: { ...state.byCommentId, [comment.id]: comment },
      };
    }
    case DELETE_COMMENT: {
      const commentId = action.payload;
      // eslint-disable-next-line no-unused-vars
      const { [commentId]: _, ...newByCommentId } = state.byCommentId;
      const allComments = state.allComments.filter((id) => id !== commentId);
      return {
        ...state,
        byCommentId: newByCommentId,
        allComments,
      };
    }
    case CLEAR_COMMENTS:
      return initialState;
    default:
      return state;
  }
}

export default commentsReducer;

const selectCommentsState = (state) => state.comments;

export const selectAllComments = createSelector(
  [selectCommentsState],
  (commentsState) =>
    commentsState.allComments.map((id) => commentsState.byCommentId[id])
);
