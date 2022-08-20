import {useEffect, useState} from "react";
// Components
import Post from './Post.jsx'
import Comments from "../comments/Comments.jsx";
// Firebase
import {useParams} from "react-router-dom";
import {doc, getDoc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase/firebase.js";
import NewComment from "../comments/NewComment.jsx";

export default function PostDetail() {
    const {postId} = useParams();
    const [postData, setPostData] = useState({});

    useEffect(() => {
        onSnapshot(doc(db, 'posts', postId), (snapshot) => {
            setPostData(snapshot.data())
        })
    }, []);

    return (
        <section className='grid gap-10 mt-5 lg:mt-10'>
            {Object.keys(postData).length > 0 && (
                    <>
                        <Post data={{...postData, id: postId}} />
                        <div className='flex flex-col gap-2.5'>
                            <h3>Comments</h3>
                            <Comments postId={postId} />
                        </div>
                    </>
                )
            }
        </section>
    );
}