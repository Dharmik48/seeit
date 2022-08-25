import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Post from "./Post.jsx";
import { useEffect, useState } from "react";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { postsColRef } from "../../firebase/firebase.js";

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
    <section className="grid gap-5 font-light mt-5 lg:mt-10 dark:bg-darkText">
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
