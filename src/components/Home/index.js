import React, { Component, useState, useEffect } from "react";
import "./home.css";
import firebase from "../../firebase";
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    let postsArray = [];

    firebase.app.ref("posts").on("child_added", snapshot => {
      postsArray.push({
        key: snapshot.key,
        description: snapshot.val().description,
        author: snapshot.val().author,
        title: snapshot.val().title,
        image: snapshot.val().image
      });
      postsArray.reverse();
      this.setState({ posts: postsArray });
    });
  }

  componentDidUpdate() {
    firebase.app.ref("posts").on("child_removed", snapshot => {
      this.setState(prevState => ({
        posts: prevState.posts.filter(item => item.key !== snapshot.key)
      }));
    });
  }

  componentWillUnmount() {
    firebase.app.ref("posts").off("child_changed");
    firebase.app.ref("posts").off("child_removed");
  }

  render() {
    return (
      <section id="post-root">
        {this.state.posts.map(post => {
          return (
            <Link to={"/post/" + post.key} key={post.key}>
              <article id="post">
                <header>
                  <div id="title">
                    <strong id="post-title">{post.title}</strong>
                    <span id="post-author">Autor: {post.author}</span>
                  </div>
                </header>
                <img id="post-image" src={post.image} alt="" />
                <footer>
                  <p id="post-description">{post.description}</p>
                </footer>
              </article>
            </Link>
          );
        })}
      </section>
    );
  }
}
