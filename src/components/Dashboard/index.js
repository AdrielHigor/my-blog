import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../firebase";
import "./dashboard.css";
import { render } from "@testing-library/react";

export default withRouter(function Dashboard(props) {
  const [name, setName] = useState([]);
  const [role, setRole] = useState([]);
  const [email, setEmail] = useState([]);

  const logout = async () => {
    await firebase.logout();
    props.history.replace("/");
  };

  useEffect(() => {
    if (!firebase.getCurrent()) {
      props.history.replace("/login");
    }

    setEmail(firebase.getCurrent());

    firebase.getUserInfo(info => {
      setName(info.val().name);
      setRole(info.val().role);
    });
  });
  if (role === "admin") {
    return (
      <div id="Dashboard">
        <div>
          <h1>Olá {name}</h1>
          <p>Email: {email}</p>
        </div>
        <Link id="newpost" to="/dashboard/newpost">
          Novo Post
        </Link>
        <button onClick={logout}>Sair</button>
      </div>
    );
  } else {
    return(
      <div id="Dashboard">
        <div>
          <h1>Olá {name}</h1>
          <p>Email: {email}</p>
        </div>
        <button onClick={logout}>Sair</button>
      </div>
    );
  }
});
