import clsx from "clsx";
import React, { useState } from "react";

const Card = ({ title, image, description }) => {
  const [imgSrc, setImgSrc] = useState(image);

  const handleError = () => {
    setImgSrc("images/livro_nao_encontrado.png");
  };

  console.log(imgSrc)

  return (
    <div
      className={clsx(
        "bg-white",
        "w-1/5",
        "flex",
        "m-4",
        "flex-col",
        "items-center",
        "text-center",
        "gap-y-4",
        "h-96",
      )}
    >
      <p>{title}</p>
      <img
        src={imgSrc}
        alt="Foto do livro"
        className={clsx("h-1/2", "object-contain")}
        onError={handleError}
      />
      <p>{description}</p>
    </div>
  );
};

export default Card;
