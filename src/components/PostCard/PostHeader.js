import React from "react";

const PostHeader = ({ post }) => {
  return (
    <div>
      <div>Post Header</div>
      <div> Tên người dùng : {post.user.username}</div>
    </div>
  );
};

export default PostHeader;
