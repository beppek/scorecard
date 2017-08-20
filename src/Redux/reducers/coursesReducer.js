const initialState = {
    courses: []
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case "RECEIVE_COURSES":
            return {
                ...state,
                courses: action.courses
            }
    
        default:
            return state;
    }
}