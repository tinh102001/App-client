import React from "react";
import { useSelector } from "react-redux";

import SpinLoader from "../components/alert/SpinLoader";

function HomePage() {
  const { auth } = useSelector((state) => state);

  return (
    <>{auth.token ? <div>Hello {auth.user.username}</div> : <SpinLoader />}</>
  );
}

export default HomePage;
