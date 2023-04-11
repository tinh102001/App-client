import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";

import FollowButton from "../Button/FollowButton";
import UserFollow from "../UserFollow/UserFollow";
import Alert from "../Alert/Alert";
import EditProfile from "./EditProfile";
import Avatar from "../Avatar/Avatar";

const Info = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([]);
  const { socket } = useSelector((state) => state);
  const [isShowFollowers, setIsShowFollowers] = useState(false);
  const [isShowFollowing, setIsShowFollowing] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);

  const handleClose = () => {
    setOpenPostModal(false);
  };

  useEffect(() => {
    if (id === auth?.user?._id) {
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
    setIsShowFollowing(false);
  };
  return (
    <div className="info">
      <EditProfile
        open={openPostModal}
        onClose={handleClose}
        auth={auth}
        socket={socket}
      />
      <Alert />
      {userData.map((user) => (
        <div className="myprofile-container" key={user._id}>
          <div className="avatar-container">
            <Avatar src={user.avatar} size="supper-avatar" />
          </div>
          <div className="main">
            <div className="info_user_row_1">
              <div className="name">
                <h1>{user.username}</h1>
              </div>
              <div style={{ margin: "auto" }}>
                {id === auth.user._id ? (
                  <Button
                    className="editprofile"
                    type="primary"
                    onClick={() => setOpenPostModal(true)}
                  >
                    Chỉnh sửa trang cá nhân
                  </Button>
                ) : (
                  <FollowButton user={user} />
                )}
              </div>
            </div>
            <div className="info_user_row_2">
              <div>
                <strong>{profile?.posts[0]?.totalUserPosts} </strong>
                Posts
              </div>
              <div
                className="followers"
                onClick={() => setIsShowFollowers(true)}
              >
                <strong>{user.followers.length} </strong>
                Followers
              </div>
              <div
                className="following"
                onClick={() => setIsShowFollowing(true)}
              >
                <strong>{user.following.length} </strong>
                Followings
              </div>
            </div>
            <div className="info_user_row_3">
              <div className="fullname">{user.fullname}</div>
              <div className="story">{user.story}</div>
              <div className="website">
                <a href={user.website}>{user.website}</a>
              </div>
            </div>
          </div>
          {isShowFollowers && (
            <div className="back-form">
              <div className="modal-form"></div>
              <div className="container-form">
                <h3>Người theo dõi</h3>
                <div style={{ height: "200px", overflowY: "scroll" }}>
                  {user.followers.map((item) => (
                    <UserFollow
                      user={item}
                      event={{ onClick: handleClickEvent }}
                    />
                  ))}
                </div>
                <Button
                  type="primary"
                  danger
                  onClick={() => setIsShowFollowers(false)}
                  style={{ position: "absolute", right: 10, bottom: 10 }}
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
                <div style={{ height: "200px", overflowY: "scroll" }}>
                  {user.following.map((item) => (
                    <UserFollow
                      user={item}
                      event={{ onClick: handleClickEvent }}
                    />
                  ))}
                </div>
                <Button
                  type="primary"
                  danger
                  onClick={() => setIsShowFollowing(false)}
                  style={{ position: "absolute", right: 10, bottom: 10 }}
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
