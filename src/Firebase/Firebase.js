import firebase from "firebase";
import * as config from "./config";

export default class Firebase {
  init() {
    firebase.initializeApp(config);
  }
}