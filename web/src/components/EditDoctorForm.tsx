"use client";

import { useState } from "react";

import { useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const editDoctorFormSchema = z.object({
  // lógica para converter a primeira letra para maísculo
  nome: z
    .string()
    .nonempty("Nome é obrigatório")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  sobrenome: z
    .string()
    .nonempty("Sobrenome é obrigatório")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  email: z
    .string()
    .nonempty("E-mail obrigatório")
    .email("Formato de e-mail inválido")
    .toLowerCase(),
  senha: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(6, "Senha precisa de no mínimo 6 caracteres"),
  cidade: z.string(),
  estado: z.string(),
  CEP: z.string(),
  telefone: z.string().length(13, "Telefone de ter 13 caracteres"),
  idEspecializacao: z.string(),
  CRM: z
    .string()
    .nonempty("CRM é obrigatório")
    .length(12, "CRM deve ter 12 caracteres"),
});

type EditDoctorFormData = z.infer<typeof editDoctorFormSchema>;

export function EditDoctorForm() {
  const searchParams = useSearchParams();

  const search = searchParams.get("doctor");

  const [output, setOutput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditDoctorFormData>({
    resolver: zodResolver(editDoctorFormSchema),
  });

  async function editDoctor(data: EditDoctorFormData) {
    try {
      // Cria um objeto com os dados do formulário
      const requestData = {
        nome: data.nome,
        sobrenome: data.sobrenome,
        email: data.email,
        senha: data.senha,
        cidade: data.cidade,
        estado: data.estado,
        CEP: data.CEP,
        telefone: data.telefone,
        idEspecializacao: data.idEspecializacao,
        CRM: data.CRM,
      };

      // Modifica os dados do médico
      await axios.put(`http://localhost:3333/medico/${search}`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Dados enviados com sucesso");
    } catch (error) {
      console.error("Erro ao enviar os dados", error);
    }

    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <div className="flex-grow p-10">
      <div className="rounded bg-gray-50 p-7">
        <form
          onSubmit={handleSubmit(editDoctor)}
          className="flex flex-1 flex-col gap-4"
        >
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <label className="flex flex-col">
                <span className="text-lg font-medium">Nome:</span>
                <input
                  type="text"
                  className="rounded-lg border border-gray-300 px-4 py-2"
                  {...register("nome")}
                />
                {errors.nome && (
                  <span className="text-red-500">{errors.nome.message}</span>
                )}
              </label>
            </div>
            <div className="flex-1">
              <label className="flex flex-col">
                <span className="text-lg font-medium">Sobrenome:</span>
                <input
                  type="text"
                  className="rounded-lg border border-gray-300 px-4 py-2"
                  {...register("sobrenome")}
                />
                {errors.sobrenome && (
                  <span className="text-red-500">
                    {errors.sobrenome.message}
                  </span>
                )}
              </label>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <label className="flex flex-col">
                <span className="text-lg font-medium">E-mail:</span>
                <input
                  type="email"
                  className="rounded-lg border border-gray-300 px-4 py-2"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </label>
            </div>
            <div className="flex-1">
              <label className="flex flex-col">
                <span className="text-lg font-medium">Telefone:</span>
                <input
                  type="tel"
                  minLength={13}
                  maxLength={13}
                  className="rounded-lg border border-gray-300 px-4 py-2"
                  {...register("telefone")}
                />
                {errors.telefone && (
                  <span className="text-red-500">
                    {errors.telefone.message}
                  </span>
                )}
              </label>
            </div>
          </div>

          <label className="flex flex-col">
            <span className="text-lg font-medium">Senha:</span>
            <input
              type="password"
              className="rounded-lg border border-gray-300 px-4 py-2"
              {...register("senha")}
            />
            {errors.senha && (
              <span className="text-red-500">{errors.senha.message}</span>
            )}
          </label>

          <label className="flex flex-col">
            <span className="text-lg font-medium">CEP:</span>
            <input
              type="text"
              className="rounded-lg border border-gray-300 px-4 py-2"
              {...register("CEP")}
            />
          </label>

          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <label className="flex flex-col">
                <span className="text-lg font-medium">Estado:</span>
                <input
                  type="text"
                  className="rounded-lg border border-gray-300 px-4 py-2"
                  {...register("estado")}
                />
              </label>
            </div>
            <div className="flex-1">
              <label className="flex flex-col">
                <span className="text-lg font-medium">Cidade:</span>
                <input
                  type="text"
                  className="rounded-lg border border-gray-300 px-4 py-2"
                  {...register("cidade")}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <label className="flex flex-col">
                <span className="text-lg font-medium">ID Especialização:</span>
                <input
                  type="text"
                  className="rounded-lg border border-gray-300 px-4 py-2"
                  {...register("idEspecializacao")}
                />
              </label>
            </div>
          </div>

          <label className="flex flex-col">
            <span className="text-lg font-medium">CRM:</span>
            <input
              type="text"
              maxLength={12}
              className="rounded-lg border border-gray-300 px-4 py-2"
              {...register("CRM")}
            />
            {errors.CRM && (
              <span className="text-red-500">{errors.CRM.message}</span>
            )}
          </label>

          <div className="flex justify-end gap-4">
            <button className="rounded-lg bg-primary px-10 py-2 font-bold uppercase text-white hover:bg-blue-600">
              Salvar
            </button>
          </div>
        </form>

        <pre>{output}</pre>
      </div>
    </div>
  );
}
