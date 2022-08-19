import {useEffect, useState} from "react";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as heartFilled} from "@fortawesome/free-solid-svg-icons";
import {faHeart as heartOutline} from "@fortawesome/free-regular-svg-icons";

export default function Comment({commentData, currentUser, postId}) {
    const [commentBy, setCommentBy] = useState({})
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        getDoc(doc(db, 'users', commentData.uid))
            .then(userData => setCommentBy(userData.data()))

        commentData.likedBy.includes(currentUser?.uid) && setIsLiked(true)
    }, [])

    const likeComment = () => {
        if (!currentUser) {
            setFlash({show: true, success: false, msg: "Please Sign In first!"})
            return;
        }

        let newIsLikedBy;
        !isLiked
            ? (newIsLikedBy = [...commentData.likedBy, currentUser?.uid])
            : (newIsLikedBy = commentData.likedBy.filter(u => u !== currentUser?.uid));

        setIsLiked(prevIsLiked => !prevIsLiked);

        const docRef = doc(db, 'posts', postId);

        updateDoc(docRef, {
            comments: {},
        });
    }

    return (
        <div className='grid gap-2.5 bg-primary border border-[#ccc] p-3 rounded-lg shadow-lg
    dark:bg-darkText dark:border-primary dark:text-primary'>
            <div className='w-full flex items-center gap-2'>
                <img
                    src={commentBy.photoURL}
                    alt={commentBy.displayName || 'unknown'}
                    onError={(e) => {
                        e.target.src = `https://avatars.dicebear.com/api/identicon/${commentBy.uid}.svg`
                    }}
                    className='h-6 aspect-square rounded-full'
                />
                <h1 className='w-full text-sm dark:text-primary'>{commentBy.displayName}</h1>
            </div>
            <p>
                {commentData.text}
            </p>
            <div className='flex items-center gap-1'>
                <FontAwesomeIcon
                    icon={isLiked ? heartFilled : heartOutline}
                    className={`cursor-pointer transition-colors dark:text-primary ${
                        isLiked ? 'text-brightRed' : 'hover:text-lightRed'
                    }`}
                    size='lg'
                    onClick={likeComment}
                />
                <span className='font-primary dark:text-primary'>{commentData.likedBy.length || 0}</span>
            </div>
        </div>
    )
}