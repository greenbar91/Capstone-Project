import { useState } from "react";
import "./CreateChapter.css";
import { useDispatch } from "react-redux";
import { postChapterThunk } from "../../redux/chapter";
import { useNavigate, useParams } from "react-router-dom";

function CreateChapter() {
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { bookId } = useParams();

  const handleChapterSubmit = (e) => {
    e.preventDefault();

    const newChapter = { title: chapterTitle, body: chapterContent };
    dispatch(postChapterThunk(bookId, newChapter));
    navigate(`/books/my_books`)
  };

  return (
    <div>
      <h2>Add a New Chapter</h2>
      <form onSubmit={handleChapterSubmit}>
        <div>
          <label>Chapter Title</label>
          <input
            type="text"
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Chapter Content</label>
          <textarea
            value={chapterContent}
            onChange={(e) => setChapterContent(e.target.value)}
          />
        </div>
        <button type="submit">Add Chapter</button>
      </form>
    </div>
  );
}

export default CreateChapter;
