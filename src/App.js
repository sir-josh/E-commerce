import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/signin-and-signup/signin-and-signup.component';
import CheckoutPage from "./pages/checkout/checkout.component";

// import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends Component {
  // constructor(props){
  //   super(props);

  //   this.state = {
  //     currentUser: null
  //   }
  // }

  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props;

    // this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuthfromFirebase => {
    //   // this.setState({ currentUser: userAuthfromFirebase });
    //   if(userAuthfromFirebase){
    //     const userRef = await createUserProfileDocument(userAuthfromFirebase);

    //     userRef.onSnapshot(snapShot => {
    //       // this.setState({
    //       //   currentUser: {
    //       //     id: snapShot.id,
    //       //     ...snapShot.data()
    //       //   }
    //       // });
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       });
    //     });
    //   }
    //   // this.setState({ currentUser: userAuthfromFirebase });
    //   setCurrentUser(userAuthfromFirebase);

    //   // } else{
    //   //   this.setState({ currentUser: userAuthfromFirebase });
    //   // }

    // });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() =>
            this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUp />)
          } />
        </Switch>
      </div>
    )
  }
}

// const mapStateToProps = ({ user }) =>({
//   currentUser: user.currentUser
// });

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => (dispatch(setCurrentUser(user)))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
