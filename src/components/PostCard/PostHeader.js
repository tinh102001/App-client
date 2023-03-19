import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";
import { NavDropdown } from "react-bootstrap";

const PostHeader = ({ post }) => {
  return (
    <div className="card-header">
      <div className="header-container d-flex align-items-center">
        <div className="avatar-container">
          <img className="avatar" src={post.user.avatar} alt="avatar" />
        </div>
        <div className="content flex-grow-1">
          <span className="user-name">{post.user.username}</span>
          <span className="post-time">
            {moment(post.createdAt).startOf("hour").fromNow()}
          </span>
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
