import clsx from "clsx";
import { useEffect } from "react";
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
  const authorId = location.state?.authorId;
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const authorAdd = {
      firstName: data.Nome,
      lastName: data.Sobrenome,
    };

    if (!isEditing) {
      api
        .post("/authors", authorAdd)
        .then(() => {
          //throw new Error();
          toast.success("Autor adicionado com sucesso!");
          reset();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Erro ao adicionar o autor.");
        });
    } else if (isEditing) {
      api
        .put(`/authors/${authorId}`, authorAdd)
        .then(() => {
          //throw new Error();
          toast.success("Autor alterado com sucesso!");
          // reset();
          navigate("/authors");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Erro ao alterar o autor.");
        });
    }
  };

  useEffect(() => {
    if (isEditing) {
      api
        .get(`/authors/${authorId}`)
        .then((response) => {
          const { firstName, lastName } = response.data;
          setValue("Nome", firstName);
          setValue("Sobrenome", lastName);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setValue("Nome", "");
      setValue("Sobrenome", "");
    }
  }, [isEditing, authorId, setValue]);

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
          <label className={clsx(labelCSS)}>Nome</label>
          <input
            type="text"
            placeholder="Nome"
            {...register("Nome", { required: "Nome é obrigatório." })}
            className={clsx(inputCSS)}
          />
          {errors.Nome && (
            <p className="text-red-500 text-sm">{errors.Nome.message}</p>
          )}
          <label className={clsx(labelCSS)}>Sobrenome</label>
          <input
            type="text"
            placeholder="Sobrenome"
            {...register("Sobrenome", { required: "Sobrenome é obrigatório." })}
            className={clsx(inputCSS)}
          />
          {errors.Nome && (
            <p className="text-red-500 text-sm">{errors.Sobrenome.message}</p>
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
          {isEditing ? "Atualizar Autor" : "Adicionar Autor"}
        </button>
      </form>
    </div>
  );
};

export default Form;
