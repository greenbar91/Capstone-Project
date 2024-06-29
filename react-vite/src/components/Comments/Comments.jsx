import { useDispatch, useSelector } from "react-redux";
import "./Comments.css";
import {
  deleteCommentThunk,
  getChapterCommentsThunk,
  postCommentThunk,
  selectAllComments,
} from "../../redux/comment";
import { useEffect, useState } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CommentModal from "../CommentModal";

function Comments({ chapterId }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const comments = useSelector(selectAllComments);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getChapterCommentsThunk(chapterId));
  }, [chapterId, dispatch]);

  const handleDeleteCommentClick = (commentId) => {
      dispatch(deleteCommentThunk(chapterId, commentId))
  }

  const handleOnSubmitComment = (e) => {
    e.preventDefault()
    const newComment = {user_id:user.id, chapter_id:chapterId, body:body, created_at:new Date()}
    dispatch(postCommentThunk(chapterId, newComment))
    setBody('')
  };

  return (
    <div>
      <ul>
        <div>
          <form onSubmit={handleOnSubmitComment}>
            <div>
              <label>Leave a comment</label>
            </div>
            <div>
              <textarea
                value={body}
                type="text"
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Post</button>
            </div>
          </form>
        </div>
        {comments &&
          comments.map((comment) => (
            <div key={comment.id}>
              <div>{comment.username}</div>
              <div>{comment.body}</div>
              {comment.user_id == user.id && (
                <div>
                  <OpenModalButton
                    buttonText={"Edit"}
                    modalComponent={<CommentModal comment={comment}/>}
                  />
                  <button onClick={(()=> handleDeleteCommentClick(comment.id))}>Delete</button>
                </div>
              )}
            </div>
          ))}
      </ul>
    </div>
  );
}

export default Comments;
