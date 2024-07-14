import { useEffect, useState } from "react";
import "./UpdateChapter.css";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateChapterThunk } from "../../redux/chapter";

function UpdateChapter() {
  const [editChapterTitle, setEditChapterTitle] = useState("");
  const [editChapterContent, setEditChapterContent] = useState("");
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
    const updatedChapter = {
      title: editChapterTitle,
      body: editChapterContent,
    };
    dispatch(updateChapterThunk(bookId, chapterId, updatedChapter));
    navigate(`/books/my_books`);
  };

  return (
    <div className="create-update-chapter-container">
      <h2 className="create-update-chapter-header">Edit Chapter</h2>
      <form onSubmit={handleEditChapterSubmit}>
        <div className="create-update-chapter-title-container">
          <h4 className="create-update-chapter-title">Chapter Title (255 char limit)</h4>
          <input
            className="create-update-chapter-input"
            type="text"
            value={editChapterTitle}
            onChange={(e) => setEditChapterTitle(e.target.value)}
          />
        </div>
        <div className="create-update-chapter-body-container">
          <h3>Chapter Content (20,000 char limit)</h3>
          <textarea
            value={editChapterContent}
            onChange={(e) => setEditChapterContent(e.target.value)}
            className="create-update-chapter-textarea"
          />
        </div>
        <div className="create-update-chapter-button-container">
          <button
            disabled={
              !editChapterContent ||
              !editChapterTitle ||
              editChapterTitle.length > 255 ||
              editChapterContent.length > 20000
            }
            type="submit"
          >
            Update Chapter
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateChapter;
