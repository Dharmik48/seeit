import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faSpinner, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export default function NewComment() {
    const [commentText, setCommentText] = useState('');

    return (
        <form>
            <div className='flex items-center border-2 w-full border-secondary rounded-lg dark:border-[#ccc] dark:bg-darkText dark:text-darkText'>
                <input
                    type='text'
                    placeholder='New Post'
                    value={commentText}
                    className='w-full bg-primary h-full p-2 lg:p-4 border-r-2 border-secondary focus:outline-none
							dark:bg-darkText dark:border-[#ccc] dark:text-primary rounded-lg'
                    onChange={e => setCommentText(e.target.value)}
                />
            </div>
        </form>
    )
}