import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import "./newpost.css";
import firebase from "../../firebase";

export default withRouter(function NewPost(props) {
    const [description, setDescription] = React.useState();
    const [image, setImage] = React.useState();
    const [title, setTitle] = React.useState();
    const [author, setAuthor] = React.useState();

    const newpost = React.useCallback(e => {
        e.preventDefault();

        if (author !== "" && title !== "" && description !== "" && image !== "") {
            firebase.makePost(author, title, image, description);
            props.history.push("/dashboard");
        } else {
            alert("Todos os campos são obrigatórios");
        }
    }, [author, description, image, props.history, title]
    )

    useEffect(() => {
        if (!firebase.getCurrent()) {
            props.history.replace("/login");
        }
        firebase.getUserInfo(info => {
            setAuthor(info.val().name);
            if (info.val().role !== "admin") {
                props.history.push("/dashboard");
            }
        });
    });

    return (
        <div>
            <header id="Newpost">
                <Link to="/dashboard">Voltar</Link>
            </header>
            <form onSubmit={newpost} id="Newpost">
                <label>Título: </label>
                <input
                    type="text"
                    placeholder="Titulo do Post"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    autoFocus
                />
                <label>Imagem: </label>
                <input
                    type="text"
                    placeholder="Url da capa"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                />
                <label>Descrição: </label>
                <textarea
                    type="text"
                    rows="10"
                    placeholder="Descrição do post"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
});
