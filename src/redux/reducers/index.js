import { combineReducers } from "redux";
import auth from "./authReducer";
import homePosts from "./postReducer";
import profile from "./profileReducer";
import alert from "./alertReducer";
import explore from "./exploreReducer";
import detailPost from "./detailPostReducer";
import suggestions from './suggestionsReducer';

export default combineReducers({
  auth,
  homePosts,
  profile,
  alert,
  explore,
  detailPost,
  suggestions,
});
