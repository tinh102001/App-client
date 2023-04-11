import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getProfileUsers } from "../redux/actions/profileActions";
import { getAPI } from "../utils/fetchAPI";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

import Header from "../components/Header/Header";
import SpinLoader from "../components/Loading/SpinLoader";
import PostGallery from "../components/PostGallery/PostGallery";
import Info from "../components/Profile/Info";

const MyProfile = () => {
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [load, setLoad] = useState(false);

  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(6);
  const [page, setPage] = useState(0);

  const [saveTab, setSaveTab] = useState(false);
  const [savePosts, setSavePosts] = useState([]);
  const [resultSavedPosts, setResultSavedPosts] = useState(6);
  const [pageSavedPosts, setPageSavedPosts] = useState(2);

  const [selectedItem, setSelectedItem] = useState("item1");

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts);
        setResult(data.result);
        setPage(data.page);
      }
    });
  }, [profile.posts, id]);

  useEffect(() => {
    dispatch(getProfileUsers({ id, auth }));
  }, [id, auth, dispatch]);

  useEffect(() => {
    setLoad(true);
    getAPI(`get_save_posts`, auth.token)
      .then((res) => {
        setSavePosts(res.data.savePosts);
        setResultSavedPosts(res.data.result);
        setLoad(false);
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
    setLoad(true);
    if (!saveTab) {
      const res = await getAPI(`user_posts/${id}?page=${page + 1}`, auth.token);
      setPage((page) => page + 1);
      setPosts([...posts, ...res.data.posts]);
    } else {
      const res = await getAPI(
        `get_save_posts?page=${pageSavedPosts}`,
        auth.token
      );
      setPageSavedPosts((pageSavedPosts) => pageSavedPosts + 1);
      setSavePosts([...savePosts, ...res.data.savePosts]);
    }
    setLoad(false);
  }, [auth.token, page, pageSavedPosts, posts, id, saveTab, savePosts]);
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
        {auth?.user?._id === id && (
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
              <PostGallery posts={savePosts} result={resultSavedPosts} />
            ) : (
              <PostGallery posts={posts} result={result} />
            )}
          </>
        ) : (
          <SpinLoader />
        )}
        {load && <SpinLoader />}
      </div>
    </div>
  );
};

export default MyProfile;
