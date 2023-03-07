import { GLOBALTYPES } from "./globalTypes";
import { POST_TYPES } from "./postActions";
import { postAPI } from "../../utils/fetchAPI";

export const createComment =
  ({ post, newComment, auth }) =>
  async (dispatch) => {
    const newPost = {
      ...post,
      comments: [...post.comments, newComment],
    };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      const data = {
        ...newComment,
        postId: post._id,
        postUserId: post.user._id,
      };
      const res = await postAPI("comment", data, auth.token);

      const newData = { ...res.data.newComment, user: auth.user };
      const newPost = {
        ...post,
        comments: [...post.comments, newData],
      };
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
