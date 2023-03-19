import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "../components/Header/Header";
import SpinLoader from "../components/Loading/SpinLoader";
import PostGallery from "../components/PostGallery/PostGallery";

import { getProfileUsers } from "../redux/actions/profileActions";
import { getAPI } from "../utils/fetchAPI";
import { PROFILE_TYPES } from "../redux/actions/profileActions";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import Info from "../components/Profile/Info";

const MyProfile = () => {
  const { auth, profile } = useSelector((state) => state);
  // const [load, setLoad] = useState(false);
  const [saveTab, setSaveTab] = useState(false);
  const [posts, setPosts] = useState([]);
  const [savePosts, setSavePosts] = useState([]);
  const [selectedItem, setSelectedItem] = useState("item1");

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }));
    }
  }, [id, auth, dispatch, profile.ids]);

  const initPosts = async () => {
    let res = await getAPI(`user_posts/${id}`, auth.token);
    return setPosts(res.data.posts);
  };

  useEffect(() => {
    initPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token, id]);

  useEffect(() => {
    // setLoad(true);
    getAPI(`get_save_posts`, auth.token)
      .then((res) => {
        setSavePosts(res.data.savePosts);
        // setLoad(false);
      })
      .catch((err) => {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      });

    return () => setSavePosts([]);
  }, [auth.token, dispatch]);

  const handleClick = (item) => {
    setSelectedItem(item);
    setSaveTab(!saveTab);
  };

  const handleLoadMore = useCallback(async () => {
    // setLoad(true);
    if (!saveTab) {
      const res = await getAPI(
        `user_posts/${id}?page=${profile.page + 1}`,
        auth.token
      );
      dispatch({
        type: PROFILE_TYPES.GET_POSTS,
        payload: { ...res.data, page: profile.page + 1 },
      });
      setPosts([...posts, ...res.data.posts]);
    }
    // setLoad(false);
  }, [auth.token, profile.page, posts, id, dispatch, saveTab]);

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
      <Info id={id} auth={auth} profile={profile} dispatch={dispatch} />
      <div className="profile-content">
        {auth.user._id === id && (
          <div className="profile_tab">
            <Link
              className={selectedItem === "item1" ? "selected" : ""}
              onClick={() => handleClick("item1")}
            >
              Bài viết
            </Link>
            <Link
              className={selectedItem === "item2" ? "selected" : ""}
              onClick={() => handleClick("item2")}
            >
              Đã lưu
            </Link>
          </div>
        )}
        {posts ? (
          <>
            {saveTab ? (
              <PostGallery posts={savePosts} />
            ) : (
              <PostGallery posts={posts} />
            )}
          </>
        ) : (
          <SpinLoader />
        )}
        {/* {load && <SpinLoader />} */}
      </div>
    </div>
  );
};

export default MyProfile;
