"use client";

import Link from "next/link";
import { getDoctorById } from "../../../../services/get-doctor-by-id";

import { useState } from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { MdModeEdit } from "react-icons/md";
import { api } from "@/lib/api";

import ImageMedico from "../assets/doctor1.png";
import { MediaPicker } from "@/components/MediaPicker";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

interface DoctorId {
  params: {
    id: string;
  };
}

interface DoctorProps {
  id: string;
  nome: string;
  sobrenome: string;
  CRM: string;
  especializacao: {
    nome: string;
  };
  image: string;
}

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
  CRM: z
    .string()
    .nonempty("CRM é obrigatório")
    .length(12, "CRM deve ter 12 caracteres"),
});

type EditDoctorFormData = z.infer<typeof editDoctorFormSchema>;

export default async function DoctorEdit({ params }: DoctorId) {
  // const doctor: DoctorProps = await getDoctorById(params.id);

  console.log(params.id)

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
        CRM: data.CRM,
      };

      // Envie os dados para a API
      await axios.put(
        `http://localhost:3333/medico/`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
