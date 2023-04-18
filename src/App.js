import React, { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import SocketClient from "./SocketClient";
import Peer from "peerjs";

import AppRouter from "./router/AppRouter";

import { refreshToken } from "./redux/actions/authActions";
import { getPosts } from "./redux/actions/postActions";
import { getSuggestions } from "./redux/actions/suggestionsAction";
import { getNotifies } from "./redux/actions/notifyActions";
import { GLOBALTYPES } from "./redux/actions/globalTypes";

import SpinLoader from "./components/Loading/SpinLoader";
import ErrorApp from "./pages/ErrorApp/ErrorApp";
import ConfirmModal from "./components/ConfirmModal/ConfirmModal";
import Call from "./components/Message/Call";

const App = () => {
  const { auth, call } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: "/",
      secure: true,
    });

    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer });
  }, [dispatch]);

  return (
    <ErrorBoundary FallbackComponent={<ErrorApp></ErrorApp>}>
      <Suspense fallback={<SpinLoader />}>
        {auth.token && <SocketClient />}
        {call && <Call />}
        <ConfirmModal />
        <AppRouter></AppRouter>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
