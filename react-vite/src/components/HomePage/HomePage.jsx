import { useEffect } from "react";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooksThunk } from "../../redux/book";

import NewsFeed from "../NewsFeed";
import RecommendedBooks from "../RecommendedBooks/RecommendedBooks";
import RecentlyUpdatedBooks from "../RecentlyUpdatedBooks";
import HeavilyDiscussedBooks from "../HeavilyDiscussedBooks";

export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.session.user)


  useEffect(() => {
    dispatch(getAllBooksThunk());
  }, [dispatch]);

  return (
    <div className="home-page-container">
      <div className="newsfeed-grid-container"><NewsFeed/> </div>
      {user ? (<div className="recommended-books-grid-container"><h2 style={{ textAlign: "center", backgroundColor: "#2a3642", color:"white", borderTopLeftRadius:".5rem", borderTopRightRadius:".5rem" }}>Recommended books for you</h2><RecommendedBooks type="recommended"/> </div>): <div className="adds-for-lurkers"></div>}
      <div className="popular-books-grid-container"><h2 style={{ textAlign: "center", backgroundColor: "#2a3642" , color:"white", borderTopLeftRadius:".5rem", borderTopRightRadius:".5rem"}}>Popular books</h2><RecommendedBooks type="popular"/> </div>
      <div className="recently-updated-grid-container"><h2 style={{ textAlign: "center", backgroundColor: "#2a3642" , color:"white", borderTopLeftRadius:".5rem", borderTopRightRadius:".5rem"}}>Recently updated</h2><RecentlyUpdatedBooks/> </div>
      <div className="heavily-discussed-grid-container"><h2 style={{ textAlign: "center", backgroundColor: "#2a3642" , color:"white", borderTopLeftRadius:".5rem", borderTopRightRadius:".5rem"}}>Heavily discussed</h2><HeavilyDiscussedBooks/> </div>

    </div>
  );
}
