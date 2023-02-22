import React, { Suspense } from "react";
import AppRouter from "./app/AppRouter";
import { ErrorBoundary } from "react-error-boundary";
import ErrorApp from "./layout/components/ErrorApp/ErrorApp";

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={<ErrorApp></ErrorApp>}>
      <Suspense fallback={<ErrorApp></ErrorApp>}>
        <AppRouter></AppRouter>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
