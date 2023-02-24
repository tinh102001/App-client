import React from "react";
import { useSelector } from "react-redux";

function HomePage() {
  const { auth } = useSelector((state) => state);

  return (
    <div>
      Hello {auth.user.username}
    </div>
  );
}

export default HomePage;
