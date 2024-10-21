import clsx from "clsx";
import React from "react";

const Loading = () => {
  return (
    <div>
      <p className={clsx("text-green-600", "text-xl", "mt-10")}>Carregando...</p>
    </div>
  );
};

export default Loading;
