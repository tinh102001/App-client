import { combineReducers } from "redux";
import auth from "./authReducer";
import homePosts from "./postReducer";
import alert from "./alertReducer";

export default combineReducers({ auth, homePosts, alert });
