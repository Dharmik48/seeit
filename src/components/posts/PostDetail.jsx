import {useEffect, useState} from "react";
// Components
import Post from "./Post.jsx";
import Comments from "../comments/Comments.jsx";
// Firebase
import {useParams} from "react-router-dom";
import {doc, getDoc, onSnapshot} from "firebase/firestore";
import {db, storage} from "../../firebase/firebase.js";
import NewComment from "../comments/NewComment.jsx";
import {getDownloadURL, ref} from "firebase/storage";

export default function PostDetail() {
    const {postId} = useParams();
    const [postData, setPostData] = useState({});
    const [imgUrl, setImgUrl] = useState("");

    useEffect(() => {
        onSnapshot(doc(db, "posts", postId), (snapshot) => {
            setPostData({...snapshot.data(), id: postId});
        });
    }, []);

    useEffect(() => {
        if (!postData.id) return;

        const imgRef = ref(storage, `images/${postData.img}`);
        getDownloadURL(imgRef).then((url) => setImgUrl(url));
    }, [postData])

    return (
        <section className="grid gap-10 mt-5 lg:mt-10">
            {Object.keys(postData).length > 0 && (
                <>
                    <Post data={postData} imgUrl={imgUrl}/>
                    <div className="flex flex-col gap-2.5">
                        <h3>Comments</h3>
                        <Comments postId={postId}/>
                    </div>
                </>
            )}
        </section>
    );
}
