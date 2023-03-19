import React from "react";
import { useNavigate } from "react-router-dom";

const PostGallery = ({ posts }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/post/${id}`)
  };
  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto"}}>
      <div style={{display: "inline-flex", flexWrap: "wrap", marginLeft: "auto", marginRight: "auto", alignItems: "center", justifyContent: "center"}}>
        {posts.length !== 0 ? (
          posts.map((post) => (
            <div key={post._id} onClick={() => handleClick(post._id)}>
              {/* {post.content} */}
              <img 
                src={post.images[0].url} 
                alt={post.images[0].url} 
                style={{width: 320, height: 320, margin: 20}}
              />
            </div>
          ))
        ) : (
          <div style={{marginTop: 20}}>No Post</div>
        )}
      </div>
    </div>
  );
};

export default PostGallery;
