import React from "react";
import { Carousel } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const PostBody = ({ post }) => {
  return (
    <div className="post-body">
      <div className="post-content">{post.content}</div>
      <div className="post-images">
        <Carousel
        // nextIcon={
        //   <Button
        //     style={{
        //       display: post.images.length < 2 ? "none" : "unset",
        //     }}
        //   >
        //     <FontAwesomeIcon icon={faArrowRight} />
        //   </Button>
        // }
        // prevIcon={
        //   <Button
        //     disabled={post.images < 2}
        //     style={{
        //       display: post.images < 2 ? "none" : "unset",
        //     }}
        //   >
        //     <FontAwesomeIcon icon={faArrowLeft} />
        //   </Button>
        // }
        >
          {post.images.map((img, i) => {
            return (
              <Carousel.Item key={i} className="img-post">
                <img src={img.url} alt={img.url} />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default PostBody;
