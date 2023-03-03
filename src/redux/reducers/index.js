import { combineReducers } from "redux";
import auth from "./authReducer";
import homePosts from "./postReducer";
import profile from "./profileReducer";
import alert from "./alertReducer";

export default combineReducers({ auth, homePosts, profile, alert });
