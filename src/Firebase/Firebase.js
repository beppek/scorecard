import firebase from "firebase";
import config from "./config";

class Firebase {

  init() {
    firebase.initializeApp(config);
  }

  signInWithGoogle() {
    localStorage.setItem("loggingIn", true);
    const provider = new firebase
      .auth
      .GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    firebase
      .auth()
      .signInWithRedirect(provider);
  }

  signout() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getRedirectResult() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .getRedirectResult()
        .then((result) => {
          if (!result.user) {
            reject("no user");
          }
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getAllCourses() {
    return new Promise((resolve, reject) => {
      const db = firebase.database().ref("courses/");
      db.on("value", (snap) => {
        let data = [];
        snap.forEach(child => {
          data.push({
            key: child.key,
            value: child.val()
          });
        })
        resolve(data);
      });
    });
  }

}

export default new Firebase();