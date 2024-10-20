import axios from "axios";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Loading from "./Loading";
import useAuthors from "../hooks/useAuthors";
import useBooks from "../hooks/useBooks";

const Books = () => {
  const [images, setImages] = useState([]);
  const authors = useAuthors();
  const books = useBooks();

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
          const findAuthor = authors.find(
            (author) => author.idBook === book.id
          );
          const authorName = findAuthor?.firstName + " " + findAuthor?.lastName;
          return (
            <Card
              key={book.id}
              bookId={book.id}
              title={book.title}
              image={imgUrl}
              description={book.description}
              excerpt={book.excerpt}
              pageCount={book.pageCount}
              publishDate={book.publishDate}
              authorName={authorName}
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
