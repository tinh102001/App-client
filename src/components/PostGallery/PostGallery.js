import React from "react";
import { useNavigate } from "react-router-dom";

const PostGallery = ({ posts }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/post/${id}`)
  };
  return (
    <div>
      {posts.length !== 0 ? (
        posts.map((post) => (
          <div key={post._id} onClick={() => handleClick(post._id)}>
            {post.content}
            <img src={post.images[0].url} alt={post.images[0].url} />
          </div>
        ))
      ) : (
        <div>No Post</div>
      )}
    </div>
  );
};

export default PostGallery;
