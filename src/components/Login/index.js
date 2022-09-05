import "./login.css";
import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../firebase";

export default withRouter(function Login(props) {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    const login = React.useCallback(
        async e => {
            e.preventDefault();

            try {
                await firebase.login(email, password).catch(error => {
                    alert(error.code);
                    return null;
                });
                props.history.replace("/dashboard");
            } catch (error) {
                alert(error.message);
            }
        },
        [email, password]
    );

    useEffect(() => {
        if (firebase.getCurrent()) {
            props.history.replace('/dashboard')
        }
    })

    return (
        <div>
            <form onSubmit={login} id="Login">
                <label>Email: </label>
                <input
                    type="email"
                    autoFocus
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email@email.com"
                />
                <label>Senha: </label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="*******"
                />
                <button type="submit">Entrar</button>
                <p>
                    Ainda não tem conta? <Link to="/register"> Cadastre-se </Link>
                </p>
            </form>
        </div>
    );
});
