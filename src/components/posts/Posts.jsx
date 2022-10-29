import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Post from "./Post.jsx";
import { useEffect, useState, useContext } from "react";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { postsColRef } from "../../firebase/firebase.js";
import NewPost from "./NewPost.jsx";
import UserContext from "../../contexts/UserContext.jsx";
import userContext from "../../contexts/UserContext.jsx";

const FormattedSkeleton = ({ count }) => {
  const color = "#87888a";
  const noOfSkeleton = new Array(count).fill(1);

  return (
    <>
      {noOfSkeleton.map((_, index) => (
        <div key={index}>
          <div className="flex items-center">
            <Skeleton
              baseColor={color}
              circle={true}
              width={30}
              height={30}
              inline={true}
            />
            <Skeleton
              className="ml-3"
              baseColor={color}
              width={100}
              height={15}
            />
          </div>
          <Skeleton baseColor={color} height={20} />
          <Skeleton baseColor={color} height={300} />
        </div>
      ))}
    </>
  );
};

export default function Posts({ setFlash }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    onSnapshot(query(postsColRef, orderBy("createdAt", "desc")), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(data);
    });
  }, []);

  const renderPosts = () =>
    posts.map((post) => <Post data={post} key={post.id} />);

  return (
    <section className="grid gap-5 font-light dark:bg-darkText">
      {user && user.email && <NewPost />}

      {posts && posts.length > 0 ? (
        renderPosts()
      ) : (
        <>
          <FormattedSkeleton count={10} />
        </>
      )}
    </section>
  );
}
