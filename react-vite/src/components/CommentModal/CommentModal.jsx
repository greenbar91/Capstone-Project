import { useEffect, useState } from "react";
import "./CommentModal.css";
import {
  getChapterCommentsThunk,
  updateCommentThunk,
} from "../../redux/comment";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";

function CommentModal({ comment }) {
  const { id, chapter_id, body } = comment;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChapterCommentsThunk(chapter_id));
  }, [chapter_id, dispatch]);

  const [editBody, setEditBody] = useState(body);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const updatedCommentData = { body: editBody.trim() };
      dispatch(updateCommentThunk(chapter_id, id, updatedCommentData));
      closeModal();
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const trimmedBody = editBody.trim();
    if (!trimmedBody) newErrors.body = "Comment body is required.";
    if (trimmedBody.length > 2000) newErrors.body = "Comments can't be longer than 2000 characters.";
    return newErrors;
  };

  return (
    <div className="comment-modal">
      <h2>Edit Comment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            />
            {errors.body && <p className="edit-comment-error-message">{errors.body}</p>}
        </div>
        <button type="submit" >Update comment</button>
      </form>
    </div>
  );
}

export default CommentModal;
