import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import FlashContext from "./contexts/FlashContext.jsx";
import UserContext from "./contexts/UserContext.jsx";
// COMPONENTS
import NewPost from "./components/posts/NewPost.jsx";
import Posts from "./components/posts/Posts.jsx";
import FlashMsg from "./components/FlashMsg";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle.jsx";
import PostDetail from "./components/posts/PostDetail.jsx";
import { useEffect } from "react";
import { auth } from "./firebase/firebase.js";

function App() {
    const { user, setUser } = useContext(UserContext);
    const { flashData } = useContext(FlashContext);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                const { uid, photoURL, email, displayName } = user;
                setUser({ uid, photoURL, email, displayName });
            } else {
                console.log("not logged in");
            }
        });
    }, []);
    return (
        <main className="w-full min-h-screen py-5 bg-secondary px-5 font-primary dark:bg-darkText">
            {flashData?.show && <FlashMsg />}
            <Header />
            <section className="max-w-xl mx-auto grid relative">
                <ThemeToggle />
                {user && user.email && <NewPost />}
                <Routes>
                    <Route exact path="/" element={<Posts />} />
                    <Route path="/posts/:postId" element={<PostDetail />} />
                </Routes>
            </section>
        </main>
    );
}

export default App;
