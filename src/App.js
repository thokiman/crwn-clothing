import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { createStructuredSelector } from "reselect";

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";

import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

import "./App.css";
// Decide on Component 0, Homepage, Non-Reusable Component
//pipeline 0
class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    //this is stream data from firbease.auth/ observable
    this.unsubscribeFromAuth = auth.onAuthStateChanged(
      //this is subscription, .onAuthStateChanged next call, observer subscribes to firebase.auth, observable
      async (userAuth) => {
        console.log("this is App.js// componentDidMount/ userAuth :", userAuth);
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);
          //this is subscription, .onSnapshot next call, observer subscribes to firebase.auth, observable
          userRef.onSnapshot((snapshot) => {
            console.log(
              "this is App.js// componentDidMount/ .onSnapshot :",
              snapshot
            );
            console.log(
              "this is App.js// componentDidMount/ .onSnapshot.data :",
              snapshot.data()
            );

            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
            });
          });
        }

        setCurrentUser(userAuth);
      },
      //this is subscription, error call, observer subscribes to firebase.auth, observable
      (error) => console.log("this is observer error call :", error)
      //,
      //this is subscription, complete call, observer subscribes to firebase.auth, observable
      //() => {// do something at finished }
    );
    console.log("this is unsubscribe method :", this.unsubscribeFromAuth);
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
