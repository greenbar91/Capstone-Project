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
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";

function Comments({ chapterId }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const comments = useSelector(selectAllComments);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getChapterCommentsThunk(chapterId));
    setBody("");
    setErrors({});
  }, [chapterId, dispatch]);

  const handleOnSubmitComment = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const newComment = {
        user_id: user.id,
        chapter_id: chapterId,
        body: body.trim(),
        created_at: new Date(),
      };
      dispatch(postCommentThunk(chapterId, newComment));
      setBody("");
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const trimmedBody = body.trim();
    if (!trimmedBody) newErrors.body = "Comment body is required.";
    if (trimmedBody.length > 2000) newErrors.body = "Comments can't be longer then 2000 characters."
    return newErrors;
  };

  const getTimeAgo = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteCommentThunk(chapterId, commentId));
  };

  return (
    <div className="comments-container">
      {user && (
        <div className="post-comment-container">
          <form onSubmit={handleOnSubmitComment}>
            <div>
              <label style={{ color: "gray" }}>
                Comments({comments.length})
              </label>
            </div>
            <div className="comment-text-area-container">
              <textarea
                value={body}
                type="text"
                onChange={(e) => setBody(e.target.value)}
                className="comment-text-area"
                />
            </div>
                {errors.body && <p className="comment-error-message">{errors.body}</p>}
            <div className="post-comment-button-container">
              <button

                className="post-comment-button"
                type="submit"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="comments">
        {comments &&
          comments.map((comment) => (
            <div className="comment-container" key={comment.id}>
              <div className="comment-user">
                <div>
                  <img src={comment.profile_pic} alt="profile" />
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    marginTop: "10px",
                    color: "#456e96",
                    fontWeight: "bold",
                  }}
                >
                  {comment.username}
                </div>
              </div>
              <div className="comment-body">
                <div>{comment.body}</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "end",
                    marginTop: "50px",
                    fontStyle: "italic",
                    color: "gray",
                  }}
                >
                  {getTimeAgo(comment.created_at)}
                </div>
                {user && comment.user_id === user.id && (
                  <div className="edit-delete-button-container">
                    <OpenModalButton
                      buttonText={"Edit"}
                      modalComponent={<CommentModal comment={comment} />}
                    />
                    <div className="delete-comment-button">
                      <OpenModalButton
                        buttonText={"Delete"}
                        modalComponent={
                          <DeleteConfirmModal
                            handleDelete={() => handleDeleteComment(comment.id)}
                          />
                        }
                      />
                    </div>
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
