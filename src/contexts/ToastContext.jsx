import React, { createContext, useContext } from "react";

const ToastContext = createContext({
    show: false,
    type: "success",
    msg: "",
});

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = React.useState({
        show: false,
        msg: "",
        type: "success",
    });
    return (
        <ToastContext.Provider value={{ toast, setToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
