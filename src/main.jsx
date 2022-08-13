import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastProvider } from "./contexts/ToastContext";
import { UserProvider } from "./contexts/UserContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <UserProvider>
        <ToastProvider>
            <App />
        </ToastProvider>
    </UserProvider>
);
