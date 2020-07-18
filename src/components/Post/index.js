import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useContext
} from "react";
import { useParams } from "react-router-dom";
import firebase from "../../firebase";
import "./post.css";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "like":
      return { count: state.count + 1 };
    case "dislike":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState([]);
  const [themeBtnTxt, setTxt] = useState('Darkmode')
  const [state, dispatch] = useReducer(reducer, initialState);
  const likeImg = useRef(null);
  const dislikeImg = useRef(null);
  const backgroundDiv = useRef(null)

  const themes = {
    light: {
      background: "#eeeeee"
    },
    dark: {
      background: "#222222"
    }
  };

  const LightThemeContext = React.createContext(themes.light);
  const DarkThemeContext = React.createContext(themes.dark)

  const LightTheme = useContext(LightThemeContext);
  const DarkTheme = useContext(DarkThemeContext);

  const onLikeClick = () => {
    dislikeImg.current.src =
      "https://img.icons8.com/ios/50/000000/thumbs-down.png";
    likeImg.current.src =
      "https://img.icons8.com/ios-filled/50/000000/thumb-up.png";

    dispatch({ type: "like" });
  };

  const onDislikeClick = () => {
    likeImg.current.src = "https://img.icons8.com/ios/50/000000/thumb-up.png";
    dislikeImg.current.src =
      "https://img.icons8.com/ios-filled/50/000000/thumbs-down.png";

    dispatch({ type: "dislike" });
  };

  useEffect(() => {
    firebase.app.ref("posts").once("value", snapshot => {
      snapshot.forEach(childItem => {
        if (childItem.key === postId) {
          setPost({
            key: childItem.key,
            description: childItem.val().description,
            author: childItem.val().author,
            title: childItem.val().title,
            image: childItem.val().image
          });
        }
      });
    });
  }, []);

  const changeTheme = () => {
    if(themeBtnTxt === 'Darkmode'){
      backgroundDiv.current.style.background = DarkTheme.background
      backgroundDiv.current.style.color = '#ffffff'
      setTxt('Lightmode')
    } else {
      backgroundDiv.current.style.background = LightTheme.background
      backgroundDiv.current.style.color = '#000000'
      setTxt('Darkmode')
    }
  };

  return (
    <div ref={backgroundDiv} style={{ background: LightTheme.background }}>
      <button id="change-theme" onClick={changeTheme}>{themeBtnTxt}</button>
      <div id="post">
        <div id="title">
          <strong id="post-title">{post.title}</strong>
          <span id="post-author">Autor: {post.author}</span>
        </div>
        <img id="post-image" src={post.image} alt="" />
        <div id="post-content">
          <p>{post.description}</p>
        </div>
        <div id="rating">
          <div id="like">
            <img
              ref={likeImg}
              onClick={onLikeClick}
              src="https://img.icons8.com/ios/50/000000/thumb-up.png"
            ></img>
            <span>{state.count}</span>
          </div>
          <div id="dislike">
            <img
              ref={dislikeImg}
              onClick={onDislikeClick}
              src="https://img.icons8.com/ios/50/000000/thumbs-down.png"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
