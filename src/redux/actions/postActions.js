import { getAPI, postAPI, patchAPI } from "../../utils/fetchAPI";
import { imageUpload } from "../../utils/imagesUpload";
import { GLOBALTYPES } from "./globalTypes";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  GET_POSTS: "GET_POSTS",
  UPDATE_POST: "UPDATE_POST",
  LOADING_POST: "LOADING_POST",
};

export const createPost =
  ({ content, images, auth }) =>
  async (dispatch) => {
    let media = [];
    try {
      if (images.length > 0) media = await imageUpload(images);

      const res = await postAPI(
        "posts",
        { content, images: media },
        auth.token
      );

      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: { ...res.data.newPost, user: auth.user },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
    const res = await getAPI("posts", token);

    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: 2 },
    });

    dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const likePost =
  ({ post, auth }) =>
  async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      await patchAPI(`post/${post._id}/like`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unLikePost =
  ({ post, auth }) =>
  async (dispatch) => {
    const newPost = {
      ...post,
      likes: post.likes.filter((like) => like._id !== auth.user._id),
    };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      await patchAPI(`post/${post._id}/unlike`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
