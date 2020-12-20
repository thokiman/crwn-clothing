import React from "react";
import { connect } from "react-redux";
import { auth } from "../../firebase/firebase.utils";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
  // OptionDiv,
} from "./header.styles";

// Decide on Component 1, Homepage, Reusable Component
//pipeline 0->1.4

const Header = ({ currentUser, hidden }) => {
  return (
    <HeaderContainer>
      <LogoContainer to={"/"}>
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to={"/shop"}>SHOP</OptionLink>
        <OptionLink to={"/shop"}>CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink
            as="div"
            onClick={() => {
              auth.signOut();
            }}
          >
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to={"/signin"}>SIGN IN</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {hidden ? null : <CartDropdown />}
    </HeaderContainer>
  );
};
// redux1

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
//redux1
