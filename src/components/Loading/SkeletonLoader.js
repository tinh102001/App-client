import React from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = ({ post, load }) => {
  return (
    <div style={{ border: "1px solid black", margin: "10px" }}>
      <Skeleton count={6} />
      <div style={{ display: "flex" }}>
        <div>
          <Skeleton width={70} />
        </div>
        <div>
          <Skeleton width={70} />
        </div>
        <div>
          <Skeleton width={70} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
