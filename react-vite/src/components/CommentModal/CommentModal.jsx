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
  console.log(comment)

  useEffect(() => {
    dispatch(getChapterCommentsThunk(chapter_id));
  }, [chapter_id, dispatch]);

  const [editBody, setEditBody] = useState(body);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCommentData = { body: editBody };
    dispatch(updateCommentThunk(chapter_id, id, updatedCommentData));
    closeModal();
  };

  return (
    <div>
      <h2>Edit Comment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Comment</label>
          <textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
        </div>
        <button type="submit">Update comment</button>
      </form>
    </div>
  );
}

export default CommentModal;
