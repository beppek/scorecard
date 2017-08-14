import firebase from "firebase";
import * as config from "./firebaseConfig";

export default class Firebase {
  init() {
    firebase.initializeApp(config);
  }
}