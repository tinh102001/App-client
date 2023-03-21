import React from "react";
import { NavDropdown } from "react-bootstrap";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import moment from "moment";

const PostHeader = ({ post }) => {
  return (
    <div className="card-header">
      <div className="header-container d-flex align-items-center">
        <Link to={`/profile/${post.user._id}`}>
          <div className="avatar-container">
            <img className="avatar" src={post.user.avatar} alt="avatar" />
          </div>
        </Link>
        <div className="content flex-grow-1">
          <Link
            to={`/profile/${post.user._id}`}
            style={{ "text-decoration": "none" }}
          >
            <span className="user-name">{post.user.username}</span>{" "}
          </Link>

          <span className="post-time">{moment(post.createdAt).fromNow()}</span>
        </div>
        <NavDropdown
          className="nav-dropdown-post"
          title={
            <div className="option-post">
              <FontAwesomeIcon icon={faEllipsis} />
            </div>
          }
          id="post-toggle"
        >
          <NavDropdown.Item>
            <span>Lưu liên kết</span>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <span>Bật thông báo về bài viết này</span>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <span>Nhúng</span>
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>
            <span>Ẩn bài viết</span>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <span>Bỏ theo dõi{post.user.username}</span>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <span>Báo cáo bài viết</span>
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </div>
  );
};

export default PostHeader;
