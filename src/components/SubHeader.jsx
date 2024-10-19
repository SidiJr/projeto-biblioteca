import clsx from "clsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SubHeader = ({ title }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add");
  };

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
          onClick={handleClick}
        >
          Adicionar Livro
        </button>
      </div>
    </div>
  );
};

export default SubHeader;
