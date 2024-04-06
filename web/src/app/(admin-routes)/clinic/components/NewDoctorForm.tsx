"use client";

import { useForm, FormProvider } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";

import Image from "next/image";

import { MdModeEdit } from "react-icons/md";

import { MediaPicker } from "@/components/MediaPicker";
import ImageMedico from "../../../../assets/doctor1.png";
import { api } from "@/lib/api";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Form } from "@/components/Form";

interface SpecializationProps {
  id: string;
  nome: string;
}

const createDoctorFormSchema = z.object({
  nome: z
    .string()
    .nonempty({ message: "Nome é obrigatório" })
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
    .nonempty({ message: "Sobrenome é obrigatório" })
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
    .nonempty({ message: "E-mail obrigatório" })
    .email("Formato de e-mail inválido")
    .toLowerCase(),
  senha: z
    .string()
    .nonempty({ message: "Senha é obrigatória" })
    .min(6, "Senha precisa de no mínimo 6 caracteres"),
  sobre: z.string().max(500, 'O texto não pode ter mais de 500 caracteres'),
  experiencia: z.string().max(500, 'O texto não pode ter mais de 500 caracteres'),
  idEspecializacao: z
    .string()
    .nonempty({ message: "Especialização é obrigatória" }),
  CRM: z
    .string()
    .nonempty({ message: "CRM é obrigatório" })
    .length(12, "CRM deve ter 12 caracteres"),
});

type NewDoctorFormProps = {
  clinicId: string;
};

type CreateDoctorFormData = z.infer<typeof createDoctorFormSchema>;

export function NewDoctorForm({ clinicId }: NewDoctorFormProps) {
  const [isModificationSuccessful, setIsModificationSuccessful] =
    useState(false);

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [specializations, setSpecializations] = useState<
    { value: string; label: string }[]
  >([]);

  const [output, setOutput] = useState("");

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files || files.length === 0) {
      return;
    }

    // const previewURL = URL.createObjectURL(files[0]);

    setSelectedImage(files[0]);
  };

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

  const createDoctorForm = useForm<CreateDoctorFormData>({
    resolver: zodResolver(createDoctorFormSchema),
  });

  async function createDoctor(data: CreateDoctorFormData) {
    try {
      const formData = new FormData();

      if (selectedImage) {
        formData.append("doctorImage", selectedImage);
      }

      const requestData = {
        nome: data.nome,
        sobrenome: data.sobrenome,
        CRM: data.CRM,
        email: data.email,
        senha: data.senha,
        sobre: data.sobre,
        experiencia: data.experiencia,
        doctorImage: selectedImage,
        idEspecializacao: data.idEspecializacao,
        idClinica: clinicId,
      };

      await api.post("/medico", requestData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsModificationSuccessful(true);
    } catch (error) {
      alert("Erro ao enviar os dados");
      console.error("Erro ao enviar os dados", error);
    }

    setOutput(JSON.stringify(data, null, 2));
  }

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = createDoctorForm;

  return (
    <main className="h-screen p-16">
      <FormProvider {...createDoctorForm}>
        <form
          onSubmit={handleSubmit(createDoctor)}
          className="flex flex-1 flex-col gap-4"
        >
          <div className="flex items-center">
            <label
              htmlFor="media"
              className="h-100 w-100 relative cursor-pointer overflow-hidden"
            >
              {/* Renderizar a imagem selecionada, imagem fixa ou espaço reservado */}
              {selectedImage ? (
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  width={130}
                  height={130}
                  alt="Imagem do médico"
                  className="h-40 w-40 rounded-full object-cover"
                />
              ) : (
                <Image
                  src={ImageMedico}
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

          <div className="mb-4 flex justify-end gap-4">
            {isModificationSuccessful && (
              <span className="font-bold text-green-600">
                Cadastro realizadao com sucesso!
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

        {/* <pre>{output}</pre> */}
      </FormProvider>
    </main>
  );
}