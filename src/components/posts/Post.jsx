import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext.jsx";
// FIREBASE
import {
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.js";
// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as heartOutline,
  faMessage,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartFilled } from "@fortawesome/free-solid-svg-icons";
import FlashContext from "../../contexts/FlashContext.jsx";
import moment from "moment";

export default function Post({ data }) {
  const [isLiked, setIsLiked] = useState(false);
  const [docRef, setDocRef] = useState({});
  const [postOwner, setPostOwner] = useState({});
  const { flash } = useContext(FlashContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setIsLiked(data.likedBy.includes(user?.uid));
  }, [user]);

  useEffect(() => {
    setDocRef(doc(db, "posts", data.id));

    getDoc(doc(db, "users", data.uid)).then((data) =>
      setPostOwner(data.data())
    );
  }, []);

  function likePost() {
    if (!user.uid) {
      flash({ show: true, success: false, msg: "Please Sign In first!" });
      return;
    }

    setIsLiked((prevIsLiked) => !prevIsLiked);

    updateDoc(docRef, {
      likedBy: !isLiked ? arrayUnion(user?.uid) : arrayRemove(user?.uid),
    });
  }

  // TODO: delete the image from firebase storage as well
  function deletePost() {
    deleteDoc(docRef).then(() => {
      flash((prevFlash) => ({
        ...prevFlash,
        show: true,
        success: true,
        msg: "Post deleted",
      }));
    });
  }

  return (
    <div
      className="bg-[#fff] border border-[#ccc] rounded-lg shadow-lg dark:bg-darkText
		dark:border-darkText"
    >
      <div className="p-4 flex flex-col items-start gap-5">
        <div className="w-full flex items-center gap-2">
          <img
            src={postOwner.photoURL}
            alt={postOwner.displayName || "unknown"}
            onError={(e) => {
              e.target.src = `https://avatars.dicebear.com/api/identicon/${data.uid}.svg`;
            }}
            className="h-8 aspect-square rounded-full"
          />
          <h1 className="w-full text-sm dark:text-primary">
            {postOwner.displayName}
          </h1>
          <span className="min-w-max font-primary text-sm dark:text-primary">
            {data.createdAt && moment.unix(data.createdAt.seconds).fromNow()}
          </span>
        </div>
        <h1 className="dark:text-primary">{data.title}</h1>
        <img src={data.img} className="mx-auto" alt={data.title} />
      </div>
      <div className="flex items-center justify-between px-4 py-2 rounded-lg gap-1 dark:bg-darkText">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon
              icon={isLiked ? heartFilled : heartOutline}
              className={`cursor-pointer transition-colors dark:text-primary ${
                isLiked ? "text-brightRed" : "hover:text-lightRed"
              }`}
              size="lg"
              onClick={likePost}
            />
            <span className="font-primary dark:text-primary">
              {data.likedBy.length}
            </span>
          </div>
          <Link to={`/posts/${data.id}`} className="flex items-center gap-1">
            <FontAwesomeIcon
              icon={faMessage}
              className="cursor-pointer dark:text-primary"
            />
            <span className="font-primary dark:text-primary">
              {data.noOfComments || 0}
            </span>
          </Link>
        </div>
        {postOwner.uid === user?.uid && (
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="cursor-pointer dark:text-primary"
            onClick={() => deletePost()}
          />
        )}
      </div>
    </div>
  );
}
