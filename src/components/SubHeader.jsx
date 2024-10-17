import clsx from "clsx";
import React from "react";

const SubHeader = () => {
  return (
    <div
      className={clsx(
        "w-full",
        "bg-custom-50",
        "flex",
        "justify-between",
        "h-28",
        "items-center",
        "px-8"
      )}
    >
      <div className={clsx("flex", "h-3/4")}>
        <img src="images/logo1.png" alt="Logo" />
      </div>
    </div>
  );
};

export default SubHeader;
