import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import SVG from "react-inlinesvg";

import { likeComment, unLikeComment } from "../../redux/actions/commentActions";

import InputComment from "./InputComment";

const CommentCard = ({ children, comment, post, commentId }) => {
  const { auth, socket } = useSelector((state) => state);
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
    await dispatch(likeComment({ comment, post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);

    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth, socket }));
    setLoadLike(false);
  };

  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };
  return (
    <div className="comment-card">
      <div className="comment-container-first">
        <Link to={`/profile/${comment.user._id}`}>
          <div className="avatar-container">
            <img className="avatar" src={comment.user.avatar} alt="avatar" />
          </div>
        </Link>

        <div className="container">
          <div className="d-flex align-items-center gap-2">
            <div className="content-comment ">
              <Link
                to={`/profile/${comment.user._id}`}
                style={{ textDecoration: "none", color: "#000" }}
              >
                <div className="user-comment">{comment.user.username}</div>
              </Link>
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
                <span
                  onClick={() => setReadMore(!readMore)}
                  className="edit-text"
                >
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
                <span>
                  {comment.likes.length > 0 ? comment.likes.length : ""}
                </span>
              </div>
            </div>
            <div className="option-comment-nav-down">
              <NavDropdown
                className="nav-dropdown-comment"
                title={
                  <div className="option-comment">
                    <FontAwesomeIcon icon={faEllipsis} />
                  </div>
                }
                id="comment-toggle"
              >
                {auth.user._id === comment.user._id ? (
                  <>
                    <NavDropdown.Item>
                      <span onClick={() => dispatch({ type: GLOBALTYPES.CONFIRM, payload: {comment: comment, action: 'Xoá bình luận'}})}>Chỉnh sửa</span>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <span>Xóa</span>
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item>
                      <span>Ẩn bình luận </span>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <span>Báo cáo bình luận</span>
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </div>
          </div>

          <div className="footer-comment">
            {isLike ? (
              <small
                className="tool-footer like-comment"
                onClick={(e) => {
                  handleUnLike(e);
                }}
              >
                Bỏ thích
              </small>
            ) : (
              <small
                className="tool-footer like-comment"
                onClick={(e) => {
                  handleLike(e);
                }}
              >
                Thích
              </small>
            )}
            <small className="tool-footer feedback" onClick={handleReply}>
              {onReply ? "Hủy" : "Phản hồi"}
            </small>
            <small className="tool-footer time-comment">
              {moment(comment.createdAt).fromNow()}
            </small>
          </div>
        </div>
      </div>
      {onReply && (
        <InputComment
          post={post}
          onReply={onReply}
          setOnReply={setOnReply}
        ></InputComment>
      )}
      <div className="comment-feedback">{children}</div>
    </div>
  );
};

export default CommentCard;
