import firebase from "firebase";
import config from "./config";

class Firebase {

  init() {
    firebase.initializeApp(config);
  }

  signInWithGoogle() {
    localStorage.setItem("loggingIn", true);
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    firebase.auth().signInWithRedirect(provider);
  }

  getRedirectResult() {
    return new Promise((resolve, reject) => {
      firebase.auth().getRedirectResult().then((result) => {
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

}

export default new Firebase();