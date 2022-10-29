import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase/firebase.js";

const User = () => {
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    getDoc(doc(db, `users/${userId}`))
      .then((userDoc) => {
        const userData = userDoc.data();
        setUserData(userData);
        return userData;
      })
      .then((userData) => {
        const q = query(
          collection(db, "posts"),
          where("uid", "==", userData.uid)
        );
        getDocs(q).then((userPosts) => {
          const userPostsData = userPosts.docs.map((post) => ({
            ...post.data(),
            id: post.id,
          }));
          setUserPosts(userPostsData);
        });
      });
  }, []);

  const renderPosts = () =>
    userPosts.map((post) => (
      <Link to={`/posts/${post.id}`}>
        <img className={"max-w-full"} src={post.img} alt={post.title} />
      </Link>
    ));

  return (
    <section className="flex flex-col gap-5 lg:gap-10">
      <div
        className="flex items-center gap-5 bg-[#fff] p-5 border border-[#ccc] rounded-lg shadow-lg dark:bg-darkText
		dark:border-darkText"
      >
        <img
          src={userData.photoURL}
          alt={userData.displayName || "unknown"}
          onError={(e) => {
            e.target.src = `https://avatars.dicebear.com/api/identicon/${userData.uid}.svg`;
          }}
          className={"h-14 rounded-full"}
        />
        <div className={"flex flex-col items-start justify-center"}>
          <h1 className={"dark:text-primary"}>{userData.displayName}</h1>
          <p
            className={"text-lightText"}
          >{`${userData.posts?.length} Posts`}</p>
        </div>
      </div>
      <div className={"columns-2"}>
        {userPosts.length > 0 ? renderPosts() : "Loading Posts..."}
      </div>
    </section>
  );
};

export default User;
