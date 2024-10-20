import { useEffect, useState } from "react";
import axios from "axios";

const useBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://fakerestapi.azurewebsites.net/api/v1/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Erro ao buscar autores:", error);
      }
    };

    fetchBooks();
  }, []);

  return books;
};

export default useBooks;
