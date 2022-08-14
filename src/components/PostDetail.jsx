import {useEffect, useState} from "react";
// Components
import Post from './Post.jsx'
// Firebase
import {useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase/firebase";
import NewComment from "./Comments/NewComment";

export default function PostDetail(props) {
    const {postId} = useParams();
    const [postData, setPostData] = useState({});

    useEffect(() => {
        getDoc(doc(db, 'posts', postId)).then(data => setPostData(data.data()))
    }, []);

    return (
        <section className='mt-5 lg:mt-10'>
            {Object.keys(postData).length > 0 && <Post data={{...postData, id: postId}} {...props} />}
            <div>
                <h3>Comments</h3>
                <NewComment />
            </div>
        </section>
    );
}