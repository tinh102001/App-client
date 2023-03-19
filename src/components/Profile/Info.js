import React, { useState, useEffect } from "react";
import { Button } from "antd";

import FollowButton from "../Button/FollowButton";

const Info = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([]);

  const [isShowFollowers, setIsShowFollowers] = useState(false);
  const [isShowFollowing, setIsShowFollowing] = useState(false);
  const [isShowEditProfile, setIsShowEditProfile] = useState(false);
  const [isShowSaved, setIsShowSaved] = useState(false);

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

  //   useEffect(() => {
  //     if (showFollowers || showFollowing || onEdit) {
  //       dispatch({ type: GLOBALTYPES.MODAL, payload: true });
  //     } else {
  //       dispatch({ type: GLOBALTYPES.MODAL, payload: false });
  //     }
  //   }, [showFollowers, showFollowing, onEdit, dispatch]);

  return (
    <div className="info">
      {userData.map((user) => (
        <div className="myprofile-container" key={user._id}>
          <div className="header-profile">
            <div className="avatar-container">
              <img className="avatar" src={user.avatar} alt="Ảnh đại diện" />
              {id === auth.user._id ? (
                <Button
                  className="editprofile"
                  type="primary"
                  onClick={() => setIsShowEditProfile(true)}
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
            <div className="saved" onClick={() => setIsShowSaved(true)}>
              Đã lưu: {user.saved.length} đã lưu
            </div>
          </div>
          {isShowEditProfile && (
            <div className="back-form">
              <div className="modal-form"></div>
              <div className="container-form">
                <Button
                  type="primary"
                  danger
                  onClick={() => setIsShowEditProfile(false)}
                >
                  Thoát
                </Button>
              </div>
            </div>
          )}
          {isShowFollowers && (
            <div className="back-form">
              <div className="modal-form"></div>
              <div className="container-form">
                <Button
                  type="primary"
                  danger
                  onClick={() => setIsShowFollowers(false)}
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
                <Button
                  type="primary"
                  danger
                  onClick={() => setIsShowFollowing(false)}
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
                <Button
                  type="primary"
                  danger
                  onClick={() => setIsShowSaved(false)}
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
