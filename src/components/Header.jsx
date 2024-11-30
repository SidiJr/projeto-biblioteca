import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SubHeader from "./SubHeader";

function Header() {
  const [title, setTitle] = useState("");
  const location = useLocation();
  const isEditing = location.state?.isEditing || false;

  useEffect(() => {
    if (location.pathname === "/") {
      setTitle("Home");
    } else if (location.pathname === "/books") {
      setTitle("Livros");
    } else if (location.pathname === "/form" && !isEditing) {
      setTitle("Adicionar Livro");
    } else if (location.pathname === "/form" && isEditing) {
      setTitle("Editar Livro");
    }else if (location.pathname === "/authors") {
      setTitle("Autores");
    }else if (location.pathname === "/formauthors" && !isEditing) {
      setTitle("Adicionar Autor");
    }else if (location.pathname === "/formauthors" && isEditing) {
      setTitle("Editar Autor");
    } else {
      setTitle("Biblioteca");
    }
  }, [location]);

  return (
    <>
      <header
        className={clsx(
          "w-full",
          "bg-green-600",
          "flex",
          "justify-between",
          "min-h-20",
          "px-20",
          "fixed",
          "top-0",
          "z-50"
        )}
      >
        <Link to="/" className={clsx("text-white", "text-3xl", "flex", "items-center")}>
          Biblioteca
        </Link>
        <nav className={clsx("flex", "items-center")}>
          <ul className={clsx("flex")}>
            <li className={clsx("text-white", "text-sm", "p-2")}>
              <Link to="/" onClick={() => setTitle("Home")}>
                Home
              </Link>
            </li>
            <li className={clsx("text-white", "text-sm", "p-2")}>
              <Link to="/books" onClick={() => setTitle("Livros")}>
                Livros
              </Link>
            </li>
            <li className={clsx("text-white", "text-sm", "p-2")}>
              <Link to="/authors" onClick={() => setTitle("Autores")}>
                Autores
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <SubHeader title={title} />
    </>
  );
}

export default Header;
