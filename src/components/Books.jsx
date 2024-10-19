import axios from "axios";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Loading from "./Loading";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [images, setImages] = useState([]);

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

  return (
    <div className={clsx("flex", "justify-evenly", "flex-wrap")}>
      {Array.isArray(books) && books.length > 0 ? (
        books.map((book) => {
          const findImg = images.find((img) => img.idBook === book.id);
          const imgUrl = findImg?.url;
          return (
            <Card
              key={book.id}
              title={book.title}
              image={imgUrl}
              description={book.description}
              excerpt={book.excerpt}
              pageCount={book.pageCount}
              publishDate = {book.publishDate}
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
