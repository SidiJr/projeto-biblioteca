import clsx from "clsx";
import React, { useContext, useState } from "react";
import BookDetails from "./BookDetails";
import { useNavigate } from "react-router-dom";
import { EditingContext } from "../contexts/EditingContext";
import { toast } from "react-toastify";
import api from "../api/axios";

const Card = ({
  title,
  image,
  description,
  excerpt,
  publishDate,
  pageCount,
  authorName,
  bookId,
  photoUrl,
  setBooks,
}) => {
  const [imgSrc, setImgSrc] = useState(image);
  const [showModal, setShowModal] = useState(false);
  const { setIsEditing } = useContext(EditingContext);

  const handleError = () => {
    setImgSrc("images/livro_nao_encontrado.png");
  };

  const navigate = useNavigate();

  const handleEdit = () => {
    setIsEditing(true);
    navigate("/form", {
      state: { isEditing: true, bookId: bookId, authorName: authorName },
    });
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    api
      .delete(`books/${bookId}`)
      .then((response) => {
        setBooks((prev) => {
          return prev.filter((book) => book._id !== bookId);
        });
        toast.success("Livro deletado com sucesso!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao deletar o livro.");
      });
  };

  return (
    <div
      className={clsx(
        "bg-white",
        "w-1/2",
        "sm:w-1/3",
        "lg:w-1/4",
        "xl:w-1/5",
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
        // src={imgSrc}
        src="images/livro_nao_encontrado.png"
        alt="Foto do livro"
        className={clsx("h-1/2", "object-contain")}
        onError={handleError}
      />
      <p>{description}</p>
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
        authorName={authorName}
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
          onClick={handleEdit}
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
          onClick={handleDelete}
        >
          Deletar
        </button>
      </div>
    </div>
  );
};

export default Card;
