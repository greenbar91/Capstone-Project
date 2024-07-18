import { useState } from "react";
import "./CreateChapter.css";
import { useDispatch } from "react-redux";
import { postChapterThunk } from "../../redux/chapter";
import { useNavigate, useParams } from "react-router-dom";

function CreateChapter() {
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookId } = useParams();

  const handleChapterSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const newChapter = { title: chapterTitle, body: chapterContent };
      dispatch(postChapterThunk(bookId, newChapter));
      navigate(`/books/my_books`);
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const trimmedTitle = chapterTitle.trim();
    const trimmedContent = chapterContent.trim();
    if (!trimmedTitle) newErrors.title = "Chapter title is required.";
    if (trimmedTitle.length > 255) newErrors.title = "Chapter title must be less than 255 characters.";
    if (!trimmedContent) newErrors.content = "Chapter content is required.";
    if (trimmedContent.length > 20000) newErrors.content = "Chapter content must be less than 20,000 characters.";
    return newErrors;
  };

  return (
    <div className="create-update-chapter-container">
      <h2 className="create-update-chapter-header">Add a new chapter</h2>
      <form onSubmit={handleChapterSubmit}>
        <div className="create-update-chapter-title-container">
          <h4 className="create-update-chapter-title">Chapter title</h4>
          <input
            className="create-update-chapter-input"
            type="text"
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </div>
        <div className="create-update-chapter-body-container">
          <h3 className="create-update-chapter-title">Chapter content</h3>
          <textarea
            value={chapterContent}
            onChange={(e) => setChapterContent(e.target.value)}
            className="create-update-chapter-textarea"
          />
          {errors.content && <p className="error-message">{errors.content}</p>}
        </div>
        <div className="create-update-chapter-button-container">
          <button type="submit">
            Add Chapter
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateChapter;
