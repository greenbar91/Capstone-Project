import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";

const GET_ALL_CHAPTERS = "book/getAllChapters";
const POST_CHAPTER = "book/postChapter";
const UPDATE_CHAPTER = "book/updateChapter";
const DELETE_CHAPTER = "book/deleteChapter";
const CLEAR_CHAPTERS = "book/clearChapters";

const getAllChapters = (chapters) => ({
  type: GET_ALL_CHAPTERS,
  payload: chapters,
});

const postChapter = (chapter) => ({
  type: POST_CHAPTER,
  payload: chapter,
});

const updateChapter = (chapter) => ({
  type: UPDATE_CHAPTER,
  payload: chapter,
});

const deleteChapter = (chapterId) => ({
  type: DELETE_CHAPTER,
  payload: chapterId,
});

const clearChapters = () => ({
  type: CLEAR_CHAPTERS,
});

export const getAllChaptersThunk = (bookId) => async (dispatch) => {
  dispatch(clearChapters());
  const res = await fetch(`/api/books/${bookId}/chapters`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getAllChapters(data.Chapters));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const postChapterThunk = (bookId, chapterData) => async (dispatch) => {
  const res = await csrfFetch(`/api/books/${bookId}/chapters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chapterData),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(postChapter(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const updateChapterThunk =
  (bookId, chapterId, chapterData) => async (dispatch) => {
    const res = await csrfFetch(`/api/books/${bookId}/chapters/${chapterId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chapterData),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(updateChapter(data));
      return data;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

export const deleteChapterThunk = ({bookId, chapterId}) => async (dispatch) => {
  const res = await csrfFetch(`/api/books/${bookId}/chapters/${chapterId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    dispatch(deleteChapter(chapterId));
    return { message: "Successfully deleted" };
  } else {
    const errors = await res.json();
    return errors;
  }
};

const initialState = {
  byChapterId: {},
  allChapters: [],
};

function chapterReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CHAPTERS: {
      const byChapterId = { ...state.byChapterId };
      const allChapters = [...state.allChapters];

      action.payload.forEach((chapter) => {
        byChapterId[chapter.id] = chapter;
        if (!allChapters.includes(chapter.id)) {
          allChapters.push(chapter.id);
        }
      });

      return {
        ...state,
        byChapterId,
        allChapters,
      };
    }
    case POST_CHAPTER: {
      const chapter = action.payload;
      return {
        ...state,
        byChapterId: { ...state.byChapterId, [chapter.id]: chapter },
        allChapters: state.allChapters.includes(chapter.id) ? state.allChapters : [...state.allChapters, chapter.id],
      };
    }
    case UPDATE_CHAPTER: {
      const chapter = action.payload;
      return {
        ...state,
        byChapterId: { ...state.byChapterId, [chapter.id]: chapter },
      };
    }
    case DELETE_CHAPTER: {
      const chapterId = action.payload;
      // eslint-disable-next-line no-unused-vars
      const { [chapterId]: _, ...newByChapterId } = state.byChapterId;
      const allChapters = state.allChapters.filter(id => id !== chapterId);
      return {
        ...state,
        byChapterId: newByChapterId,
        allChapters,
      };
    }
    case CLEAR_CHAPTERS:
      return initialState;
    default:
      return state;
  }
}

export default chapterReducer;

const selectChaptersState = (state) => state.chapters;

export const selectAllChapters = createSelector(
  [selectChaptersState],
  (chaptersState) =>
    chaptersState.allChapters.map((id) => chaptersState.byChapterId[id])
);
