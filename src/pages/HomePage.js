import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import SpinLoader from "../components/Loading/SpinLoader";
import Status from "../components/Status/Status";
import Header from "../components/Header/Header";
import Alert from "../components/Alert/Alert";
import PostCard from "../components/PostCard/PostCard";
import { POST_TYPES, getPosts } from "../redux/actions/postActions";
import { getAPI } from "../utils/fetchAPI";

const HomePage = () => {
  const { auth, homePosts } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    dispatch(getPosts(auth.token));
  }, [auth.token, dispatch]);

  const initPosts = async () => {
    let res = await getAPI(`posts`, auth.token);
    return setPosts(res.data.posts);
  };
  useEffect(() => {
    initPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = useCallback(async () => {
    setLoad(true);
    const res = await getAPI(`posts?page=${homePosts.page}`, auth.token);
    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: homePosts.page + 1 },
    });
    setPosts([...posts, ...res.data.posts]);
    setLoad(false);
  }, [homePosts.page, auth.token, dispatch, posts]);

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
    <>
      <Header />
      <Alert />
      <div>
        {auth.token ? <div>Hello {auth.user.username}</div> : <SpinLoader />}
      </div>

      <Status />
      {load && <SpinLoader />}
      {posts.length !== 0 ? <PostCard posts={posts} /> : <div>No Post</div>}
    </>
  );
};

export default HomePage;
