import NewComment from "./NewComment.jsx";
import Comment from "./Comment.jsx";

export default function Comments({comments,currentUser, postId}) {
    const renderComments = () => (
        comments.reverse().map(comment => (
            <Comment commentData={comment} currentUser={currentUser} postId={postId} />
        ))
    )

    return (
        <>
            <NewComment postId={postId} comments={comments} currentUser={currentUser} />
            {renderComments()}
        </>
    )
}