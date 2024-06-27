import { useDispatch, useSelector } from "react-redux"
import "./Comments.css"
import { deleteCommentThunk, getChapterCommentsThunk, selectAllComments } from "../../redux/comment"
import { useEffect } from "react"



function Comments({chapterId}){
    const dispatch = useDispatch()
    const comments = useSelector(selectAllComments)
    // const user = useSelector((state)=> state.session.user);

    useEffect(()=> {
        dispatch(getChapterCommentsThunk(chapterId))
    },[chapterId, dispatch])

    // const handleDeleteCommentClick = (commentId) => {
    //     dispatch(deleteCommentThunk(chapterId, commentId))
    // }

    return (<div>
        <ul>
            {comments && comments.map((comment) => (
                <div key={comment.id}>
                    <div>{comment.username}</div>
                    <div>{comment.body}</div>
                </div>
            ))}
        </ul>
    </div>)
}

export default Comments
