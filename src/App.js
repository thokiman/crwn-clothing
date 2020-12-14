import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

// Decide on Component 0, Homepage, Non-Reusable Component
//pipeline 0
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }
  //<2>
  //from firebase auth() class method
  unsubscribeFromAuth = null;
  //<2>
  //<3>
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      console.log("this is App.js// componentDidMount/ userAuth :", userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          console.log(
            "this is App.js// componentDidMount/ .onSnapshot :",
            snapshot
          );
          console.log(
            "this is App.js// componentDidMount/ .onSnapshot.data :",
            snapshot.data()
          );
          this.setState(
            {
              currentUser: snapshot.id,
              ...snapshot.data(),
            },
            () => {
              console.log(
                "this is App.js//componentDidMount/ setState :",
                this.state
              );
            }
          );
        });
      }
      this.setState({ currentUser: userAuth });
    });
    console.log("this is unsubscribe method :", this.unsubscribeFromAuth);
  }
  //<3>
  //<2>
  // componentDidMount() {
  //   this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
  //     console.log("this is App// componentDidMount/ user :", user);
  //     this.setState({ currentUser: user });
  //     console.log(
  //       "this is App// componentDidMount/ after setState/ state :",
  //       this.state
  //     );
  //   });
  // }
  //<2>
  //<2>
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  //<2>
  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <Header currentUser={currentUser} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
