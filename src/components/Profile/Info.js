import React, { useState, useEffect } from "react";
import { Button } from "antd";
import FollowButton from "../Button/FollowButton";
import UserFollow from "../UserFollow/UserFollow";
import Alert from "../Alert/Alert";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Info = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([]);
  const {socket} = useSelector((state) => state)
  const [isShowFollowers, setIsShowFollowers] = useState(false);
  const [isShowFollowing, setIsShowFollowing] = useState(false);
  const [isShowSaved, setIsShowSaved] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);
    
    const handleClose = () => {
        setOpenPostModal(false);
    };

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const data = profile.users.filter((user) => user._id === id);
      let newData = data.filter(
        (ele, ind) =>
          ind ===
          data.findIndex(
            (elem) => elem.jobid === ele.jobid && elem.id === ele.id
          )
      );
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  const handleClickEvent = () => {
    setIsShowFollowers(false);
    setIsShowFollowing(false)
  }

  //   useEffect(() => {
  //     if (showFollowers || showFollowing || onEdit) {
  //       dispatch({ type: GLOBALTYPES.MODAL, payload: true });
  //     } else {
  //       dispatch({ type: GLOBALTYPES.MODAL, payload: false });
  //     }
  //   }, [showFollowers, showFollowing, onEdit, dispatch]);

  return (
    <div className="info">
      <EditProfile open={openPostModal} onClose={handleClose} auth={auth} socket={socket}/>
      <Alert />
      {userData.map((user) => (
        <div className="myprofile-container" key={user._id}>
          <div className="header-profile">
            <div className="avatar-container">
              <img className="avatar" src={user.avatar} alt="Ảnh đại diện" />
              {id === auth.user._id ? (
                <Button
                  className="editprofile"
                  type="primary"
                  onClick={() => setOpenPostModal(true)}
                >
                  {/* <EditOutlined /> */}
                  Chỉnh sửa trang cá nhân
                </Button>
              ) : (
                <FollowButton user={user} />
              )}
            </div>
            <div className="main">
              <div className="name">
                <h1>{user.username}</h1>
              </div>
              <div className="follow">
                <div
                  className="followers"
                  onClick={() => setIsShowFollowers(true)}
                >
                  {user.followers.length} người theo dõi
                </div>
                <div
                  className="following"
                  onClick={() => setIsShowFollowing(true)}
                >
                  Đang theo dõi {user.following.length} người dùng
                </div>
              </div>
              <div className="fullname">Tên đầy đủ: {user.fullname}</div>
            </div>
          </div>
          <div className="info-user">
            <div className="address">Địa chỉ: {user.address}</div>
            <div className="mobile">Số điện thoại: {user.mobile}</div>
            <div className="gender">Giới tính: {user.gender}</div>
            <div className="story">Tiểu sử: {user.story}</div>
            <div className="website">Trang web: <a href={user.website}>{user.website}</a></div>
            {/* <div className="saved" onClick={() => setIsShowSaved(true)}>
              Đã lưu: {user.saved.length} đã lưu
            </div> */}
          </div>
          {isShowFollowers && (
            <div className="back-form">
              <div className="modal-form"></div>
              <div className="container-form">
                <h3>Người theo dõi</h3>
                <div style={{ height: '200px', overflowY: 'scroll' }}>
                  {user.followers.map(item => (
                    <UserFollow user = {item} event={{ onClick: handleClickEvent }} />
                  ))}
                </div>
                <Button
                  type="primary"
                  danger
                  onClick={() => setIsShowFollowers(false)}
                  style={{position: "absolute", right: 10, bottom: 10}}
                >
                  Thoát
                </Button>
              </div>
            </div>
          )}
          {isShowFollowing && (
            <div className="back-form">
              <div className="modal-form"></div>
              <div className="container-form">
              <h3>Đang theo dõi</h3>
              <div style={{ height: '200px', overflowY: 'scroll' }}>
                  {user.following.map(item => (
                    <UserFollow user = {item} event={{ onClick: handleClickEvent }}/>
                  ))}
                </div>
                <Button
                  type="primary"
                  danger
                  onClick={() => setIsShowFollowing(false)}
                  style={{position: "absolute", right: 10, bottom: 10}}
                >
                  Thoát
                </Button>
              </div>
            </div>
          )}
          {isShowSaved && (
          <div className="back-form">
            <div className="modal-form"></div>
            <div className="container-form">
            <h3>Đang theo dõi</h3>
            <div style={{ height: '200px', overflowY: 'scroll' }}>
                {user.saved.map(item => (
                  <UserFollow user = {item} event={{ onClick: handleClickEvent }}/>
                ))}
              </div>
              <Button
                type="primary"
                danger
                onClick={() => setIsShowSaved(false)}
                style={{position: "absolute", right: 10, bottom: 10}}
              >
                Thoát
              </Button>
            </div>
          </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Info;
