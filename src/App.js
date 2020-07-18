import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home/index";
import Header from "./components/Header/index";
import firebase from "./firebase";
import Post from "./components/Post/index";
import Login from "./components/Login/index";
import Register from "./components/Register/index";
import Dashboard from "./components/Dashboard/index";
import NewPost from "./components/NewPost/index";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firebaseInitialized: false
    };
  }

  componentDidMount() {
    firebase.firebaseInitialized().then(result => {
      this.setState({ firebaseInitialized: result });
    });
  }

  render() {
    return this.state.firebaseInitialized !== false ? (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/post/:postId" component={Post}></Route>
          <Route exact path="/login/" component={Login}></Route>
          <Route exact path="/register/" component={Register}></Route>
          <Route exact path="/dashboard/" component={Dashboard}></Route>
          <Route exact path="/dashboard/newpost" component={NewPost}></Route>
        </Switch>
      </BrowserRouter>
    ) : (
      <h1>Loading...</h1>
    );
  }
}
