"use client";

import { api } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect } from "react";
import { MdModeEdit } from "react-icons/md";

import ImageMedico from "../../../../assets/doctor1.png";

export default function NewDoctor() {
  const router = useRouter();

  async function handleCreateDoctor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    await api.post("/medico", {
      nome: formData.get("nome"),
      sobrenome: formData.get("sobrenome"),
      CRM: formData.get("CRM"),
      doctorImage: formData.get("doctorImage"),
      email: formData.get("email"),
      senha: formData.get("senha"),
      cidade: formData.get("cidade"),
      estado: formData.get("estado"),
      CEP: formData.get("CEP"),
      telefone: formData.get("telefone"),
      idEspecializacao: formData.get("idEspecializacao"),
      idClinica: formData.get("idClinica"),
    });

    router.push("/");
  }

  // Está sendo pré-renderizado apenas o primeiro médico
  useEffect(() => {}, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <form
        onSubmit={handleCreateDoctor}
        className="flex flex-1 flex-col gap-4"
      >
        <div className="flex items-center">
          <div className="relative h-20 w-20 overflow-hidden rounded">
            <Image
              src={ImageMedico}
              width={100}
              height={100}
              alt="Imagem do médico"
              className="h-full w-full object-cover"
            />
            <button>
              <div className="absolute bottom-0 right-0 rounded-full bg-primary p-1">
                <MdModeEdit color="#fff" />
              </div>
            </button>
          </div>
          <div className="ml-4">
            <span className="text-lg font-medium">Foto de perfil</span>
            <div>
              <span className="text-base text-gray-600">
                Isso será exibido em seu perfil.
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <label className="flex flex-col">
              <span className="text-lg font-medium">Nome:</span>
              <input
                type="text"
                name="nome"
                className="rounded-lg border border-gray-300 px-4 py-2"
              />
            </label>
          </div>
          <div className="flex-1">
            <label className="flex flex-col">
              <span className="text-lg font-medium">Especialidade:</span>
              <input
                type="text"
                name="especialidade"
                className="rounded-lg border border-gray-300 px-4 py-2"
              />
            </label>
          </div>
        </div>

        <label className="flex flex-col">
          <span className="text-lg font-medium">Sobre:</span>
          <textarea
            name="sobre"
            className="resize-none rounded-lg border border-gray-300 px-4 py-2"
            rows={4}
          ></textarea>
        </label>

        <label className="flex flex-col">
          <span className="text-lg font-medium">Experiência:</span>
          <input
            type="text"
            name="experiencia"
            className="rounded-lg border border-gray-300 px-4 py-2"
          />
        </label>

        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <label className="flex flex-col">
              <span className="text-lg font-medium">Formação:</span>
              <input
                type="text"
                name="formacao"
                className="rounded-lg border border-gray-300 px-4 py-2"
              />
            </label>
          </div>
          <div className="flex-1">
            <label className="flex flex-col">
              <span className="text-lg font-medium">Idiomas:</span>
              <input
                type="text"
                name="idiomas"
                className="rounded-lg border border-gray-300 px-4 py-2"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <label className="flex flex-col">
              <span className="text-lg font-medium">Serviços:</span>
              <input
                type="text"
                name="servicos"
                className="rounded-lg border border-gray-300 px-4 py-2"
              />
            </label>
          </div>
          <div className="flex-1">
            <label className="flex flex-col">
              <span className="text-lg font-medium">CRM:</span>
              <input
                type="text"
                name="crm"
                className="rounded-lg border border-gray-300 px-4 py-2"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button className="rounded-lg bg-gray-500 px-10 py-2 font-bold uppercase text-white hover:bg-gray-600">
            Cancelar
          </button>
          <button className="rounded-lg bg-primary px-10 py-2 font-bold uppercase text-white hover:bg-blue-600">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
