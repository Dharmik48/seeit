import { useEffect, useState } from "react";
// COMPONENTS
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import NewPost from "./components/NewPost";
import Posts from "./components/Posts";
import { auth, postsColRef, provider, db } from "./firebase/firebase";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { useToast } from "./contexts/ToastContext";
import Toast from "./components/Toast";

function App() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);

    const { toast, setToast } = useToast();

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

    const signInWithGoogle = async () => {
        const data = await signInWithPopup(auth, provider);
        const { uid, photoURL, email, displayName } = data.user;
        const userRef = doc(db, "users", uid);

        setDoc(userRef, { uid, photoURL, email, displayName }).then(() => {
            setToast({
                show: true,
                msg: "Signed In Successfully",
                type: "success",
            });
        });
        setUser({ uid, photoURL, email, displayName });
    };

    const signUserOut = () => {
        signOut(auth).then(() => {
            setUser(null);
            setToast({
                show: true,
                msg: "Signed Out Successfully",
                type: "success",
            });
        });
    };

    return (
        <main className="w-full min-h-screen py-5 bg-secondary px-5 font-primary dark:bg-darkText">
            <Header
                user={user}
                signInWithGoogle={signInWithGoogle}
                signUserOut={signUserOut}
            />
            <section className="max-w-xl mx-auto grid relative">
                <ThemeToggle />
                <Toast />
                {user && <NewPost currentUser={user} />}
                <Posts posts={posts} currentUser={user} />
            </section>
        </main>
    );
}

export default App;
