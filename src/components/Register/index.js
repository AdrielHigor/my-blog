import "./register.css";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../firebase";


export default withRouter(function Register(props) {
    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    useEffect(() => {
        if (firebase.getCurrent()) {
            props.history.replace('/dashboard')
        }
    })

    const register = React.useCallback(
        async e => {
            e.preventDefault();

            try {
                await firebase.register(name, email, password);
                props.history.replace("/dashboard");
            } catch (error) {
                alert(error.message);
            }
        },
        [name, email, password]
    );

    return (
        <div>
            <form onSubmit={register} id="Register">
                <label>Nome:</label>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoFocus
                    placeholder="Nome de usuário"
                />
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email@email.com"
                />
                <label>Senha:</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="*******"
                />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
});
