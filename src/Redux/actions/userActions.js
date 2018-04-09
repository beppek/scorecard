import Firebase from '../../Firebase/Firebase';

export function getScores(dispatch, userId) {
  return Firebase.getScores(userId, data => {
    dispatch({
      type: 'RECEIVE_USER_SCORES',
      data
    });
  });
}