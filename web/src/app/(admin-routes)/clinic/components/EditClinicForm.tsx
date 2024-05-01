"use client";

import { useCallback, useEffect, useState, ChangeEvent } from "react";

import Image from "next/image";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useRouter } from "next/navigation";

import { MediaPicker } from "@/components/MediaPicker";

import { api } from "@/lib/api";
import { MdModeEdit } from "react-icons/md";

import PhotoClinic from "../../../../assets/photoClinic.png";
import { Form } from "@/components/Form";
import { FaRegUserCircle } from "react-icons/fa";

const editClinicFormSchema = z.object({
  nome: z.string().nonempty("Nome é obrigatório"),
  senha: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(6, "Senha precisa de no mínimo 6 caracteres"),
  CNPJ: z.string().nonempty("CNPJ é obrigatório"),
  email: z.string().nonempty("Email é obrigatório").email("Email inválido"),
  cidade: z.string().nonempty("Cidade é obrigatória"),
  estado: z.string().nonempty("Estado é obrigatório"),
  CEP: z.string().nonempty("CEP é obrigatório"),
  telefone: z.string(),
});

type EditClinicFormProps = {
  id: string;
}

type EditClinicFormData = z.infer<typeof editClinicFormSchema>;

export function EditClinicForm({ id }: EditClinicFormProps) {
  const [isModificationSuccessful, setIsModificationSuccessful] =
    useState(false);
  const [formData, setFormData] = useState<EditClinicFormData>({
    nome: "",
    senha: "",
    CNPJ: "",
    email: "",
    cidade: "",
    estado: "",
    CEP: "",
    telefone: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [clinicImageUrl, setClinicImageUrl] = useState<string | null>(null);


  const [output, setOutput] = useState("");

  const editClinicForm = useForm<EditClinicFormData>({
    resolver: zodResolver(editClinicFormSchema),
    defaultValues: formData,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = editClinicForm;

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files || files.length === 0) {
      return;
    }

    setSelectedImage(files[0]);
  };

  async function editClinic(data: EditClinicFormData) {
    try {
      const formData = new FormData();

      if (selectedImage) {
        formData.append("clinicImage", selectedImage);
      }

      for (const key in data) {
        // Verifica se a chave é uma propriedade direta de 'data'
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          // Adiciona a chave (key) e o valor correspondente de 'data' ao 'formData'
          // Utiliza a notação de índice ['key'] para acessar dinamicamente a propriedade de 'data'
          formData.append(key, data[key as keyof EditClinicFormData]);
        }
      }

      await api.put(`/clinica/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Dados atualizados com sucesso!");
      window.location.reload();
    } catch (error) {
      alert("Erro ao enviar os dados");
      console.error("Erro ao enviar os dados", error);
    }

    setOutput(JSON.stringify(data, null, 2));
  }

  const handleGetRegisteredData = useCallback(async () => {
    try {
      const response = await api.get(`/clinica/${id}`);
      const clinicData = await response.data;

      if (clinicData.clinicImage) {
        const urlBaseDasImagens = "http://localhost:3333/uploads/";
        const imageComplete = `${urlBaseDasImagens}${clinicData.clinicImage}`;
        setClinicImageUrl(imageComplete);
      }

      const { senha, ...restClinicData } = clinicData;
      setFormData(restClinicData);

      editClinicForm.reset(restClinicData);
    } catch (error) {
      alert("Erro ao buscar dados da API");
      console.error("Erro ao buscar dados da API:", error);
    }
  }, [editClinicForm, id]);

  useEffect(() => {
    handleGetRegisteredData();
  }, [handleGetRegisteredData]);

  return (
    <div className="flex-grow p-10">
      <div className="rounded bg-gray-50 p-7">
        <FormProvider {...editClinicForm}>
          <form
            onSubmit={handleSubmit(editClinic)}
            className="flex flex-1 flex-col gap-4"
          >
            <div className="flex items-center">
              <label
                htmlFor="media"
                className="h-100 w-100 relative cursor-pointer overflow-hidden"
              >
                {selectedImage ? (
                  <Image
                    src={URL.createObjectURL(selectedImage)}
                    width={130}
                    height={130}
                    alt="Imagem da clínica"
                    className="h-40 w-40 rounded-full object-cover"
                  />
                ) : (
                  clinicImageUrl ? (
                    <Image
                      src={clinicImageUrl}
                      width={130}
                      height={130}
                      alt="Imagem da clínica padrão"
                      className="h-40 w-40 rounded-full object-cover"
                    />
                  ) : (
                    <FaRegUserCircle className="h-40 w-40 rounded-full object-cover" />
                  )
                )}

                <Form.Input
                  onChange={handleFileInput}
                  name="doctorImage"
                  type="file"
                  id="media"
                  accept="image/*"
                  className="invisible h-0 w-0"
                />
                <div className="absolute bottom-8 right-0 rounded-full bg-primary p-2">
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
                <Form.Label>Senha</Form.Label>
                <Form.InputPassword name="senha" />
                <Form.ErrorMessage field="senha" />
              </div>
            </Form.Field>

            <Form.Field>
              <div className="flex flex-1 flex-col">
                <Form.Label>CNPJ</Form.Label>
                <Form.Input type="text" name="CNPJ" maxLength={14} />
                <Form.ErrorMessage field="CNPJ" />
              </div>
            </Form.Field>

            {/* Add the email field here */}
            <Form.Field>
              <div className="flex flex-1 flex-col">
                <Form.Label>Email</Form.Label>
                <Form.Input type="text" name="email" />
                <Form.ErrorMessage field="email" />
              </div>
            </Form.Field>

            <Form.Field>
              <div className="flex flex-1 flex-col">
                <Form.Label>Cidade</Form.Label>
                <Form.Input type="text" name="cidade" />
                <Form.ErrorMessage field="cidade" />
              </div>

              <div className="flex flex-1 flex-col">
                <Form.Label>Estado</Form.Label>
                <Form.Input type="text" name="estado" maxLength={2}/>
                <Form.ErrorMessage field="estado" />
              </div>
            </Form.Field>

            <Form.Field>
              <div className="flex flex-1 flex-col">
                <Form.Label>CEP</Form.Label>
                <Form.Input type="text" name="CEP" maxLength={8} />
                <Form.ErrorMessage field="CEP" />
              </div>

              <div className="flex flex-1 flex-col">
                <Form.Label>Telefone</Form.Label>
                <Form.Input type="text" name="telefone" maxLength={12} />
                <Form.ErrorMessage field="telefone" />
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
      </div>
    </div>
  );
}