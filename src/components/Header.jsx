import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SubHeader from "./SubHeader";

function Header() {
  const [title, setTitle] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setTitle("Home");
    } else if (location.pathname === "/books") {
      setTitle("Livros");
    } else if (location.pathname === "/form") {
      setTitle("Cadastrar Livro");
    } else {
      setTitle("");
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
          "px-20"
        )}
      >
        <h1 className={clsx("text-white", "text-3xl", "flex", "items-center")}>
          Biblioteca
        </h1>
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
          </ul>
        </nav>
      </header>
      <SubHeader title={title} />
    </>
  );
}

export default Header;
