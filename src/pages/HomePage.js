import React from "react";
import { useSelector } from "react-redux";

import SpinLoader from "../components/Loading/SpinLoader";
import Status from "../components/Status/Status";
import Header from "../components/Header/Header";
import Alert from "../components/Alert/Alert";

const HomePage = () => {
  const { auth } = useSelector((state) => state);

  return (
    <>
      <Header />
      <Alert />
      <div>
        {auth.token ? <div>Hello {auth.user.username}</div> : <SpinLoader />}
      </div>
      <Status />
    </>
  );
};

export default HomePage;
