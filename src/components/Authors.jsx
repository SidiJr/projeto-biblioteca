import { useCallback, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { EditingContext } from "../contexts/EditingContext";
import { toast } from "react-toastify";
import Loading from "./Loading";

const Authors = () => {
  const [authors, setAuthors] = useState();
  const { setIsEditing } = useContext(EditingContext);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/authors`)
      .then((response) => {
        setAuthors(response.data.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEdit = useCallback(
    (authorId) => {
      setIsEditing(true);
      navigate("/formauthors", {
        state: { isEditing: true, authorId: authorId },
      });
    },
    [navigate, setIsEditing]
  );
  const handleDelete = useCallback((authorId, event) => {
    event.stopPropagation();
    api
      .delete(`authors/${authorId}`)
      .then(() => {
        setAuthors((prev) => {
          return prev.filter((author) => author._id !== authorId);
        });
        toast.success("Autor deletado com sucesso!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao deletar o autor.");
      });
  }, []);

  console.log(authors)

  return (
    <div className={clsx("flex", "flex-col")}>
      {authors?.length > 0 ? (
        authors.map((author, key) => {
          const authorId = author._id;
          return (
            <div
              key={key}
              className={clsx("text-center", "bg-white", "m-1", "flex")}
            >
              <div
                className={clsx(
                  "w-1/2",
                  "items-center",
                  "flex",
                  "justify-center"
                )}
              >
                {author.firstName + " " + author.lastName}
              </div>
              <div className={clsx("w-1/2")}>
                <button
                  className={clsx(
                    "bg-yellow-400",
                    "rounded-md",
                    "hover:bg-yellow-300",
                    "p-2",
                    "text-white",
                    "w-2/12",
                    "m-2"
                  )}
                  onClick={() => handleEdit(authorId)}
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
                    "w-2/12",
                    "m-2"
                  )}
                  onClick={(event) => handleDelete(authorId, event)}
                >
                  Deletar
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className={clsx("text-center")}>
          <Loading />
        </div>

        
      )}
    </div>
  );
};

export default Authors;
