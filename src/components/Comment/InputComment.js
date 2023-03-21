import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/commentActions";
import "./Style/InputComment.scss";

const InputComment = ({ post, children, onReply, setOnReply }) => {
  const [content, setContent] = useState("");

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    setContent("");
    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    dispatch(createComment({ post, newComment, auth }));
    if (setOnReply) return setOnReply(false);
  };

  const handleKeyDown = (evt) => {
    evt.target.style.height = "inherit";
    evt.target.style.height = `${evt.target.scrollHeight}px`;
    if (content === "") evt.target.style.height = `40px`;
  };

  return (
    <div className="container-comment">
      <img className="avatar" src={auth.user.avatar} alt="avatar" />
      {children}
      <textarea
        className="comment-input"
        id="comment-input"
        placeholder={`Viết bình luận công khai`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            handleSubmit(e);
            setContent("");
          }
        }}
      />
    </div>
  );
};

export default InputComment;
