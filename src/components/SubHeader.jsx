import clsx from "clsx";
import React, { useState } from "react";

const SubHeader = ({ title }) => {
  return (
    <div
      className={clsx(
        "w-full",
        "bg-custom-50",
        "flex",
        "justify-between",
        "h-28",
        "items-center",
        "px-20",
        "mb-4"
      )}
    >
      <div className={clsx("flex", "h-3/4", "justify-between")}>
        <img src="images/logo_branco.png" alt="Logo" />
        <h1
          className={clsx(
            "flex",
            "text-center",
            "items-center",
            "text-green-600",
            "text-2xl"
          )}
        >
          {title}
        </h1>
        <button
          className={clsx(
            "bg-green-400",
            "rounded-md",
            "hover:bg-green-300",
            "h-1/2",
            "p-2",
            "text-white",
            "flex",
            "self-center"
          )}
        >
          Adicionar Livro
        </button>
      </div>
    </div>
  );
};

export default SubHeader;
