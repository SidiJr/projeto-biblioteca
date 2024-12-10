import clsx from "clsx";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const BookDetails = ({
  showModal,
  onClose,
  title,
  description,
  image,
  excerpt,
  publishDate,
  pageCount,
  authorName,
}) => {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  if (!showModal) return null;

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  return createPortal(
    <div
      className={clsx(
        "flex",
        "fixed",
        "top-0",
        "left-0",
        "w-full",
        "h-full",
        "justify-center",
        "items-center",
        "z-50",
        "bg-black",
        "bg-opacity-50"
      )}
    >
      <div
        ref={modalRef}
        onClick={handleModalClick}
        className={clsx(
          "flex",
          "bg-white",
          "w-8/12",
          "h-8/12",
          "flex-col",
          "gap-4",
          "items-center",
          "rounded-2xl"
        )}
      >
        <h1
          className={clsx(
            "flex",
            "justify-center",
            "text-green-600",
            "text-xl",
            "mt-4"
          )}
        >
          {title}
        </h1>
        <img
          // src={image}
          src="images/livro_nao_encontrado.png"
          alt="Foto do livro"
          className={clsx("w-1/4", "object-contain")}
          onError={(e) => {
            e.target.src = "images/livro_nao_encontrado.png";
          }}
        />
        <p className={clsx("flex", "justify-center")}>{description}</p>
        <p className={clsx("flex", "text-center")}>{excerpt}</p>
        <p>Número de páginas: {pageCount}</p>
        <p>Data de lançamento: {new Date(publishDate).toLocaleDateString()}</p>
        <p>Autor: {authorName}</p>
        <button
          className={clsx(
            "bg-red-400",
            "p-1",
            "w-1/6",
            "rounded-md",
            "hover:bg-red-300",
            "mb-4",
            "text-white"
          )}
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>,
    document.body
  );
};

export default BookDetails;
