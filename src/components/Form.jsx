import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { inputCSS } from "../Helpers";
import api from "../api/axios";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const location = useLocation();
  const isEditing = location.state?.isEditing || false;
  const bookId = location.state?.bookId;
  const [authors, setAuthors] = useState();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data) => {

    let base64Image = null;
    if (data["Foto do Livro"]) {
      base64Image = await convertToBase64(data["Foto do Livro"][0]);
    }

    const selectedAuthor = isEditing
      ? authors.filter((element) => {
          element._id === data.Autor;
        })
      : data.Autor;

    const bookAdd = {
      title: data.Título,
      description: data.Descrição,
      excerpt: data.Sinopse,
      pageCount: Number(data["Número de Páginas"]),
      publishDate: data["Data de Lançamento"],
      idAuthor: isEditing ? selectedAuthor._id : selectedAuthor,
      photoUrl: base64Image,
    };

    if (!isEditing) {
      api
        .post("/books", bookAdd)
        .then((response) => {
          //throw new Error();
          toast.success("Livro adicionado com sucesso!");
          reset();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Erro ao adicionar o livro.");
        });
    } else if (isEditing) {
      console.log("aqui");
      api
        .put(`/books/${bookId}`, bookAdd)
        .then((response) => {
          //throw new Error();
          toast.success("Livro alterado com sucesso!");
          reset();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Erro ao alterar o livro.");
        });
    }
  };

  useEffect(() => {
    if (isEditing) {
      api
        .get(`/books/${bookId}`)
        .then((response) => {
          const {
            title,
            description,
            excerpt,
            pageCount,
            publishDate,
            idAuthor,
          } = response.data;
          setValue("Título", title);
          setValue("Descrição", description);
          setValue("Sinopse", excerpt);
          setValue("Número de Páginas", pageCount);
          setValue(
            "Data de Lançamento",
            new Date(publishDate).toISOString().split("T")[0]
          );
          setValue("Autor", idAuthor);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setValue("Título", "");
      setValue("Descrição", "");
      setValue("Sinopse", "");
      setValue("Número de Páginas", "");
      setValue("Data de Lançamento", "");
      setValue("Autor", "");
    }
  }, [isEditing, bookId, setValue]);

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

  return (
    <div className={clsx("flex justify-center items-center")}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(
          "bg-white",
          "shadow-md",
          "rounded-lg",
          "p-8",
          "space-y-6",
          "w-full",
          "max-w-lg"
        )}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            {...register("Título", { required: "Título é obrigatório." })}
            className={clsx(inputCSS)}
          />
          {errors.Título && (
            <p className="text-red-500 text-sm">{errors.Título.message}</p>
          )}

          <textarea
            placeholder="Descrição"
            {...register("Descrição", { required: "Descrição é obrigatória." })}
            className={clsx(inputCSS)}
          />
          {errors.Descrição && (
            <p className="text-red-500 text-sm">{errors.Descrição.message}</p>
          )}

          <textarea
            placeholder="Sinopse"
            {...register("Sinopse", {
              required: "Sinopse é obrigatória.",
              maxLength: {
                value: 300,
                message: "Sinopse deve ter até 200 caracteres.",
              },
            })}
            className={clsx(inputCSS)}
          />
          {errors.Sinopse && (
            <p className="text-red-500 text-sm">{errors.Sinopse.message}</p>
          )}

          <input
            type="number"
            placeholder="Número de Páginas"
            {...register("Número de Páginas", {
              required: "Número de Páginas é obrigatório.",
              min: { value: 1, message: "Deve ser maior que 0." },
            })}
            className={clsx(inputCSS)}
          />
          {errors["Número de Páginas"] && (
            <p className="text-red-500 text-sm">
              {errors["Número de Páginas"].message}
            </p>
          )}

          <input
            type="date"
            {...register("Data de Lançamento", {
              required: "Data de Lançamento é obrigatória.",
            })}
            className={clsx(inputCSS)}
          />
          {errors["Data de Lançamento"] && (
            <p className="text-red-500 text-sm">
              {errors["Data de Lançamento"].message}
            </p>
          )}

          <select
            {...register("Autor", {
              required: "Autor é obrigatório.",
            })}
            className={clsx(inputCSS)}
          >
            <option value="">Selecione um autor</option>
            {(authors || []).map((element) => {
              return (
                <option key={element._id} value={element._id}>
                  {`${element.firstName} ${element.lastName}`}
                </option>
              );
            })}
          </select>
          {errors["Autor"] && (
            <p className="text-red-500 text-sm">{errors["Autor"].message}</p>
          )}

          <input
            type="file"
            placeholder="Insira a url da foto do livro"
            {...register("Foto do Livro", {
              required: "Foto do Livro é obrigatório."
            })}
            className={clsx(inputCSS)}
          />
          {errors["Foto do Livro"] && (
            <p className="text-red-500 text-sm">
              {errors["Foto do Livro"].message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={clsx(
            "bg-blue-400",
            "text-white",
            "px-4",
            "py-2",
            "rounded-lg",
            "w-full",
            "hover:bg-blue-300",
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-blue-300"
          )}
        >
          {isEditing ? "Atualizar Livro" : "Adicionar Livro"}
        </button>
      </form>
    </div>
  );
};

export default Form;
