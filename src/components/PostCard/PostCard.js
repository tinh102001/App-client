import React from "react";

import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import InputComment from "../Comment/InputComment";
import Comments from "../Comment/Comment";
import "./Style/style.scss";

const PostCard = ({ posts }) => {
  console.log(posts);
  return (
    <div className="posts-card">
      {posts.map((post) => (
        <div key={post._id} className="post">
          <PostHeader post={post} />
          <PostBody post={post} />
          <PostFooter post={post} />
          <Comments post={post} />
          <InputComment post={post} />
        </div>
      ))}
    </div>
  );
};

export default PostCard;
