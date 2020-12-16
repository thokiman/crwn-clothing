import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.action";

// Decide on Component 0, Homepage, Non-Reusable Component
//pipeline 0
class App extends React.Component {
  //from firebase auth() class method
  unsubscribeFromAuth = null;

  componentDidMount() {
    //mapStateToDispatch
    const { setCurrentUser } = this.props;
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
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
      // this.setState({ currentUser: userAuth });
    });
    console.log("this is unsubscribe method :", this.unsubscribeFromAuth);
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}
// redux1
// const {user} = this.props
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
//const {setCurrentUser} = this.props
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
//redux1
