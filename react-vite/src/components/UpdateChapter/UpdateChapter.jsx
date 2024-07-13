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
  }, [bookId,chapterId]);

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
    <div>
      <div>
        <h2>Edit Chapter</h2>
        <form onSubmit={handleEditChapterSubmit}>
          <div>
            <label>Chapter Title</label>
            <input
              type="text"
              value={editChapterTitle}
              onChange={(e) => setEditChapterTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Chapter Content</label>
            <textarea
              value={editChapterContent}
              onChange={(e) => setEditChapterContent(e.target.value)}
            />
          </div>
          <button type="submit">Update Chapter</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateChapter;
