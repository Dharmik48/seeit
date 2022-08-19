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

function App() {
    const { user } = useContext(UserContext);
    const { flashData } = useContext(FlashContext);

    return (
        <main className="w-full min-h-screen py-5 bg-secondary px-5 font-primary dark:bg-darkText">
            {flashData?.show && <FlashMsg />}
            <Header />
            <section className="max-w-xl mx-auto grid relative">
                <ThemeToggle />
                {user && user.email && <NewPost />}
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Posts />}
                    />
                    <Route
                        path="/posts/:postId"
                        element={<PostDetail />}
                    />
                </Routes>
            </section>
        </main>
    );
}

export default App;
