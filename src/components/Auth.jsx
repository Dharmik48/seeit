import React, { useContext,useState } from "react";
import UserContext from "../contexts/UserContext.jsx";
import FlashContext from "../contexts/FlashContext.jsx";
// FIREBASE
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, provider } from "../firebase/firebase";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Auth = () => {
  const { user, setUser } = useContext(UserContext);
  const { flash } = useContext(FlashContext);
  const [show,setShow] = useState(false);

  const signInWithGoogle = async () => {
    const data = await signInWithPopup(auth, provider);
    const { uid, photoURL, email, displayName } = data.user;
    console.log(photoURL)
    const userRef = doc(db, "users", uid);
    getDoc(userRef)
      .then((userDoc) => {
        if (userDoc.exists()) return;
        return setDoc(userRef, {
          uid,
          photoURL,
          email,
          displayName,
          posts: [],
        });
      })
      .then(() => {
        flash({
          show: true,
          msg: "Signed In Successfully",
          success: true,
        });
      });
    setUser({ uid, photoURL, email, displayName });
  };

  const signUserOut = () => {
    signOut(auth).then(() => {
      setUser({});
      flash({
        show: true,
        msg: "Signed Out Successfully",
        success: true,
      });
    });
  };

  return (
    <>
      {!user?.uid ? (
        <button
          onClick={signInWithGoogle}
          className="border border-darkText rounded-full py-1.5 px-4 hover:bg-darkText hover:text-primary transition-colors focus:bg-darkText focus:text-primary focus:outline-none dark:text-primary dark:bg-darkText
    dark:hover:bg-darkText dark:hover:text-primary dark:border-primary"
        >
          Sign In
        </button>
      ) : (
        <div className={`flex flex-row-reverse transition-all duration-150 items-center relative ml-2 ${show?"mr-9":""}`}>
          <div onMouseEnter={()=>setShow(true)} onMouseLeave = {()=>setShow(false)} className={` bg-[white] h-12 flex transition-all duration-150 ${show?"w-[80px]":"w-0 right-[1rem]"} overflow-hidden items-center justify-end pr-3 rounded-full -right-10 absolute z-0`}>
            <FiLogOut onClick={()=>{
              signUserOut();
              setShow(false);
            }} className="cursor-pointer text-xl" />
          </div>
          <div onMouseEnter={()=>setShow(true)} onClick = {()=>setShow(!show)} onMouseLeave={()=>setShow(false)} className="p-1 bg-[white] rounded-full z-10 flex justify-center items-center">
            <Link to={`/users/${user?.uid}`}>
              <img
                src={user?.photoURL}
                className="max-h-8 lg:max-h-10 rounded-full"
                alt={user?.displayName}
                onError={(e) => {
                  e.target.src = `https://avatars.dicebear.com/api/identicon/${user.uid}.svg`;
                }}
              />
            </Link>

          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
