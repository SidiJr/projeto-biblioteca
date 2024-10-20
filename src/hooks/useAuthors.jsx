import { useEffect, useState } from "react";
import axios from "axios";

const useAuthors = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get("https://fakerestapi.azurewebsites.net/api/v1/Authors");
        setAuthors(response.data);
      } catch (error) {
        console.error("Erro ao buscar autores:", error);
      }
    };

    fetchAuthors();
  }, []);

  return authors;
};

export default useAuthors;
