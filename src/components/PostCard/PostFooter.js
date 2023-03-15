import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  likePost,
  unLikePost,
  savePost,
  unSavePost,
} from "../../redux/actions/postActions";
import LikeButton from "../Button/LikeButton";
import SaveButton from "../Button/SaveButton";

const PostFooter = ({ post }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  //console.log(post);
  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  const handleLike = async (e) => {
    e.preventDefault();
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(likePost({ post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async (e) => {
    e.preventDefault();
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(unLikePost({ post, auth }));
    setLoadLike(false);
  };

  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.saved, post._id]);

  const handleSavePost = async (e) => {
    e.preventDefault();
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSavePost = async (e) => {
    e.preventDefault();
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };
  return (
    <div>
      <div> Post Footer </div>
      <div>
        <LikeButton
          isLike={isLike}
          handleLike={handleLike}
          handleUnLike={handleUnLike}
        />
        <SaveButton
          isSaved={saved}
          handleSavePost={handleSavePost}
          handleUnSavePost={handleUnSavePost}
        />
      </div>
      <div>
        <h6>{post.likes.length} likes</h6>

        <h6>{post.comments.length} comments</h6>
      </div>
    </div>
  );
};

export default PostFooter;
