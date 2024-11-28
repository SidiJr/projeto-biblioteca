import { useEffect, useState } from "react";
import api from "../api/axios";

const useAuthors = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await api.get("/authors");
        setAuthors(response.data.docs);
      } catch (error) {
        console.error("Erro ao buscar autores:", error);
      }
    };

    fetchAuthors();
  }, []);

  return authors;
};

export default useAuthors;
