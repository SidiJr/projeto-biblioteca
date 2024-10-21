import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EditingContext } from "../contexts/EditingContext";
import clsx from "clsx";

function Home() {
  const { setIsEditing } = useContext(EditingContext);
  const navigate = useNavigate();

  const handleAdd = () => {
    setIsEditing(false);
    navigate("/form");
  };

  const handleList = () => {
    navigate("/books");
  };

  return (
    <div
      className={clsx(
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "gap-4",
        "mt-24"
      )}
    >
      <h1 className={clsx("text-5xl", "text-green-600", "mb-10")}>
        Bem-vindo!
      </h1>
      <button
        className={clsx(
          "bg-green-400",
          "rounded-md",
          "hover:bg-green-300",
          "p-2",
          "text-white",
          "w-full",
          "max-w-xs"
        )}
        onClick={handleAdd}
      >
        Adicionar Livro
      </button>
      <button
        className={clsx(
          "bg-blue-400",
          "rounded-md",
          "hover:bg-blue-300",
          "p-2",
          "text-white",
          "w-full",
          "max-w-xs"
        )}
        onClick={handleList}
      >
        Listar Livros
      </button>
    </div>
  );
}

export default Home;
