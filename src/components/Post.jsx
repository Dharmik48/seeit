import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// FIREBASE
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart as heartOutline,
    faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartFilled } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "../contexts/ToastContext";
import { useUser } from "../contexts/UserContext";
export default function Post({ data }) {
    const { setToast } = useToast();
    const { user, setUser } = useUser();
    const [isLiked, setIsLiked] = useState(data.likedBy.includes(user?.uid));
    const [docRef, setDocRef] = useState({});
    const [postOwner, setPostOwner] = useState({});

    useEffect(() => {
        setIsLiked(data.likedBy.includes(user?.uid));
        /// using user.email in depedency array because it is bad practice to use object i.e user. for info ref --> https://www.youtube.com/watch?v=QQYeipc_cik
    }, [user.email]);

    useEffect(() => {
        setDocRef(doc(db, "posts", data.id));

        getDoc(doc(db, "users", data.uid)).then((data) =>
            setPostOwner(data.data())
        );
    }, []);

    function likePost() {
        if (!user) {
            setToast({
                show: true,
                msg: "Please Sign In first!",
                type: "error",
            });
            return;
        }

        let newIsLikedBy;
        !isLiked
            ? (newIsLikedBy = [...data.likedBy, user?.uid])
            : (newIsLikedBy = data.likedBy.filter((u) => u !== user?.uid));

        setIsLiked((prevIsLiked) => !prevIsLiked);

        updateDoc(docRef, {
            likedBy: newIsLikedBy,
        });
    }

    function deletePost() {
        deleteDoc(docRef).then(() => {
            setToast({ show: true, msg: "Post deleted" });
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
                            {
                                console.log(postOwner, "🐻‍");
                            }
                            e.target.src = `https://avatars.dicebear.com/api/identicon/${data.uid}.svg`;
                        }}
                        className="h-8 aspect-square rounded-full"
                    />
                    <h1 className="w-full text-sm dark:text-primary">
                        {postOwner.displayName}
                    </h1>
                </div>
                <h1 className="dark:text-primary">{data.title}</h1>
                <img src={data.img} className="mx-auto" alt={data.title} />
            </div>
            <div className="flex items-center justify-between px-4 py-2 rounded-lg gap-1 dark:bg-darkText">
                <div className="flex items-center gap-0.5">
                    <FontAwesomeIcon
                        icon={isLiked ? heartFilled : heartOutline}
                        className={`cursor-pointer transition-colors ${
                            isLiked ? "text-brightRed" : "hover:text-lightRed"
                        }`}
                        size="lg"
                        onClick={likePost}
                    />
                    <span className="font-primary dark:text-primary">
                        {data.likedBy.length}
                    </span>
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
