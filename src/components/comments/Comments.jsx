import NewComment from "./NewComment.jsx";
import Comment from "./Comment.jsx";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebase.js";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const commentsColRef = collection(db, `posts/${postId}/comments`);

  useEffect(() => {
    onSnapshot(query(commentsColRef, orderBy("time", "desc")), (snapshot) => {
      const comments = snapshot.docs.map((doc) => doc.data());
      setComments(comments);
    });
  }, []);

  const renderComments = () =>
    comments.reverse().map((comment) => <Comment commentData={comment} />);

  return (
    <>
      <NewComment postId={postId} commentsColRef={commentsColRef} />
      {renderComments()}
    </>
  );
}
