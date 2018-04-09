const initialState = {
  scores: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_USER_SCORES':
      return {
        ...state,
        scores: action.data
      }
    default:
      return state;
  }
}