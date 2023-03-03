import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Header from "../components/Header/Header";
import SpinLoader from "../components/Loading/SpinLoader";
import ProfilePost from "../components/Profile/ProfilePost";

import { useDispatch } from "react-redux";
import { getProfileUsers } from "../redux/actions/profileActions";

import { getAPI } from "../utils/fetchAPI";

const MyProfile = () => {
  const { auth, profile } = useSelector((state) => state);
  const [isShowFollowers, setIsShowFollowers] = useState(false);
  const [isShowFollowing, setIsShowFollowing] = useState(false);
  const [isShowEditProfile, setIsShowEditProfile] = useState(false);
  const [isShowSaved, setIsShowSaved] = useState(false);

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  const id = auth.user._id;

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }));
    }
  }, [id, auth, dispatch, profile.ids]);

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts);
        setPage(data.page);
      }
    });
  }, [profile.posts, id]);

  const handleLoadMore = useCallback(async () => {
    const res = await getAPI(`user_posts/${id}?page=${page + 1}`, auth.token);
    const newData = { ...res.data, page: page + 1, _id: id };
    setPosts([...posts, ...newData.posts]);
    setPage((page) => page + 1);
  }, [auth.token, page, posts, id]);

  useEffect(() => {
    const onScroll = async function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        handleLoadMore();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleLoadMore]);

  return (
    <div>
      <Header />
      {auth.token ? (
        <div>
          <div className="myprofile-container">
            <div className="header-profile">
              <img
                className="avatar"
                src={auth.user.avatar}
                alt="Ảnh đại diện"
              />
              <div className="main">
                <div className="name">
                  <h1>{auth.user.username}</h1>
                  <Button
                    className="editprofile"
                    type="primary"
                    onClick={() => setIsShowEditProfile(true)}
                  >
                    <EditOutlined />
                    Chỉnh sửa trang cá nhân
                  </Button>
                </div>
                <div className="follow">
                  <div>{auth.user.story.length} bài viết</div>
                  <div
                    className="followers"
                    onClick={() => setIsShowFollowers(true)}
                  >
                    {auth.user.followers.length} người theo dõi
                  </div>
                  <div
                    className="following"
                    onClick={() => setIsShowFollowing(true)}
                  >
                    Đang theo dõi {auth.user.following.length} người dùng
                  </div>
                </div>
                <div className="fullname">Tên đầy đủ: {auth.user.fullname}</div>
              </div>
            </div>
            <div className="info">
              <div className="address">Địa chỉ: {auth.user.address}</div>
              <div className="mobile">Số điện thoại: {auth.user.mobile}</div>
              <div className="gender">Giới tính: {auth.user.gender}</div>
              <div className="story">Tiểu sử: {auth.user.story}</div>
              <div className="saved" onClick={() => setIsShowSaved(true)}>
                Đã lưu: {auth.user.saved.length} đã lưu
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
          <ProfilePost posts={posts} />
        </div>
      ) : (
        <SpinLoader />
      )}
    </div>
  );
};

export default MyProfile;
