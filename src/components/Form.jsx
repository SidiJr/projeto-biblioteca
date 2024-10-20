import clsx from "clsx";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { inputCSS } from "../Helpers";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const location = useLocation();
  const isEditing = location.state?.isEditing || false;
  const bookId = location.state?.bookId;

  const onSubmit = async (data) => {
    const bookAdd = {
      title: data.Título,
      description: data.Descrição,
      excerpt: data.Sinopse,
      pageCount: Number(data["Número de Páginas"]),
      publishDate: data["Data de Lançamento"],
    };

    if (!isEditing) {
      axios
        .post("https://fakerestapi.azurewebsites.net/api/v1/Books/", bookAdd)
        .then((response) => {
          console.log("Livro adicionado:", response.data);
          toast.success("Livro adicionado com sucesso!");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Erro ao adicionar o livro.")
        });
    } else if (isEditing) {
      axios
        .put(`https://fakerestapi.azurewebsites.net/api/v1/Books/${bookId}`, bookAdd)
        .then((response) => {
          console.log("Livro alterado:", response.data);
          toast.success("Livro alterado com sucesso!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (isEditing) {
      axios
        .get(`https://fakerestapi.azurewebsites.net/api/v1/Books/${bookId}`)
        .then((response) => {
          const { title, description, excerpt, pageCount, publishDate } = response.data;
          setValue("Título", title);
          setValue("Descrição", description);
          setValue("Sinopse", excerpt);
          setValue("Número de Páginas", pageCount);
          setValue("Data de Lançamento", new Date(publishDate).toISOString().split("T")[0]);
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
    }
  }, [isEditing, bookId, setValue]);

  return (
    <div
      className={clsx(
        "flex justify-center items-center"
      )}
    >
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