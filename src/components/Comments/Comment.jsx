import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.js";

export default function Comment({ commentData }) {
    const [commentBy, setCommentBy] = useState({});

    useEffect(() => {
        getDoc(doc(db, "users", commentData.uid)).then((userData) =>
            setCommentBy(userData.data())
        );
    }, []);

    return (
        <div
            className="grid gap-2.5 bg-primary border border-[#ccc] p-3 rounded-lg shadow-lg
    dark:bg-darkText dark:border-primary dark:text-primary"
        >
            <div className="w-full flex items-center gap-2">
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
            {commentData.text}
        </div>
    );
}
