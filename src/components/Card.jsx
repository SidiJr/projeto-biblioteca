import clsx from "clsx";
import React, { useState } from "react";

const Card = ({ title, image }) => {
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
        "items-center"
      )}
    >
      {title}
      <img
        src={imgSrc}
        alt="Foto do livro"
        className={clsx("h-1/2", "object-contain")}
        onError={handleError}
      />
    </div>
  );
};

export default Card;
