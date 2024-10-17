import clsx from "clsx";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={clsx("w-full", "bg-green-800")}>
      <h1>Header Biblioteca</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/books">Livros</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
