import React, { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useDispatch } from "react-redux";

import AppRouter from "./router/AppRouter";

import { refreshToken } from "./redux/actions/authActions";

import SpinLoader from "./components/Loading/SpinLoader";

import ErrorApp from "./pages/ErrorApp/ErrorApp";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);
  return (
    <ErrorBoundary FallbackComponent={<ErrorApp></ErrorApp>}>
      <Suspense fallback={<SpinLoader />}>
        <AppRouter></AppRouter>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
