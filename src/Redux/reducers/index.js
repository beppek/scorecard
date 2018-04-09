import { combineReducers } from "redux";
import courses from "./coursesReducer";
import user from "./userReducer";

export default combineReducers({
  courses,
  user
});