import { csrfFetch } from "./csrf";
import { createSelector } from 'reselect';

const GET_ALL_BOOKS = "book/getAllBooks";
const POST_BOOK = "book/postBook";
const UPDATE_BOOK = "book/updateBook";
const DELETE_BOOK = "book/deleteBook";

const getAllBooks = (books) => ({
  type: GET_ALL_BOOKS,
  payload: books,
});

const postBook = (book) => ({
  type: POST_BOOK,
  payload: book,
});

const updateBook = (book) => ({
  type: UPDATE_BOOK,
  payload: book,
});

const deleteBook = (bookId) => ({
  type: DELETE_BOOK,
  payload: bookId,
});

export const getAllBooksThunk = () => async (dispatch) => {
  const res = await fetch("/api/books/");

  if (res.ok) {
    const data = await res.json();
    dispatch(getAllBooks(data.Books));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const postBookThunk = (bookData) => async (dispatch) => {
  const res = await csrfFetch("/api/books/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(postBook(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const putBookThunk = (bookId, bookData) => async (dispatch) => {
  const res = await csrfFetch(`/api/books/${bookId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(updateBook(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const deleteBookThunk = (bookId) => async (dispatch) => {
  const res = await csrfFetch(`/api/books/${bookId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteBook(bookId));
    return { message: "Successfully deleted" };
  } else {
    const errors = await res.json();
    return errors;
  }
};

const initialState = {
  byBookId: {},
  allBooks: [],
};

function bookReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_BOOKS: {
      const byBookId = { ...state.byBookId };
      const allBooks = new Set(state.allBooks);

      action.payload.forEach((book) => {
        byBookId[book.id] = book;
        allBooks.add(book.id);
      });

      return {
        ...state,
        byBookId,
        allBooks: Array.from(allBooks),
      };
    }
    case POST_BOOK: {
      const book = action.payload;
      return {
        ...state,
        byBookId: { ...state.byBookId, [book.id]: book },
        allBooks: [...new Set([...state.allBooks, book.id])],
      };
    }
    case UPDATE_BOOK: {
      const book = action.payload;
      return {
        ...state,
        byBookId: { ...state.byBookId, [book.id]: book },
      };
    }
    case DELETE_BOOK: {
      const bookId = action.payload;
      // eslint-disable-next-line no-unused-vars
      const { [bookId]: _, ...newByBookId } = state.byBookId;
      return {
        ...state,
        byBookId: newByBookId,
        allBooks: state.allBooks.filter((id) => id !== bookId),
      };
    }
    default:
      return state;
  }
}

export default bookReducer;



const selectBooksState = (state) => state.books;

export const selectAllBooks = createSelector(
  [selectBooksState],
  (booksState) => booksState.allBooks.map(id => booksState.byBookId[id])
);
