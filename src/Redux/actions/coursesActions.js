import Firebase from '../../Firebase/Firebase';

export function getAllCourses(dispatch) {
  Firebase.getAllCourses(courses => {
    dispatch({
      type: 'RECEIVE_COURSES',
      courses
    });
  });
}

export function getCourseInfo(dispatch, course) {
  return Firebase.getCourseInfo(course, data => {
    dispatch({
      type: 'RECEIVE_COURSE_INFO',
      data
    });
  });
}

export function createRound(dispatch, course, data, saveStats) {
  return Firebase.createRound(course, data, saveStats, ref => {
    dispatch({
      type: 'CREATE_ROUND',
      data: ref
    });
  });
}

export function getFromDB(dispatch, ref) {
  return Firebase.get(ref, data => {
    dispatch({
      type: 'RECEIVE_DATA',
      data
    });
  });
}

export function getRounds(dispatch, ref) {
  return Firebase.getRounds(ref, data => {
    dispatch({
      type: 'RECEIVE_ROUNDS',
      data
    });
  });
}

export function authState(dispatch) {
  return Firebase.authState(user => {
    dispatch({
      type: 'AUTH_STATE_CHANGED',
      user
    });
  });
}

export function getRound(dispatch, courseKey, roundKey) {
  return Firebase.get(`courses/${courseKey}/rounds/${roundKey}`, data => {
    // console.log(data);
    dispatch({
      type: 'RECEIVE_ROUND',
      data
    });
  });
}

export function updateRound(dispatch, user, roundKey, scorecard) {
  return Firebase.updateRound(user, roundKey, scorecard, data => {
    console.log(data);
    dispatch({
      type: 'UPDATE_ROUND',
      data
    });
  });
}
