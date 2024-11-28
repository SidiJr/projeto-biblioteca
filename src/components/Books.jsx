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

  return (
    <div className={clsx("flex", "justify-evenly", "flex-wrap")}>
      {Array.isArray(books) && books.length > 0 ? (
        books.map((book) => {
          const findImg = images.find((img) => img.idBook === book.id);
          const imgUrl = findImg?.url;
          const findAuthor = authors.find(
            (author) => book.idAuthor === author._id
          );
          const authorName = findAuthor?.firstName + " " + findAuthor?.lastName;
          return (
            <Card
              key={book._id}
              bookId={book._id}
              title={book.title}
              image={imgUrl}
              description={book.description}
              excerpt={book.excerpt}
              pageCount={book.pageCount}
              publishDate={book.publishDate}
              authorName={authorName}
              photoUrl={book.photoUrl}
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
