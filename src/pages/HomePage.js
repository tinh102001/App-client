import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { POST_TYPES, getPosts } from "../redux/actions/postActions";
import { getAPI } from "../utils/fetchAPI";

import Status from "../components/Status/Status";
import Header from "../components/Header/Header";
import Alert from "../components/Alert/Alert";
import PostCard from "../components/PostCard/PostCard";
import SkeletonLoader from "../components/Loading/SkeletonLoader";

const HomePage = () => {
  const { auth, homePosts } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  useEffect(() => {
    dispatch(getPosts(auth.token));
  }, [auth.token, dispatch]);

  const handleLoadMore = useCallback(async () => {
    setLoad(true);
    const res = await getAPI(`posts?limit=${homePosts.page * 6}`, auth.token);
    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: homePosts.page + 1 },
    });
    setLoad(false);
  }, [homePosts.page, auth.token, dispatch]);

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
    <div className="home-page-wrapper">
      <Header />
      <Alert />
      <div>Hello {auth.user.username}</div>
      <Status />

      {homePosts.posts.length !== 0 ? (
        <PostCard posts={homePosts.posts} />
      ) : (
        <div>No Post</div>
      )}
      {load && <SkeletonLoader />}
    </div>
  );
};

export default HomePage;
