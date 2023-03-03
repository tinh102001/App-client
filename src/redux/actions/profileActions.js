import { GLOBALTYPES } from "./globalTypes";
import { getAPI } from "../../utils/fetchAPI";
//import { imageUpload } from "../../utils/imagesUpload";

export const PROFILE_TYPES = {
  LOADING: "LOADING_PROFILE",
  GET_ID: "GET_PROFILE_ID",
  GET_POSTS: "GET_PROFILE_POSTS",
  GET_USER: "GET_PROFILE_USER",
  UPDATE_POST: "UPDATE_PROFILE_POST",
};

export const getProfileUsers =
  ({ id, auth }) =>
  async (dispatch) => {
    dispatch({ type: PROFILE_TYPES.GET_ID, payload: id });

    try {
      dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
      const resUsers = getAPI(`user/${id}`, auth.token);
      const resPosts = getAPI(`user_posts/${id}`, auth.token);

      const users = await resUsers;
      const posts = await resPosts;

      dispatch({
        type: PROFILE_TYPES.GET_USER,
        payload: users.data,
      });

      dispatch({
        type: PROFILE_TYPES.GET_POSTS,
        payload: { ...posts.data, _id: id, page: 1 },
      });

      dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
