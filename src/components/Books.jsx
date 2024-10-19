import axios from "axios";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Loading from "./Loading";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [images, setImages] = useState([]);
  const [autors, setAutors] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakerestapi.azurewebsites.net/api/v1/Books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos")
      .then((response) => {
        setImages(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://fakerestapi.azurewebsites.net/api/v1/Authors")
      .then((response) => {
        setAutors(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={clsx("flex", "justify-evenly", "flex-wrap")}>
      {Array.isArray(books) && books.length > 0 ? (
        books.map((book) => {
          const findImg = images.find((img) => img.idBook === book.id);
          const imgUrl = findImg?.url;
          const findAutor= autors.find((autor) => autor.idBook === book.id);
          const autorName = findAutor?.firstName + " " + findAutor?.lastName;
          return (
            <Card
              key={book.id}
              title={book.title}
              image={imgUrl}
              description={book.description}
              excerpt={book.excerpt}
              pageCount={book.pageCount}
              publishDate = {book.publishDate}
              autorName = {autorName}
            />
          );
        })
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Books;
