import { useEffect, useState } from "react";
import "./AuthorHomePageStats.css";
import { FaBook } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdMenuBook } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectAllBooks } from "../../redux/book";
import { selectAllChapters } from "../../redux/chapter";

function AuthorHomePageStats() {
  const [userBooks, setUserBooks] = useState([]);
  const [userChapters, setUserChapters] = useState([]);
  const books = useSelector(selectAllBooks);
  const chapters = useSelector(selectAllChapters);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserBooks = async () => {
      const res = await fetch("/api/books/my_books");

      if (res.ok) {
        const data = await res.json();
        setUserBooks(data.Books);
      }
    };
    const fetchUserChapters = async () => {
      const res = await fetch("/api/books/my_chapters");

      if (res.ok) {
        const data = await res.json();
        setUserChapters(data.Chapters);
      }
    };
    fetchUserChapters();
    fetchUserBooks();
  }, [dispatch, books, chapters]);

  const totalWordCount = () => {
    let wordCount = 0;

    userChapters?.forEach((chapter) => {
      if (chapter.body) {
        wordCount += chapter.body.split(" ").length;
      }
    });

    return wordCount;
  };

  const totalChapters = () => {
    let chapterCount = 0;

    userBooks?.forEach((book) => {
      if (book.chapter_count) {
        chapterCount += book.chapter_count;
      }
    });

    return chapterCount;
  };

  const totalReviews = () => {
    let reviewCount = 0;

    userBooks?.forEach((book) => {
      if (book.reviews) {
        reviewCount += book.reviews.length;
      }
    });

    return reviewCount;
  };

  const totalFavorites = () => {
    let favoriteCount = 0;

    userBooks?.forEach((book) => {
      if (book.reviews) {
        favoriteCount += book.favorites.length;
      }
    });

    return favoriteCount;
  };

  return (
    <div>
      <div className="author-page-header">
        <h2 style={{padding:"30px"}}>Author Dashboard</h2>
      </div>
      <div className="author-stats-container">
        <div className="author-stats">
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <FaBook style={{ paddingRight: "5px", fontSize: "24px" }} />
            <div style={{ display: "flex", flexDirection: "row" }}>
              Books:{" "}
              <div
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  fontWeight: "normal",
                  paddingLeft: "2px",
                }}
              >
                {userBooks?.length}
              </div>
            </div>
          </div>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <MdMenuBook style={{ paddingRight: "5px", fontSize: "24px" }} />
            <div style={{ display: "flex", flexDirection: "row" }}>
              Total chapters:
              <div
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  fontWeight: "normal",
                  paddingLeft: "2px",
                }}
              >
                {totalChapters()}
              </div>
            </div>
          </div>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <FaPencil style={{ paddingRight: "5px", fontSize: "24px" }} />
            <div style={{ display: "flex", flexDirection: "row" }}>
              Total words:
              <div
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  fontWeight: "normal",
                  paddingLeft: "2px",
                }}
              >
                {totalWordCount()}
              </div>
            </div>
          </div>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <MdRateReview style={{ paddingRight: "5px", fontSize: "24px" }} />
            <div style={{ display: "flex", flexDirection: "row" }}>
              Reviews received:
              <div
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  fontWeight: "normal",
                  paddingLeft: "2px",
                }}
              >
                {totalReviews()}
              </div>
            </div>
          </div>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <MdFavorite style={{ paddingRight: "5px", fontSize: "24px" }} />
            <div style={{ display: "flex", flexDirection: "row" }}>
              Total favorites:
              <div
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  fontWeight: "normal",
                  paddingLeft: "2px",
                }}
              >
                {totalFavorites()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorHomePageStats;
