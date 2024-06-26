import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import bookReducer from "./book";
import chapterReducer from "./chapter";
import reviewsReducer from "./review";
import commentsReducer from "./comment";
import favoritesReducer from "./favorite";

const rootReducer = combineReducers({
  session: sessionReducer,
  books: bookReducer,
  chapters: chapterReducer,
  reviews:reviewsReducer,
  comments:commentsReducer,
  favorites:favoritesReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
