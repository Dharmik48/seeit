import { signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import FlashMsg from "./components/FlashMsg";
import { useUser } from "./contexts/UserContext";
import { auth, db, provider } from "./firebase/firebase";
import useFlash from "./hooks/useFlash";

const Auth = () => {
    const { user, setUser } = useUser();
    const [setFlash, flash] = useFlash();

    const signInWithGoogle = async () => {
        const data = await signInWithPopup(auth, provider);
        const { uid, photoURL, email, displayName } = data.user;
        const userRef = doc(db, "users", uid);

        setDoc(userRef, { uid, photoURL, email, displayName }).then(() => {
            setFlash({
                show: true,
                msg: "Signed In Successfully",
                success: true,
            });
        });
        setUser({ uid, photoURL, email, displayName });
    };

    const signUserOut = () => {
        signOut(auth).then(() => {
            setUser(null);
            setFlash({
                show: true,
                msg: "Signed Out Successfully",
                success: true,
            });
        });
    };

    return (
        <>
            {flash?.show && <FlashMsg flash={flash} setFlash={setFlash} />}
            <h1 className="text-2xl dark:text-primary">👀 SeeIt</h1>
            {!user?.email ? (
                <button
                    onClick={signInWithGoogle}
                    className="border border-darkText rounded-full py-1.5 px-4 hover:bg-darkText hover:text-primary transition-colors focus:bg-darkText focus:text-primary focus:outline-none dark:text-primary dark:bg-darkText
    dark:hover:bg-darkText dark:hover:text-primary dark:border-primary"
                >
                    Sign In
                </button>
            ) : (
                <div className="flex items-center gap-3.5 lg:gap-5">
                    <p
                        className="w-max cursor-pointer dark:text-primary"
                        onClick={signUserOut}
                    >
                        Sign&nbsp;out
                    </p>
                    <img
                        src={user.photoURL}
                        className="max-h-8 lg:max-h-10 rounded-full"
                        alt={user.displayName}
                        onError={(e) => {
                            e.target.src = `https://avatars.dicebear.com/api/identicon/${user.uid}.svg`;
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default Auth;
