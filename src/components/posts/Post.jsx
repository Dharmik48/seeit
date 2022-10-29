import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import FlashContext from "../../contexts/FlashContext.jsx";
import UserContext from "../../contexts/UserContext.jsx";
// FIREBASE
import {
    arrayRemove, arrayUnion, deleteDoc, doc, getDoc, updateDoc
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../firebase/firebase.js";
// FONTAWESOME
import {
    faHeart as heartOutline,
    faMessage,
    faTrashAlt
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartFilled } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

export default function Post({ data }) {
  const [isLiked, setIsLiked] = useState(false);
  const [postOwner, setPostOwner] = useState({});
  const { flash } = useContext(FlashContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const docRef = doc(db, "posts", data.id);

  useEffect(() => {
    setIsLiked(data.likedBy.includes(user?.uid));
  }, [user]);

  useEffect(() => {
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

  function deletePost() {
    navigate("/");
    const imgId = data.img.split("%2F")[1].split("?")[0];
    deleteDoc(docRef)
      .then(() => deleteObject(ref(storage, `images/${imgId}`)))
      .then(() => {
        return updateDoc(doc(db, `users/${postOwner.uid}`), {
          posts: arrayRemove(`/posts/${docRef.id}`),
        });
      })
      .then(() => {
        flash({
          show: true,
          success: true,
          msg: "Post deleted",
        });
      });
  }

  return (
    <div
      className="bg-[#fff] border border-[#ccc] rounded-lg shadow-lg dark:bg-darkText
		dark:border-gray"
    >
      <div className="p-4 flex flex-col items-start gap-5">
        <Link
          to={`/users/${data.uid}`}
          className="w-full flex items-center gap-2"
        >
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
        </Link>
        <h1 className="dark:text-primary">{data.title}</h1>
        <img src={data.img} className="mx-auto" alt={data.title} />
      </div>
      <div className="flex items-center justify-between px-4 py-2 rounded-lg gap-1 dark:bg-darkText">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon
              icon={isLiked ? heartFilled : heartOutline}
              className={`cursor-pointer transition-colors ${
                isLiked
                  ? "text-brightRed"
                  : "hover:text-lightRed dark:text-primary"
              }`}
              size="lg"
              onClick={likePost}
            />
            <span className="font-primary dark:text-primary">
              {data.likedBy.length}
            </span>
          </div>
          <HashLink smooth to={`/posts/${data.id}#comment`} className="flex items-center gap-1">
            <FontAwesomeIcon
              icon={faMessage}
              className="cursor-pointer dark:text-primary"
            />
            <span className="font-primary dark:text-primary">
              {data.noOfComments || 0}
            </span>
          </HashLink>
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
