import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import "./header.css";
import firebase from "../../firebase";

export default withRouter(function Header(props) {
  const [data, setData] = useState({ link: "login", text: "Entrar" });

  useEffect(() => {
    function changeHeader() {
      if (firebase.getCurrent()) {
        setData({
          link: "dashboard",
          text: "Dashboard"
        });
      } else {
        setData({
          link: "login",
          text: "Entrar"
        });
      }
    }

    props.history.listen((location, action) => {
      if (action === "REPLACE") {
        changeHeader();
      }
    });

    changeHeader();
  }, []);

  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/">Meu Blog</Link>
        <Link to={"/" + data.link}>{data.text}</Link>
      </div>
    </header>
  );
});
