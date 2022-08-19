import NewComment from "./NewComment.jsx";
import Comment from "./Comment.jsx";

export default function Comments({ comments, postId }) {
    const renderComments = () =>
        comments.reverse().map((comment) => <Comment commentData={comment} />);

    return (
        <>
            <NewComment
                postId={postId}
                comments={comments}
            />
            {renderComments()}
        </>
    );
}
