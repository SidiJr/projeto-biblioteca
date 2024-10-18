import clsx from "clsx";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      className={clsx(
        "w-full",
        "bg-green-600",
        "flex",
        "justify-between",
        "min-h-20",
        "px-20",
      )}
    >
      <h1 className={clsx("text-white", "text-3xl", "flex", "items-center")}>Biblioteca</h1>
      <nav className={clsx("flex","items-center")}>
        <ul className={clsx("flex")}>
          <li className={clsx("text-white", "text-sm","p-2")}>
            <Link to="/">Home</Link>
          </li>
          <li className={clsx("text-white", "text-sm", "p-2")}>
            <Link to="/books">Livros</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
