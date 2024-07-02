import { useEffect } from "react";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooksThunk } from "../../redux/book";

import NewsFeed from "../NewsFeed";
import RecommendedBooks from "../RecommendedBooks/RecommendedBooks";

export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.session.user)


  useEffect(() => {
    dispatch(getAllBooksThunk());
  }, [dispatch]);

  return (
    <div className="home-page-container">
      <div className="newsfeed-grid-container"><NewsFeed/> </div>
      {user ? (<div className="recommended-books-grid-container"><h2 style={{ textAlign: "center", backgroundColor: "#E0E2DB" }}>Recommended Books for you</h2><RecommendedBooks type="recommended"/> </div>): <div className="adds-for-lurkers">ADDS PLACEHOLDER</div>}
      <div className="popular-books-grid-container"><h2 style={{ textAlign: "center", backgroundColor: "#E0E2DB" }}>Popular Books</h2><RecommendedBooks type="popular"/> </div>
      <div className="recently-updated-grid-container"> </div>
      <div className="heavily-discussed-grid-container"> </div>

    </div>
  );
}
