import { useState } from "react";
import "./CreateChapter.css";
import { useDispatch } from "react-redux";
import { postChapterThunk } from "../../redux/chapter";
import { useNavigate, useParams } from "react-router-dom";

function CreateChapter() {
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookId } = useParams();

  const handleChapterSubmit = (e) => {
    e.preventDefault();

    const newChapter = { title: chapterTitle, body: chapterContent };
    dispatch(postChapterThunk(bookId, newChapter));
    navigate(`/books/my_books`);
  };

  return (
    <div className="create-update-chapter-container">
      <h2 className="create-update-chapter-header">Add a new chapter</h2>
      <form onSubmit={handleChapterSubmit}>
        <div className="create-update-chapter-title-container">
          <h4 className="create-update-chapter-title">Chapter title (255 char limit)</h4>
          <input
            className="create-update-chapter-input"
            type="text"
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
          />
        </div>
        <div className="create-update-chapter-body-container">
          <h3 className="create-update-chapter-title">Chapter content (20,000 char limit)</h3>
          <textarea
            value={chapterContent}
            onChange={(e) => setChapterContent(e.target.value)}
            className="create-update-chapter-textarea"
          />
        </div>
        <div className="create-update-chapter-button-container">
          <button
            disabled={
              !chapterTitle ||
              !chapterContent ||
              chapterTitle.length > 255 ||
              chapterContent.length > 20000
            }
            type="submit"
          >
            Add Chapter
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateChapter;
