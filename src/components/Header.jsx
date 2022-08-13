import React from "react";
import Auth from "./Auth";

const Header = (props) => {
    return (
        <header className="max-w-3xl flex justify-between mx-auto border-b border-darkText pb-3 lg:pb-5 mb-5 lg:mb-10">
            <h1 className="text-2xl dark:text-primary">👀 SeeIt</h1>
            <Auth />
        </header>
    );
};

export default Header;
