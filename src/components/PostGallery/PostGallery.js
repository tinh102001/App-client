import React from "react";
import { useNavigate } from "react-router-dom";

const PostGallery = ({ posts, result }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/post/${id}`);
  };

  if (result === 0)
    return <div style={{ marginTop: 20 }}>Không có bài viết nào</div>;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          flexWrap: "wrap",
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {posts.map((post) => (
          <div key={post._id} onClick={() => handleClick(post._id)}>
            {/* {post.content} */}
            <img
              src={post.images[0].url}
              alt={post.images[0].url}
              style={{ width: 320, height: 320, margin: 20 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostGallery;
