import clsx from "clsx";
import { useEffect, useState } from "react";
import Card from "./Card";
import Loading from "./Loading";
import api from "../api/axios";

const Books = () => {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);

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

  useEffect(() => {
    api
      .get(`/books`)
      .then((response) => {
        setBooks(response.data.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={clsx("flex", "justify-evenly", "flex-wrap")}>
      {Array.isArray(books) && books.length > 0 ? (
        books.map((book) => {
          const findAuthor = authors.find(
            (author) => book.idAuthor === author._id
          );
          const authorName = findAuthor?.firstName + " " + findAuthor?.lastName;
          return (
            <Card
              key={book._id}
              bookId={book._id}
              title={book.title}
              image={book.photoUrl}
              description={book.description}
              excerpt={book.excerpt}
              pageCount={book.pageCount}
              publishDate={book.publishDate}
              authorName={authorName}
              photoUrl={book.photoUrl}
              setBooks={setBooks}
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
