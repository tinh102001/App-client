import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import SVG from "react-inlinesvg";
import InputComment from "./InputComment";

import { likeComment, unLikeComment } from "../../redux/actions/commentActions";

const CommentCard = ({ children, comment, post, commentId }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setOnReply(false);
    setIsLike(false);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);

    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);

    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };
  return (
    <div className="comment-card">
      <Link to={`/profile/${comment.user._id}`}>
        <div className="avatar-container">
          <img className="avatar" src={comment.user.avatar} alt="avatar" />
        </div>
      </Link>

      <div className="container">
        <div className="content-comment ">
          <div className="user-comment">{comment.user.username}</div>
          {comment.tag && comment.tag._id !== comment.user._id && (
            <Link to={`/profile/${comment.tag._id}`} className="mr-1">
              @{comment.tag.username}
            </Link>
          )}
          <span className="content">
            {content.length < 100
              ? content
              : readMore
              ? content + " "
              : content.slice(0, 100) + "...."}
          </span>
          {content.length > 100 && (
            <span onClick={() => setReadMore(!readMore)} className="edit-text">
              {readMore ? "ẩn đi" : "xem thêm"}
            </span>
          )}
          <div className="number-like-comment">
            {comment.likes.length > 0 && (
              <SVG
                src={process.env.PUBLIC_URL + "/icons/icon-like.svg"}
                alt="like"
              />
            )}
            <span>{comment.likes.length > 0 ? comment.likes.length : ""}</span>
          </div>
        </div>

        <div className="footer-comment">
          <div
            onClick={(e) => {
              if (!isLike) handleLike(e);
              else handleUnLike(e);
            }}
          >
            {isLike ? (
              <small className="tool-footer like-comment">Bỏ thích</small>
            ) : (
              <small className="tool-footer like-comment">Thích</small>
            )}
          </div>
          <small className="tool-footer feedback" onClick={handleReply}>
            {onReply ? "Hủy" : "Phản hồi"}
          </small>
          <small className="tool-footer time-comment">
            {moment(comment.createdAt).fromNow()}
          </small>
        </div>
      </div>

      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link to={`/profile/${onReply.user._id}`}>
            @{onReply.user.username}:
          </Link>
        </InputComment>
      )}

      {children}
    </div>
  );
};

export default CommentCard;
