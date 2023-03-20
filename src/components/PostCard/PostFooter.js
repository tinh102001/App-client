import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import { useSelector, useDispatch } from "react-redux";

import {
  likePost,
  unLikePost,
  savePost,
  unSavePost,
} from "../../redux/actions/postActions";

const PostFooter = ({ post }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

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

  const handleUnSavePost = (e) => {
    e.preventDefault();
    if (saveLoad) return;
    setSaveLoad(true);
    dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };

  return (
    <div className="post-footer">
      <div className="number-details">
        <div className="number-likes">
          <SVG
            src={process.env.PUBLIC_URL + "/icons/icon-like.svg"}
            alt="like"
          />
          <span>{post.likes.length}</span>
        </div>
        <div className="number-comments">
          <span>{post.comments.length}</span>
          <span className="icon-comment"></span>
        </div>
      </div>
      <div className="tools-post">
        <div
          className={`tool like-post ${isLike ? "icon-unlike" : "icon-like"}`}
          onClick={(e) => {
            if (!isLike) handleLike(e);
            else handleUnLike(e);
          }}
        >
          <span className={`like-icon`}></span>
          {isLike ? (
            <span className="like">Bỏ thích</span>
          ) : (
            <span className="like">Thích</span>
          )}
        </div>
        <div className="tool comment-post">
          <span className="icon-comment"></span>
          <span className="like">Bình luận</span>
        </div>
        <div
          className="tool save-post"
          onClick={(e) => {
            if (!saved) handleSavePost(e);
            else handleUnSavePost(e);
          }}
        >
          <span className="icon-comment"></span>
          <FontAwesomeIcon
            icon={faBookmark}
            className={`${saved ? "icon-save" : "icon-un-save"}`}
          />
          {saved ? (
            <span className="save">Bỏ lưu bài viết</span>
          ) : (
            <span className="save">Lưu bài viết</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostFooter;
