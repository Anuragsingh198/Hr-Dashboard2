import React from "react";
import classNames from "classnames";

export const Skeleton = ({ className }) => {
  return (
    <div
      className={classNames(
        "animate-pulse rounded-md bg-gray-300 dark:bg-gray-700",
        className
      )}
    />
  );
};
