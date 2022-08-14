import { useEffect, useState } from "react";
// COMPONENTS
import { onSnapshot, orderBy, query } from "firebase/firestore";
import NewPost from "./components/NewPost";
import Posts from "./components/Posts";
import { postsColRef } from "./firebase/firebase";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle.jsx";
import Toast from "./components/Toast";
import { useUser } from "./contexts/UserContext";
import Skeleton from "react-loading-skeleton";

function App() {
    const [posts, setPosts] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        onSnapshot(
            query(postsColRef, orderBy("createdAt", "desc")),
            (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setPosts(data);
            }
        );
    }, []);

    return (
        <main className="w-full min-h-screen py-5 bg-secondary px-5 font-primary dark:bg-darkText">
            <Header />
            <section className="max-w-xl mx-auto grid relative">
                <ThemeToggle />
                <Toast />
                {user.email && <NewPost />}

                <Posts posts={posts} />
            </section>
        </main>
    );
}

export default App;
