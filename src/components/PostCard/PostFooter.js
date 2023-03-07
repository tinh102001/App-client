import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { likePost, unLikePost } from "../../redux/actions/postActions";
import LikeButton from "../Button/LikeButton";

const PostFooter = ({ post }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

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
  return (
    <div>
      <div> Post Footer </div>
      <div>
        <LikeButton
          isLike={isLike}
          handleLike={handleLike}
          handleUnLike={handleUnLike}
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
