"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { useForm, FormProvider, set } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "../../../components/Form";
import { api } from "@/lib/api";
import Image from "next/image";
import { MdModeEdit } from "react-icons/md";
import { MediaPicker } from "@/components/MediaPicker";

import doctoUm from "../../../assets/doctor1.png";

interface SpecializationProps {
  id: string;
  nome: string;
}

const editDoctorFormSchema = z.object({
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
  sobre: z.string().max(500, "O texto não pode ter mais de 500 caracteres"),
  experiencia: z
    .string()
    .max(500, "O texto não pode ter mais de 500 caracteres"),
  idEspecializacao: z.string(),
  idClinica: z.string(),
  CRM: z
    .string()
    .nonempty("CRM é obrigatório")
    .length(12, "CRM deve ter 12 caracteres"),
});

type EditDoctorFormData = z.infer<typeof editDoctorFormSchema>;

export function EditDoctorForm() {
  const [isModificationSuccessful, setIsModificationSuccessful] =
    useState(false);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [specializations, setSpecializations] = useState<
    { value: string; label: string }[]
  >([]);

  const [formData, setFormData] = useState<EditDoctorFormData>({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    sobre: "",
    experiencia: "",
    idEspecializacao: "",
    idClinica: "",
    CRM: "",
  });

  const searchParams = useSearchParams();
  const search = searchParams.get("doctor");
  const [output, setOutput] = useState("");

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files || files.length === 0) {
      return;
    }

    const previewURL = URL.createObjectURL(files[0]);

    setSelectedImage(previewURL);
  };

  const editDoctorForm = useForm<EditDoctorFormData>({
    resolver: zodResolver(editDoctorFormSchema),
    defaultValues: formData,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = editDoctorForm;

  async function editDoctor(data: EditDoctorFormData) {
    try {
      await api.put(`/medico/${search}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Dados enviados com sucesso");
      setOutput(JSON.stringify(data, null, 2));

      setIsModificationSuccessful(true);
    } catch (error) {
      console.error("Erro ao enviar os dados", error);
    }
  }

  const handleGetRegisteredData = useCallback(async () => {
    try {
      const response = await api.get(`/medico/${search}`);
      const doctor = await response.data;

      if (doctor.doctorImage) {
        const imageComplete = `${process.env.NEXT_PUBLIC_API_IMAGE}/${doctor.doctorImage}`;
        setSelectedImage(imageComplete);
      }

      const { senha, ...restDoctorData } = doctor;
      setFormData(restDoctorData);

      editDoctorForm.reset(restDoctorData);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  }, [search, editDoctorForm]);

  useEffect(() => {
    handleGetRegisteredData();
  }, [handleGetRegisteredData]);

  useEffect(() => {
    async function fetchSpecializations() {
      try {
        const response = await api.get<SpecializationProps[]>(
          "/especializacao"
        );
        const specializationOptions = response.data.map((specialization) => ({
          value: specialization.id,
          label: specialization.nome,
        }));
        setSpecializations(specializationOptions);
      } catch (error) {
        console.error("Error fetching specializations", error);
      }
    }

    fetchSpecializations();
  }, []);

  return (
    <div className="flex-grow p-10">
      <div className="rounded bg-gray-50 p-7">
        <FormProvider {...editDoctorForm}>
          <form
            onSubmit={handleSubmit(editDoctor)}
            className="flex flex-1 flex-col gap-4"
          >
            <div className="flex items-center">
              <label
                htmlFor="media"
                className="h-100 w-100 relative cursor-pointer overflow-hidden"
              >
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    width={130}
                    height={130}
                    alt="Imagem do médico"
                    className="h-40 w-40 rounded-full object-cover"
                  />
                ) : (
                  <Image
                    src={doctoUm}
                    width={130}
                    height={130}
                    alt="Imagem do médico"
                    className="h-40 w-40 rounded-full object-cover"
                  />
                )}
                <input
                  onChange={handleFileInput}
                  name="doctorImage"
                  type="file"
                  id="media"
                  accept="image/*"
                  className="invisible h-0 w-0"
                />
                <div className="absolute bottom-6 right-0 rounded-full bg-primary p-2">
                  <MdModeEdit color="#fff" />
                </div>
              </label>

              <MediaPicker />
              <div className="ml-4">
                <span className="text-lg font-medium">Foto de perfil</span>
                <div>
                  <span className="text-base text-gray-600">
                    Isso será exibido em seu perfil.
                  </span>
                </div>
              </div>
            </div>

            <Form.Field>
              <div className="flex flex-1 flex-col">
                <Form.Label>Nome</Form.Label>
                <Form.Input type="text" name="nome" />
                <Form.ErrorMessage field="nome" />
              </div>

              <div className="flex flex-1 flex-col">
                <Form.Label>Sobrenome</Form.Label>
                <Form.Input type="text" name="sobrenome" />
                <Form.ErrorMessage field="sobrenome" />
              </div>
            </Form.Field>

            <Form.Field>
              <div className="flex flex-1 flex-col">
                <Form.Label>CRM</Form.Label>
                <Form.Input type="text" name="CRM" maxLength={12} />
                <Form.ErrorMessage field="CRM" />
              </div>
            </Form.Field>

            <Form.Field>
              <div className="flex flex-1 flex-col">
                <Form.Label>E-mail</Form.Label>
                <Form.Input type="email" name="email" />
                <Form.ErrorMessage field="email" />
              </div>

              <div className="flex flex-1 flex-col">
                <Form.Label>Senha</Form.Label>
                <Form.Input type="password" name="senha" />
                <Form.ErrorMessage field="senha" />
              </div>
            </Form.Field>

            <div className="flex flex-col">
              <Form.Label>Sobre</Form.Label>
              <Form.TextArea id="sobre" name="sobre" rows={3} cols={3} />
              <Form.ErrorMessage field="sobre" />
            </div>

            <div className="flex flex-col">
              <Form.Label>Experiência</Form.Label>
              <Form.TextArea
                id="experiencia"
                name="experiencia"
                rows={3}
                cols={3}
              />
              <Form.ErrorMessage field="experiencia" />
            </div>

            <Form.Field>
              <div className="flex flex-1 flex-col">
                <Form.Label>Especialização</Form.Label>
                <Form.Select
                  name="idEspecializacao"
                  options={specializations}
                  value={watch("idEspecializacao") || ""}
                />
                <Form.ErrorMessage field="idEspecializacao" />
              </div>
            </Form.Field>

            <div className="flex items-center justify-end gap-4">
              {isModificationSuccessful && (
                <span className="font-bold text-green-600">
                  Modificação realizada com sucesso!
                </span>
              )}
              <button
                disabled={isSubmitting}
                className="rounded-lg bg-primary px-10 py-2 font-bold uppercase text-white hover:bg-blue-600"
              >
                Salvar
              </button>
            </div>
          </form>
        </FormProvider>

        {/* <pre>{output}</pre> */}
      </div>
    </div>
  );
}
