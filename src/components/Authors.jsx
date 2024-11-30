import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Authors = () => {
  const [authors, setAuthors] = useState();

  useEffect(() => {
    api
      .get(`/authors`)
      .then((response) => {
        setAuthors(response.data.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(authors);

  return (
    <>
      {authors.map((author) => {
        return <div>{author.firstName + " " + author.lastName}</div>;
      })}
    </>
  );
};

export default Authors;
