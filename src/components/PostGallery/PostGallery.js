import React from "react";

const PostGallery = ({ posts }) => {
  return (
    <div>
      {posts.length !== 0 ? (
        posts.map((post) => (
          <div key={post._id}>
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
