import { useEffect, useState } from "react";
import "./UpdateChapter.css";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateChapterThunk } from "../../redux/chapter";

function UpdateChapter() {
  const [editChapterTitle, setEditChapterTitle] = useState("");
  const [editChapterContent, setEditChapterContent] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookId, chapterId } = useParams();

  useEffect(() => {
    const fetchChapterDetails = async () => {
      const res = await fetch(`/api/books/${bookId}/chapters/${chapterId}`);

      if (res.ok) {
        const data = await res.json();
        setEditChapterContent(data.body);
        setEditChapterTitle(data.title);
      } else {
        const errors = await res.json();
        return errors;
      }
    };
    fetchChapterDetails();
  }, [bookId, chapterId]);

  const handleEditChapterSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const updatedChapter = {
        title: editChapterTitle,
        body: editChapterContent,
      };
      dispatch(updateChapterThunk(bookId, chapterId, updatedChapter));
      navigate(`/books/my_books`);
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const trimmedTitle = editChapterTitle.trim();
    const trimmedContent = editChapterContent.trim();
    if (!trimmedTitle) newErrors.title = "Chapter title is required.";
    if (trimmedTitle.length > 255) newErrors.title = "Chapter title must be less than 255 characters.";
    if (!trimmedContent) newErrors.content = "Chapter content is required.";
    if (trimmedContent.length > 20000) newErrors.content = "Chapter content must be less than 20,000 characters.";
    return newErrors;
  };

  return (
    <div className="create-update-chapter-container">
      <h2 className="create-update-chapter-header">Edit Chapter</h2>
      <form onSubmit={handleEditChapterSubmit}>
        <div className="create-update-chapter-title-container">
          <h4 className="create-update-chapter-title">Chapter Title </h4>
          <input
            className="create-update-chapter-input"
            type="text"
            value={editChapterTitle}
            onChange={(e) => setEditChapterTitle(e.target.value)}
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </div>
        <div className="create-update-chapter-body-container">
          <h3>Chapter Content </h3>
          <textarea
            value={editChapterContent}
            onChange={(e) => setEditChapterContent(e.target.value)}
            className="create-update-chapter-textarea"
          />
          {errors.content && <p className="error-message">{errors.content}</p>}
        </div>
        <div className="create-update-chapter-button-container">
          <button type="submit">
            Update Chapter
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateChapter;
