import clsx from "clsx";
import React, { useState } from "react";
import BookDetails from "./BookDetails";

const Card = ({
  title,
  image,
  description,
  excerpt,
  publishDate,
  pageCount,
  autorName,
}) => {
  const [imgSrc, setImgSrc] = useState(image);
  const [showModal, setShowModal] = useState(false);

  const handleError = () => {
    setImgSrc("images/livro_nao_encontrado.png");
  };

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
        "cursor-pointer",
        "rounded-md"
      )}
      onClick={() => {
        setShowModal(true);
      }}
    >
      <h1 className={clsx("text-green-600", "text-xl")}>{title}</h1>
      <img
        src={imgSrc}
        alt="Foto do livro"
        className={clsx("h-1/2", "object-contain")}
        onError={handleError}
      />
      <p>{description}</p>
      {/* <button >Detalhes</button> */}
      <BookDetails
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        title={title}
        description={description}
        image={imgSrc}
        excerpt={excerpt}
        pageCount={pageCount}
        publishDate={publishDate}
        autorName={autorName}
      />
      <div className={clsx("flex", "w-full")}>
        <button
          className={clsx(
            "bg-yellow-400",
            "rounded-md",
            "hover:bg-yellow-300",
            "p-2",
            "text-white",
            "w-1/2",
            "ml-2",
            "mr-2"
          )}
        >
          Editar
        </button>
        <button
          className={clsx(
            "bg-red-400",
            "rounded-md",
            "hover:bg-red-300",
            "p-2",
            "text-white",
            "w-1/2",
            "mr-2"
          )}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default Card;
