import app from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/analytics";

let firebaseConfig = {
  apiKey: "x",
  authDomain: "X",
  databaseURL: "X",
  projectId: "X",
  storageBucket: "X",
  messagingSenderId: "X",
  appId: "X",
  measurementId: "X"
};

export default new (class Firebase {
  constructor() {
    // Initialize Firebase
    app.initializeApp(firebaseConfig);
    app.analytics();
    this.app = app.database();
  }

  login(email, password) {
    return app.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    return app.auth().signOut();
  }

  async register(name, email, password) {
    await app.auth().createUserWithEmailAndPassword(email, password);
    const uid = app.auth().currentUser.uid;

    return app
      .database()
      .ref("users")
      .child(uid)
      .set({
        name: name,
        role: "user"
      });
  }

  firebaseInitialized() {
    return new Promise(resolve => {
      app.auth().onAuthStateChanged(resolve);
    });
  }

  getCurrent() {
    return app.auth().currentUser && app.auth().currentUser.email;
  }

  async getUserInfo(callback) {
    if (app.auth().currentUser) {
      const uid = app.auth().currentUser.uid;

      await app
        .database()
        .ref("users")
        .child(uid)
        .once("value")
        .then(callback);
    }
  }

  async makePost(author, title, image, description) {
    let key = app
      .database()
      .ref("posts")
      .push().key;

    await app
      .database()
      .ref("posts")
      .child(key)
      .set({
        title: title,
        image: image,
        author: author,
        description: description
      });
  }
})();
