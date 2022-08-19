import {createContext, useState} from "react";

const UserContext = createContext();

export function UserProvider({children}) {
    const [user, setUser] = useState({
        displayName: "",
        email: "",
        photoURL: "",
        uid: "",
    });

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;