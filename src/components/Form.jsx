import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { inputCSS, labelCSS } from "../Helpers";
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
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const bookAdd = {
      title: data.Título,
      description: data.Descrição,
      excerpt: data.Sinopse,
      pageCount: Number(data["Número de Páginas"]),
      publishDate: data["Data de Lançamento"],
      idAuthor: data.Autor,
    };

    if (!isEditing) {
      api
        .post("/books", bookAdd)
        .then(() => {
          //throw new Error();
          toast.success("Livro adicionado com sucesso!");
          reset();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Erro ao adicionar o livro.");
        });
    } else if (isEditing) {
      api
        .put(`/books/${bookId}`, bookAdd)
        .then(() => {
          //throw new Error();
          toast.success("Livro alterado com sucesso!");
          // reset();
          navigate("/books");
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
        <div>
          <label className={clsx(labelCSS)}>Título</label>
          <input
            type="text"
            placeholder="Título"
            {...register("Título", { required: "Título é obrigatório." })}
            className={clsx(inputCSS)}
          />
          {errors.Título && (
            <p className="text-red-500 text-sm">{errors.Título.message}</p>
          )}
          <label className={clsx(labelCSS)}>Descrição</label>
          <textarea
            placeholder="Descrição"
            {...register("Descrição", { required: "Descrição é obrigatória." })}
            className={clsx(inputCSS)}
          />
          {errors.Descrição && (
            <p className="text-red-500 text-sm">{errors.Descrição.message}</p>
          )}
          <label className={clsx(labelCSS)}>Sinopse</label>
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
          <label className={clsx(labelCSS)}>Número de Páginas</label>
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
          <label className={clsx(labelCSS)}>Data de Lançamento</label>
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
          <label className={clsx(labelCSS)}>Autor</label>
          <select
            {...register("Autor", {
              required: "Autor é obrigatório.",
            })}
            className={clsx(inputCSS)}
          >
            <option value="">Selecione um autor</option>
            {authors?.map((element) => {
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
        </div>
        <button
          type="submit"
          className={clsx(
            "bg-green-400",
            "text-white",
            "px-4",
            "py-2",
            "rounded-lg",
            "w-full",
            "hover:bg-green-300",
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-green-300"
          )}
        >
          {isEditing ? "Atualizar Livro" : "Adicionar Livro"}
        </button>
      </form>
    </div>
  );
};

export default Form;
