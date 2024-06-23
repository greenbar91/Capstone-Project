import { csrfFetch } from "./csrf";

const GET_ALL_BOOKS = "book/getAllBooks";
const POST_BOOK = "book/postBook";

const getAllBooks = (books) => ({
  type: GET_ALL_BOOKS,
  payload: books,
});

const postBook = (book) => ({
  type: POST_BOOK,
  payload: book,
});

export const getAllBooksThunk = () => async (dispatch) => {
  const res = await fetch("/api/books");

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
      default:
        return state;
    }
  }

export default bookReducer;
