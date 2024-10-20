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

  return (
    <div>
      <h1>Home Page</h1>
      <p>Bem-vindo!</p>
      <div className={clsx("flex", "w-1/4", "justify-center")}>
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
          onClick={handleAdd}
        >
          Adicionar Livro
        </button>
      </div>
    </div>
  );
}

export default Home;
