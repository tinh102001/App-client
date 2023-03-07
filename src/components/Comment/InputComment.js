import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/commentActions";
// import Icons from '../Icons'

const InputComment = ({ post }) => {
  const [content, setContent] = useState("");

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
    };

    dispatch(createComment({ post, newComment, auth }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add your comments..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="submit">Post</button>
    </form>
  );
};

export default InputComment;
