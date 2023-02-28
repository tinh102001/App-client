import { postAPITest, postAPI } from "../../utils/fetchAPI";
import { imageUpload } from "../../utils/imagesUpload";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
};
// content : nội dung bài viết
// images : danh sách các ảnh của bài viết
// auth : token khi người dùng đăng nhập
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
    } catch (error) {
      console.log(error);
    }
  };

// Function test cho createPost
// Cài đặt tải ảnh ở createPost
export const createPostTest =
  ({ content }) =>
  async (dispatch) => {
    let media = [];
    try {
      media =
        "https://res.cloudinary.com/ductinh/image/upload/v1676095073/instagram/avatar_cugq40_q61cra.png";
      const res = await postAPITest("postsTest", { content, images: media });

      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: { ...res.data.newPost },
      });
    } catch (error) {
      console.log(error);
    }
  };
