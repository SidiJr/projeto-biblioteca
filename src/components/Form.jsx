import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const publishDate = new Date(data["Data de Lançamento"]);
    const isoPublishDate = publishDate.toISOString();

    const authorData = {
      firstName: data["Nome do Autor"],
      lastName: data["Sobrenome do Autor"],
    };

    const bookData = {
      title: data.Título,
      description: data.Descrição,
      excerpt: data.Sinopse,
      pageCount: Number(data["Número de Páginas"]),
      publishDate: isoPublishDate,
    };

    try {
      const authorResponse = await axios.post(
        "https://fakerestapi.azurewebsites.net/api/v1/Authors",
        authorData
      );
      console.log("Autor adicionado com sucesso:", authorResponse.data);

      const bookResponse = await axios.post(
        "https://fakerestapi.azurewebsites.net/api/v1/Books",
        {
          ...bookData,
          authorId: authorResponse.data.id,
        }
      );
      console.log("Livro adicionado com sucesso:", bookResponse.data);
      toast.success("Livro adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
      toast.error("Erro ao adicionar livro.");
    }
  };

  return (
    <div
      className={clsx(
        "flex justify-center items-center min-h-screen bg-gray-100"
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
        <h2
          className={clsx(
            "text-2xl",
            "font-bold",
            "text-gray-800",
            "text-center"
          )}
        >
          Adicionar Livro
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            {...register("Título", { required: "Título é obrigatório." })}
            className={clsx(
              "w-full",
              "px-4",
              "py-2",
              "border",
              "border-gray-300",
              "rounded-lg",
              "focus:outline-none",
              "focus:ring-2",
              "focus:ring-green-500"
            )}
          />
          {errors.Título && (
            <p className="text-red-500 text-sm">{errors.Título.message}</p>
          )}

          <textarea
            placeholder="Descrição"
            {...register("Descrição", { required: "Descrição é obrigatória." })}
            className={clsx(
              "w-full",
              "px-4",
              "py-2",
              "border",
              "border-gray-300",
              "rounded-lg",
              "focus:outline-none",
              "focus:ring-2",
              "focus:ring-green-500"
            )}
          />
          {errors.Descrição && (
            <p className="text-red-500 text-sm">{errors.Descrição.message}</p>
          )}

          <textarea
            placeholder="Sinopse"
            {...register("Sinopse", {
              required: "Sinopse é obrigatória.",
              maxLength: {
                value: 200,
                message: "Sinopse deve ter até 200 caracteres.",
              },
            })}
            className={clsx(
              "w-full",
              "px-4",
              "py-2",
              "border",
              "border-gray-300",
              "rounded-lg",
              "focus:outline-none",
              "focus:ring-2",
              "focus:ring-green-500"
            )}
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
            className={clsx(
              "w-full",
              "px-4",
              "py-2",
              "border",
              "border-gray-300",
              "rounded-lg",
              "focus:outline-none",
              "focus:ring-2",
              "focus:ring-green-500"
            )}
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
            className={clsx(
              "w-full",
              "px-4",
              "py-2",
              "border",
              "border-gray-300",
              "rounded-lg",
              "focus:outline-none",
              "focus:ring-2",
              "focus:ring-green-500"
            )}
          />
          {errors["Data de Lançamento"] && (
            <p className="text-red-500 text-sm">
              {errors["Data de Lançamento"].message}
            </p>
          )}

          <input
            type="text"
            placeholder="Nome do Autor"
            {...register("Nome do Autor", {
              required: "Nome do Autor é obrigatório.",
              maxLength: {
                value: 50,
                message: "Nome do Autor deve ter no máximo 50 caracteres.",
              },
            })}
            className={clsx(
              "w-full",
              "px-4",
              "py-2",
              "border",
              "border-gray-300",
              "rounded-lg",
              "focus:outline-none",
              "focus:ring-2",
              "focus:ring-green-500"
            )}
          />
          {errors["Nome do Autor"] && (
            <p className="text-red-500 text-sm">
              {errors["Nome do Autor"].message}
            </p>
          )}

          <input
            type="text"
            placeholder="Sobrenome do Autor"
            {...register("Sobrenome do Autor", {
              required: "Sobrenome do Autor é obrigatório.",
              maxLength: {
                value: 79,
                message: "Sobrenome do Autor deve ter no máximo 79 caracteres.",
              },
            })}
            className={clsx(
              "w-full",
              "px-4",
              "py-2",
              "border",
              "border-gray-300",
              "rounded-lg",
              "focus:outline-none",
              "focus:ring-2",
              "focus:ring-green-500"
            )}
          />
          {errors["Sobrenome do Autor"] && (
            <p className="text-red-500 text-sm">
              {errors["Sobrenome do Autor"].message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={clsx(
            "bg-green-500",
            "text-white",
            "px-4",
            "py-2",
            "rounded-lg",
            "w-full",
            "hover:bg-green-600",
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-green-500"
          )}
        >
          Adicionar Livro
        </button>
      </form>
    </div>
  );
};

export default Form;
