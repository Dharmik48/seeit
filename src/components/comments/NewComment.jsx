import {useContext, useState} from "react";
import UserContext from "../../contexts/UserContext";
import FlashContext from "../../contexts/FlashContext.jsx";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase.js";

export default function NewComment({postId, comments}) {
    const [commentText, setCommentText] = useState('');
    const {user: currentUser} = useContext(UserContext);
    const {flash} = useContext(FlashContext);

    const addComment = (e) => {
        e.preventDefault();

        if(!currentUser) {
            flash({show: true, msg: 'Please Sign In First!', success: false})
            return;
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