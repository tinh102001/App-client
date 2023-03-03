import React from "react";
import SpinLoader from "../Loading/SpinLoader";
const ProfilePost = ({ posts }) => {
  //console.log(profile);
  // console.log(profile.posts[0]);
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

export default ProfilePost;
