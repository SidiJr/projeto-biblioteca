import { useEffect, useState } from "react";
import api from "../api/axios";

const useBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books");
        console.log("reposta: ", response.data.docs);
        setBooks(response.data.docs);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };

    fetchBooks();
  }, []);

  return books;
};

export default useBooks;
