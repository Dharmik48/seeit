import React from "react";
const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({
        displayName: "",
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

export const useUser = () => React.useContext(UserContext);
