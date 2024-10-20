import clsx from "clsx";
import React from "react";

const ErrorPage = () => {
  return (
    <div
      className={clsx(
        "bg-white",
        "flex",
        "justify-center",
        "items-center",
        "h-screen",
        "w-full",
        "flex-col",
        "gap-8"
      )}
    >
      <h1 className={clsx("text-green-600", "text-7xl")}>
        Error 404
      </h1>
      <h1 className={clsx("text-green-600", "text-xl")}>Página não encontrada</h1>
    </div>
  );
};

export default ErrorPage;
