import Firebase from '../../Firebase/Firebase';

export function getAllCourses(dispatch) {
    Firebase.getAllCourses((courses => {
        dispatch({
            type: "RECEIVE_COURSES",
            courses
        });
    }));
}