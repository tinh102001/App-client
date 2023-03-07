import React from "react";

const PostBody = ({ post }) => {
  return (
    <div>
      <div>Post Body</div>
      <div>Nội dung : {post.content}</div>
      <img src={post.images[0].url} alt={post.images[0].url} />
    </div>
  );
};

export default PostBody;
