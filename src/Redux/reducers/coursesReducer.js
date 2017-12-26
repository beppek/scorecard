const initialState = {
    courses: [],
    courseInfo: {},
    createdRound: null,
    user: null,
    rounds: []
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case "RECEIVE_COURSES":
            return {
                ...state,
                courses: action.courses
            }
        case "RECEIVE_COURSE_INFO":
            return {
                ...state,
                courseInfo: action.data
            }
        case "CREATE_ROUND":
            return {
                ...state,
                createdRound: action.data
            }
        case "AUTH_STATE_CHANGED":
            return {
                ...state,
                user: action.user,
                loggedIn: action.user ? true : false
            }

        case "RECEIVE_ROUNDS":
            return {
                ...state,
                rounds: action.data
            }

        default:
            return state;
    }
}