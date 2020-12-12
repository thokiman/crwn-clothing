import React from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";
// Decide on Component 1, Homepage, Reusable Component
//pipeline 0->1.3
const Header = () => {
  return (
    <div className="header">
      <Link className="logo-container" to={"/"}>
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to={"/shop"}>
          SHOP
        </Link>
        <Link className="option" to={"/shop"}>
          CONTACT
        </Link>
      </div>
    </div>
  );
};

export default Header;
