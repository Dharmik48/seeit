import React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";

const Header = () => {
  return (
    <header className="max-w-3xl flex justify-between mx-auto border-b border-darkText pb-3 lg:pb-5 dark:border-gray">
      <Link to={"/"}>
        <h1 className="text-2xl dark:text-primary">👀 SeeIt</h1>
      </Link>
      <Auth />
    </header>
  );
};

export default Header;
