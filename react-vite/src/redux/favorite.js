const GET_MY_FAVORITES = "favorites/allFavorites";
const POST_FAVORITE = "favorites/postFavorite";
const DELETE_FAVORITE = "favorites/deleteFavorite";

const myFavorites = (favorites) => ({
  type: GET_MY_FAVORITES,
  payload: favorites,
});

const postFavorite = (bookId) => ({
  type: POST_FAVORITE,
  payload: bookId,
});

const deleteFavorite = (bookId) => ({
  type: DELETE_FAVORITE,
  payload: bookId,
});

export const myFavoritesThunk = () => async (dispatch) => {
  const res = await fetch("/api/favorites/my_favorites");

  if (res.ok) {
    const data = await res.json();
    dispatch(myFavorites(data.Favorites));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const postFavoriteThunk = (bookId) => async (dispatch) => {
  const res = await fetch(`/api/favorites/${bookId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookId),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(postFavorite(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const deleteFavoriteThunk = (bookId) => async (dispatch) => {
  const res = await fetch(`/api/favorites/${bookId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    dispatch(deleteFavorite(bookId));
    return { message: "Successfully deleted" };
  } else {
    const errors = await res.json();
    return errors;
  }
};

const initialState = {
  bookIds: [],
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_FAVORITES:
      return {
        ...state,
        bookIds: action.payload.map((favorite) => favorite.book_id),
      };

    case POST_FAVORITE:
      return {
        ...state,
        bookIds: [...state.bookIds, action.payload.book_id],
      };

    case DELETE_FAVORITE:
      return {
        ...state,
        bookIds: state.bookIds.filter((id) => id !== action.payload),
      };

    default:
      return state;
  }
};

export default favoritesReducer;
