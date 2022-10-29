import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Auth from "./Auth";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const user = useContext(UserContext);
  return (
    <header className="max-w-3xl flex justify-between items-center mx-auto border-b border-darkText pb-3 lg:pb-5 dark:border-gray">
      <Link to={"/"}>
        <h1 className="text-2xl dark:text-primary">👀 SeeIt</h1>
      </Link>
      <ThemeToggle />
      <Auth />
    </header>
  );
};

export default Header;
