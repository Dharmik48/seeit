import { useEffect, useState } from "react";
// COMPONENTS

import { signInWithPopup } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import NewPost from "./components/NewPost";
import Posts from "./components/Posts";
import { auth, colRef, provider } from "./firebase/firebase";
import useDarkMode from "./hooks/useDarkMode";


function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPosts(data);
    });
  }, []);


  const signInWithGoogle = async () => {
    const data = await signInWithPopup(auth, provider);
    const { uid, photoURL, email, displayName } = data.user;
    setUser({ uid, photoURL, email, displayName });
  };
  const [setTheme, colorTheme] = useDarkMode();
  return (
    <main className="w-full min-h-screen py-5 bg-secondary px-5 font-primary dark:bg-darkText">
      <header
        className={`max-w-3xl flex items-center justify-between mx-auto border-b border-darkText pb-3 lg:pb-5 ${
          user && "mb-5 lg:mb-10"
        }`}
      >
        {/* toggle switches to dark and light mode */}

        {/* sign in with google */}

        <h1 className="text-2xl dark:text-primary">👀 SeeIt</h1>
        <div className="flex items-center">
          <label
            className="flex items-center"
            onClick={() => setTheme(colorTheme)}
          >
            <input type="checkbox" className="" />
          
          </label>
        </div>
        {!user ? (
          <button
            onClick={() => signInWithGoogle()}
            className="border border-darkText rounded-full py-1.5 px-4 hover:bg-darkText hover:text-primary transition-colors focus:bg-darkText focus:text-primary focus:outline-none dark:text-primary dark:bg-darkText
            dark:hover:bg-darkText dark:hover:text-primary dark:border-primary"
          >
            Sign In
          </button>
        ) : (
          <img
            src={user.photoURL}
            className="max-h-8 lg:max-h-10"
            alt={user.displayName}
          />
        )}
      </header>
      <section className="max-w-xl mx-auto grid">
        {user && <NewPost />}
        <Posts posts={posts} />
      </section>
    </main>
  );
}

export default App;
