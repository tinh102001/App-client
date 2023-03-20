import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import SVG from "react-inlinesvg";
import InputComment from "./InputComment";

const CommentCard = ({ children, comment, post }) => {
  const { auth } = useSelector((state) => state);

  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setOnReply(false);
  }, [comment, auth.user._id]);
  return (
    <div className="comment-card">
      <Link to={`/profile/${comment.user._id}`}>
        <div className="avatar-container">
          <img className="avatar" src={comment.user.avatar} alt="avatar" />
        </div>
      </Link>

      <div className="container">
        <div className="content-comment ">
          {comment.tag && comment.tag._id !== comment.user._id && (
            <Link to={`/profile/${comment.tag._id}`} className="mr-1">
              @{comment.tag.username}
            </Link>
          )}
          <div className="user-comment">{comment.user.username}</div>
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
          <small className="tool-footer like-comment">Thích</small>
          <small className="tool-footer feedback">Phản hồi</small>
          <small className="tool-footer time-comment">
            {moment(comment.createdAt).fromNow()}
          </small>
        </div>
      </div>

      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link to={`/profile/${onReply.user._id}`} className="mr-1">
            @{onReply.user.username}:
          </Link>
        </InputComment>
      )}

      {children}
    </div>
  );
};

export default CommentCard;
