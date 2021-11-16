import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function LoadingDetails() {
  return (
    <div className="loading-details">
      <div className="loading-img">
        <Skeleton height="300px" />
      </div>
      <div className="loading-info">
        <Skeleton height="78px" />
        <Skeleton height="36px" />
        <Skeleton height="78px" />
        <Skeleton height="80px" />
        <Skeleton height="100px" />
        <Skeleton height="60px" />
        <Skeleton height="60px" />
      </div>
    </div>
  );
}

export default LoadingDetails;
