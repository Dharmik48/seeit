import {useState} from "react";
import useFlash from "../../hooks/useFlash.js";
import {doc, serverTimestamp, updateDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faSpinner, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import FlashMsg from "../FlashMsg";

export default function NewComment({postId, comments, currentUser}) {
    const [commentText, setCommentText] = useState('');
    const [setFlash, flash] = useFlash();

    const addComment = (e) => {
        e.preventDefault();

        if(!currentUser) {
            setFlash({show: true, msg: 'Please Sign In First!', success: false})
            return
        }

        const newComment = {
            uid: currentUser.uid,
            text: commentText,
        }

        updateDoc(doc(db, 'posts', postId), {
            comments: [...comments, newComment]
        })

        setCommentText('')
    }

    return (
        <form className='grid gap-2.5 bg-primary border border-[#ccc] p-3 rounded-lg shadow-lg
    dark:bg-darkText dark:border-primary dark:text-primary'>
            {flash.show && <FlashMsg flash={flash} setFlash={setFlash}/>}
            <textarea
                placeholder='New Post'
                value={commentText}
                className='w-full bg-primary h-full p-2 lg:p-4 border-2 border-secondary focus:outline-none
                        dark:bg-darkText dark:border-[#ccc] dark:text-primary rounded-lg'
                onChange={e => setCommentText(e.target.value)}
            />
            <button
                className='border-2 border-secondary py-2 px-6 rounded-full justify-self-end transition-colors hover:bg-secondary'
                onClick={addComment}
            >
                Submit
            </button>
        </form>
    )
}