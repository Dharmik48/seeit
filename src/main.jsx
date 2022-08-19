import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./contexts/UserContext";
import "./index.css";
import {FlashProvider} from "./contexts/FlashContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <UserProvider>
            <FlashProvider>
                <App />
            </FlashProvider>
        </UserProvider>
    </BrowserRouter>
);
