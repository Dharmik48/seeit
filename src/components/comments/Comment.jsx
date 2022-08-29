import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext.jsx";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase/firebase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartFilled } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as heartOutline,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import FlashContext from "../../contexts/FlashContext.jsx";
import { deleteObject, ref } from "firebase/storage";

export default function Comment({ commentData, postId }) {
  const [commentBy, setCommentBy] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useContext(UserContext);
  const { flash } = useContext(FlashContext);
  const commentDocRef = doc(db, `posts/${postId}/comments`, commentData.id);

  useEffect(() => {
    getDoc(doc(db, "users", commentData.uid)).then((userData) =>
      setCommentBy(userData.data())
    );
  }, []);

  useEffect(() => {
    setIsLiked(commentData.likedBy?.includes(user?.uid));
  }, [user]);

  useEffect(() => {
    user.uid &&
      updateDoc(commentDocRef, {
        likedBy: isLiked ? arrayUnion(user?.uid) : arrayRemove(user?.uid),
      });
  }, [isLiked]);

  const likeComment = () => {
    if (!user.uid) {
      flash({ msg: "Please Sign in first!", success: false, show: true });
      return;
    }
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  function deleteComment() {
    deleteDoc(commentDocRef).then(() => {
      flash({
        show: true,
        success: true,
        msg: "Comment deleted",
      });
    });
  }

  return (
    <div
      className="grid gap-2.5 bg-primary border border-[#ccc] p-3 rounded-lg shadow-lg
    dark:bg-darkText dark:border-primary dark:text-primary"
    >
      <div id="comment" className="w-full flex items-center gap-2">
        <img
          src={commentBy.photoURL}
          alt={commentBy.displayName || "unknown"}
          onError={(e) => {
            e.target.src = `https://avatars.dicebear.com/api/identicon/${commentBy.uid}.svg`;
          }}
          className="h-6 aspect-square rounded-full"
        />
        <h1 className="w-full text-sm dark:text-primary">
          {commentBy.displayName}
        </h1>
      </div>
      <p>{commentData.text}</p>
      <div className="flex items-center justify-between">
        <div className={"flex items-center gap-1"}>
          <FontAwesomeIcon
            icon={isLiked ? heartFilled : heartOutline}
            className={`cursor-pointer transition-colors dark:text-primary ${
              isLiked ? "text-brightRed" : "hover:text-lightRed"
            }`}
            size="lg"
            onClick={likeComment}
          />
          <span className="font-primary dark:text-primary">
            {commentData.likedBy?.length || 0}
          </span>
        </div>
        {commentData.uid === user?.uid && (
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="cursor-pointer dark:text-primary"
            onClick={() => deleteComment()}
          />
        )}
      </div>
    </div>
  );
}
