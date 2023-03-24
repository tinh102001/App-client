import React, { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";

import AppRouter from "./router/AppRouter";

import { refreshToken } from "./redux/actions/authActions";
import { getPosts } from "./redux/actions/postActions";
import { getSuggestions } from "./redux/actions/suggestionsAction";

import SpinLoader from "./components/Loading/SpinLoader";
import ErrorApp from "./pages/ErrorApp/ErrorApp";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
    }
  }, [dispatch, auth.token]);
  return (
    <ErrorBoundary FallbackComponent={<ErrorApp></ErrorApp>}>
      <Suspense fallback={<SpinLoader />}>
        <AppRouter></AppRouter>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
