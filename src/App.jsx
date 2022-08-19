import {useContext} from "react";
import { Routes, Route } from "react-router-dom";
import UserContext from "./contexts/UserContext.jsx";
import useFlash from "./hooks/useFlash.js";
// COMPONENTS
import NewPost from "./components/NewPost";
import Posts from "./components/Posts";
import FlashMsg from "./components/FlashMsg";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle.jsx";
import PostDetail from "./components/PostDetail.jsx";

function App() {
    const { user } = useContext(UserContext)
    const [setFlash, flash] = useFlash();
    return (
        <main className="w-full min-h-screen py-5 bg-secondary px-5 font-primary dark:bg-darkText">
            {flash?.show && <FlashMsg flash={flash} setFlash={setFlash} />}
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
