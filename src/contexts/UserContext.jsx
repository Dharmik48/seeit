import React, { createContext, useContext } from "react";

const UserContext = createContext({
    dispalyName: "",
    email: "",
    photoURL: "",
    uid: "",
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({
        dispalyName: "",
        email: "",
        photoURL: "",
        uid: "",
    });
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
