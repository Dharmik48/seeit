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
      const comments = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setComments(comments);
    });
  }, []);

  const renderComments = () =>
    comments?.map((comment) => (
      <Comment
        commentData={comment}
        key={comment.id}
        commentsColRef={commentsColRef}
        postId={postId}
      />
    ));

  return (
    <>
      <NewComment commentsColRef={commentsColRef} />
      {renderComments()}
    </>
  );
}
