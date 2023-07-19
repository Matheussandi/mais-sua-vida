"use client";

import { FormEvent, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { MdModeEdit } from "react-icons/md";
import { api } from "@/lib/api";

import PhotoClinic from "../../../../assets/photoClinic.png";
import { MediaPicker } from "@/components/MediaPicker";

export default function Settings() {
  const searchParams = useSearchParams();

  const search = searchParams.get("clinicId");

  const router = useRouter();

  async function handleCreateDoctor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Falta adicionar a imagem.

    await api.put(`/clinica/${search}`, {
      nome: formData.get("nome"),
      telefone: formData.get("telefone"),
      email: formData.get("email"),
      senha: formData.get("senha"),
      CNPJ: formData.get("CNPJ"),
      CEP: formData.get("CEP"),
      estado: formData.get("estado"),
      cidade: formData.get("cidade"),
    });

    router.push("/");
  }

  // Está sendo pré-renderizado apenas o primeiro médico
  useEffect(() => {}, []);

  return (
    <div className="m-10 flex-grow">
      <div className="rounded bg-gray-50">
        <div className="flex flex-1 flex-col gap-4 p-7">
          <form
            onSubmit={handleCreateDoctor}
            className="flex flex-1 flex-col gap-4"
          >
            <div className="flex items-center">
              <MediaPicker />
              <label
                htmlFor="media"
                className="h-100 w-100 relative cursor-pointer overflow-hidden"
              >
                <Image
                  src={PhotoClinic}
                  width={130}
                  height={130}
                  alt="Imagem do médico"
                  className="h-full w-full rounded-full object-cover"
                />

                <div className="absolute bottom-0 right-0 rounded-full bg-primary p-2">
                  <MdModeEdit color="#fff" />
                </div>
              </label>

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
              <div className="flex-grow">
                <label className="flex flex-col">
                  <span className="text-lg font-medium">Nome:</span>
                  <input
                    type="text"
                    name="nome"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2"
                  />
                </label>
              </div>
              <div className="flex">
                <label className="flex flex-col">
                  <span className="text-lg font-medium">Telefone:</span>
                  <input
                    type="tel"
                    name="telefone"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-row gap-4">
              <div className="flex-1">
                <label className="flex flex-col">
                  <span className="text-lg font-medium">E-mail:</span>
                  <input
                    type="email"
                    name="email"
                    className="rounded-lg border border-gray-300 px-4 py-2"
                  />
                </label>
              </div>
              <div className="flex-1">
                <label className="flex flex-col">
                  <span className="text-lg font-medium">Senha:</span>
                  <input
                    type="password"
                    name="senha"
                    className="rounded-lg border border-gray-300 px-4 py-2"
                  />
                </label>
              </div>
              <div className="flex-1">
                <label className="flex flex-col">
                  <span className="text-lg font-medium">CNPJ:</span>
                  <input
                    type="text"
                    name="CNPJ"
                    className="rounded-lg border border-gray-300 px-4 py-2"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-row gap-4">
              <div className="flex-1">
                <label className="flex flex-col">
                  <span className="text-lg font-medium">CEP:</span>
                  <input
                    type="text"
                    name="CEP"
                    className="rounded-lg border border-gray-300 px-4 py-2"
                  />
                </label>
              </div>
              <div className="flex-1">
                <label className="flex flex-col">
                  <span className="text-lg font-medium">Estado:</span>
                  <input
                    type="text"
                    name="estado"
                    className="rounded-lg border border-gray-300 px-4 py-2"
                  />
                </label>
              </div>
              <div className="flex-1">
                <label className="flex flex-col">
                  <span className="text-lg font-medium">Cidade:</span>
                  <input
                    type="text"
                    name="cidade"
                    className="rounded-lg border border-gray-300 px-4 py-2"
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              {/*               <button className="rounded-lg bg-gray-500 px-10 py-2 font-bold uppercase text-white hover:bg-gray-600">
                Cancelar
              </button> */}
              <button className="rounded-lg bg-primary px-10 py-2 font-bold uppercase text-white hover:bg-blue-600">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
