import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import FlashContext from "../../contexts/FlashContext.jsx";
import {
  addDoc,
  serverTimestamp,
  updateDoc,
  increment,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.js";

export default function NewComment({ commentsColRef, postId }) {
  const [commentText, setCommentText] = useState("");
  const { user: currentUser } = useContext(UserContext);
  const { flash } = useContext(FlashContext);

  const addComment = (e) => {
    e.preventDefault();

    if (!currentUser.uid) {
      flash({ show: true, msg: "Please Sign In First!", success: false });
      return;
    }

    const newComment = {
      uid: currentUser.uid,
      text: commentText,
      time: serverTimestamp(),
      likedBy: [],
    };

    addDoc(commentsColRef, newComment).then(() => {
      setCommentText("");
      updateDoc(doc(db, "/posts", postId), {
        noOfComments: increment(1),
      });
    });
  };

  return (
    <form
      className="grid gap-2.5 bg-primary border border-[#ccc] p-3 rounded-lg shadow-lg
    dark:bg-darkText dark:border-gray dark:text-primary"
    >
      <textarea
        placeholder="Write a comment"
        value={commentText}
        className="w-full bg-primary h-full p-2 lg:p-4 border-2 border-secondary focus:outline-none
                        dark:bg-darkText dark:border-gray dark:text-primary rounded-lg"
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button
        className="border-2 border-secondary py-2 px-6 rounded-full justify-self-end transition-colors hover:bg-secondary dark:hover:bg-gray dark:border-gray"
        onClick={addComment}
      >
        Submit
      </button>
    </form>
  );
}
