import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

import SpinLoader from "../components/loading/SpinLoader";
import Toast from "../components/alert/Toast";
import Status from "../components/status/Status";

function HomePage() {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      <>
        {alert.success && (
          <Toast
            msg={{ title: "Success", body: alert.success }}
            handleShow={() =>
              dispatch({ type: GLOBALTYPES.ALERT, payload: {} })
            }
            bgColor="bg-success"
          />
        )}
      </>
      <div>
        {auth.token ? <div>Hello {auth.user.username}</div> : <SpinLoader />}
      </div>
      <Status />
    </>
  );
}

export default HomePage;
