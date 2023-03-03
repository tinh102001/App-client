import React from "react";
import SpinLoader from "../Loading/SpinLoader";
const PostGallery = ({ posts }) => {
  return (
    <div>
      {posts ? (
        posts.map((post) => (
          <div key={post._id}>
            {post.content}
            <img src={post.images[0].url} alt={post.images[0].url} />
          </div>
        ))
      ) : (
        <SpinLoader />
      )}
    </div>
  );
};

export default PostGallery;
