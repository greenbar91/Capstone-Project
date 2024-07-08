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
import { formatDistanceToNow } from "date-fns";

function Comments({ chapterId }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const comments = useSelector(selectAllComments);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getChapterCommentsThunk(chapterId));
  }, [chapterId, dispatch]);

  const handleDeleteCommentClick = (commentId) => {
    dispatch(deleteCommentThunk(chapterId, commentId));
  };

  const handleOnSubmitComment = (e) => {
    e.preventDefault();
    const newComment = {
      user_id: user.id,
      chapter_id: chapterId,
      body: body,
      created_at: new Date(),
    };
    dispatch(postCommentThunk(chapterId, newComment));
    setBody("");
  };

  const getTimeAgo = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  };

  return (
    <div className="comments-container">
      <div className="post-comment-container">
        <form onSubmit={handleOnSubmitComment}>
          <div>
            <label style={{ color: "gray" }}>Comments({comments.length})</label>
          </div>
          <div className="comment-text-area-container">
            <textarea
              value={body}
              type="text"
              onChange={(e) => setBody(e.target.value)}
              className="comment-text-area"
            />
          </div>
          <div className="post-comment-button-container">
            <button
              disabled={body.length === 0}
              className="post-comment-button"
              type="submit"
            >
              Post
            </button>
          </div>
        </form>
      </div>
      <div className="comments">
        {comments &&
          comments.map((comment) => (
            <div className="comment-container" key={comment.id}>
              <div className="comment-user">
                <div>{comment.profile_pic}</div>
                <div style={{fontSize:"13px", marginTop:"10px", color:"#456e96", fontWeight:"bold"}}>{comment.username}</div>
              </div>
              <div className="comment-body">
                <div>
                  {comment.body}</div>
                  <div style={{display:"flex", justifyContent:"end", alignItems:"end", marginTop:"50px", fontStyle:"italic", color:"gray"}}>
                    {getTimeAgo(comment.created_at)}
                  </div>
              {comment.user_id == user.id && (
                <div className="edit-delete-button-container">
                  <OpenModalButton
                    buttonText={"Edit"}
                    modalComponent={<CommentModal comment={comment} />}
                  />
                  <button className="delete-comment-button" onClick={() => handleDeleteCommentClick(comment.id)}>
                    Delete
                  </button>
                </div>
              )}
                  </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Comments;
