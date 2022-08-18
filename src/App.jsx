import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import useFlash from "./hooks/useFlash.js";
// FIREBASE
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, provider, db } from "./firebase/firebase";
// COMPONENTS
import NewPost from "./components/NewPost";
import Posts from "./components/Posts";
import FlashMsg from "./components/FlashMsg";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle.jsx";
import PostDetail from "./components/PostDetail.jsx";
import { useUser } from "./contexts/UserContext.jsx";

function App() {
    const { user } = useUser();
    const [setFlash, flash] = useFlash();
    return (
        <main className="w-full min-h-screen py-5 bg-secondary px-5 font-primary dark:bg-darkText">
            {flash?.show && <FlashMsg flash={flash} setFlash={setFlash} />}
            <Header />
            <section className="max-w-xl mx-auto grid relative">
                <ThemeToggle />
                {user && user.email && <NewPost currentUser={user} />}
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Posts currentUser={user} />}
                    />
                    <Route
                        path="/posts/:postId"
                        element={<PostDetail currentUser={user} />}
                    />
                </Routes>
            </section>
        </main>
    );
}

export default App;
