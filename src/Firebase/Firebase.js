import firebase from 'firebase';
import config from './config';

class Firebase {
  init() {
    firebase.initializeApp(config);
  }

  authState(callback) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          refreshToken: user.refreshToken,
          uid: user.uid
        });
      } else {
        callback(null);
      }
    });
  }

  signInWithGoogle() {
    localStorage.setItem('loggingIn', true);
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    firebase.auth().signInWithRedirect(provider);
  }

  signout() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getRedirectResult() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .getRedirectResult()
        .then(result => {
          if (!result.user) {
            reject('no user');
          }
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  get(ref, callback) {
    const db = firebase.database().ref(ref);
    db.on('value', snap => {
      callback(snap.val());
    });
  }

  getRounds(ref, callback) {
    const db = firebase.database().ref(ref);
    db.on('value', snap => {
      let data = [];
      snap.forEach(child => {
        data.push({
          key: child.key,
          value: child.val()
        });
      });
      callback(data);
    });
  }

  getAllCourses(callback) {
    const db = firebase.database().ref('courses/');
    db.on('value', snap => {
      let data = [];
      snap.forEach(child => {
        data.push({
          key: child.key,
          value: child.val()
        });
      });
      callback(data);
    });
  }

  getCourseInfo(ref, callback) {
    const db = firebase.database().ref(`courses/${ref}/`);
    db.on('value', snap => {
      callback(snap.val());
    });
  }

  createRound(course, data, saveStats, callback) {
    const db = firebase.database().ref(`courses/${course.key}/rounds/`);
    const newRef = db.push();
    newRef.set({
      data
    });
    callback(newRef);
  }

  updateRound(user, roundKey, data, callback) {
    const db = firebase.database().ref(`users/${user.uid}/rounds`);
    const newRef = db.child(roundKey);
    newRef.set({
      data
    });
    callback(newRef);
  }
  
  getScores(userId, callback) {
    const db = firebase.database().ref(`users/${userId}/rounds`);
    db.on('value', snap => {
      let data = [];
      snap.forEach(child => {
        data.push({
          key: child.key,
          value: child.val()
        });
      });
      callback(data);
    });
  }
}

export default new Firebase();
