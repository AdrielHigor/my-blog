import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../firebase";
import "./dashboard.css";

export default withRouter(function Dashboard(props) {
    const [name, setName] = React.useState([]);
    const [role, setRole] = React.useState([]);
    const [email, setEmail] = React.useState([]);

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

    return (
        <div id="Dashboard">
            <div>
                <h1>Olá {name}</h1>
                <p>Email: {email}</p>
            </div>
            {role === "admin" ?
                <Link id="newpost" to="/dashboard/newpost">
                    Novo Post
                </Link> : null}
            <button onClick={logout}>Sair</button>
        </div>
    )
});
