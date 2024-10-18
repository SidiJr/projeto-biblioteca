import axios from "axios";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

const List = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakerestapi.azurewebsites.net/api/v1/Books")
      .then((response) => {
        setBooks(response.data);
        //console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={clsx("flex")}>
      <p>Listagem de Livros</p>
      {Array.isArray(books) && books.length > 0 ? (
        books.map((book) => (
          <div className={clsx("w-1/5")} key={book.id}>
            {book.title}
          </div>
        ))
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default List;
