import React, {  useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../redux/actions/postActions";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import CreatePostModal from "../Status/CreatePostModal";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const PostHeader = ({ post }) => {
  const copyUrl = async () => {
    await navigator.clipboard.writeText(`${window.location.href}post/${post._id}`);
  }
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [openPostModal, setOpenPostModal] = useState(false)
  const postDelete = async (e) => {
    dispatch(deletePost({post,auth}))
  }
  const openModal = async (e) => {
    setShow(true)
  }
  const handleClose = () => {
    setShow(false);
  };
  const handlePostClose = () => {
    setOpenPostModal(false);
    dispatch({ type: GLOBALTYPES.STATUS, payload: false})
  };
  const openPostModalClick = async () => {
    setOpenPostModal(true)
    dispatch({ type: GLOBALTYPES.STATUS, payload: {...post, onEdit: true}})
  }
  return (
    <>
    <ConfirmModal show={show} onClose={handleClose} onConfirm={postDelete}/>
    <CreatePostModal open={openPostModal} onClose={handlePostClose} auth={auth} socket={socket}/>
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
            style={{ "textDecoration": "none" }}
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
          {auth.user._id === post.user._id && 
          <NavDropdown.Item>
            <span onClick={()=>openPostModalClick()}>Chỉnh sửa bài viết</span>
          </NavDropdown.Item> }
          {auth.user._id === post.user._id && 
          <NavDropdown.Item>
            <span onClick={()=>openModal()}>Xoá bài viết</span>
          </NavDropdown.Item> }
          <NavDropdown.Item>
            <span onClick={()=>copyUrl()}>Lưu liên kết</span>
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
    </>
  );
};

export default PostHeader;
