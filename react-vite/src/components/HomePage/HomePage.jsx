import { useEffect } from "react";
import "./HomePage.css";
import { useDispatch } from "react-redux";
import { getAllBooksThunk } from "../../redux/book";

import NewsFeed from "../NewsFeed";

export default function HomePage() {
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(getAllBooksThunk());
  }, [dispatch]);

  return (
    <div className="home-page-container">
      <div className="newsfeed-grid-container"><NewsFeed/> </div>
      <div className="recommended-books-grid-container"> </div>
      <div className="popular-books-grid-container"> </div>
      <div className="recently-updated-grid-container"> </div>
      <div className="heavily-discussed-grid-container"> </div>

    </div>
  );
}
