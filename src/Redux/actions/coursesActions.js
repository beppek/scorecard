import Firebase from '../../Firebase/Firebase';

export function getAllCourses(dispatch) {
    Firebase.getAllCourses((courses => {
        dispatch({
            type: "RECEIVE_COURSES",
            courses
        });
    }));
}

export function getCourseInfo(dispatch, course) {
    return Firebase.getCourseInfo(course, (data) => {
        dispatch ({
            type: "RECEIVE_COURSE_INFO",
            data
        });
    });
}

export function saveRound(dispatch, course, data) {
    return Firebase.saveRound(course, data, (ref) => {
        dispatch({
            type: "SAVE_ROUND",
            data: ref
        });
    });
}

export function getFromDB(dispatch, ref) {
    return Firebase.get(ref, (data) => {
        dispatch({
            type: "RECEIVE_DATA",
            data
        });
    });
}

export function authState(dispatch) {
    return Firebase.authState((user) => {
        dispatch({
            type: "AUTH_STATE_CHANGED",
            user
        });
    });
}