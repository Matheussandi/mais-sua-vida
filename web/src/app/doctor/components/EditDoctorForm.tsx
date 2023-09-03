"use client";

import { useCallback, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "../../../components/Form";
import { api } from "@/lib/api";

const editDoctorFormSchema = z.object({
  // Lógica para converter a primeira letra para maísculo
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
  sobre: z.string(),
  experiencia: z.string(),
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
      // Modifica os dados do médico
      await api.put(`/medico/${search}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Dados enviados com sucesso");
      setOutput(JSON.stringify(data, null, 2));

      // Define o estado como verdadeiro para mostrar a mensagem de sucesso
      setIsModificationSuccessful(true);
    } catch (error) {
      console.error("Erro ao enviar os dados", error);
    }
  }

  // Utilizei useCallback para garantir que useEffect tenha acesso atualizado ao editDoctorForm
  // useCallback é usado para memorizar a função handleGetRegisteredData,
  // garantindo que ela tenha acesso à instância mais recente de editDoctorForm e evitando recriações desnecessárias.
  const handleGetRegisteredData = useCallback(async () => {
    try {
      const response = await api.get(`/medico/${search}`);
      const doctor = await response.data;

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

  return (
    <div className="flex-grow p-10">
      <div className="rounded bg-gray-50 p-7">
        <FormProvider {...editDoctorForm}>
          <form
            onSubmit={handleSubmit(editDoctor)}
            className="flex flex-1 flex-col gap-4"
          >
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

              {/* A senha está com hash */}
              <div className="flex flex-1 flex-col">
                <Form.Label>Senha</Form.Label>
                <Form.Input type="password" name="senha" />
                <Form.ErrorMessage field="senha" />
              </div>
            </Form.Field>

            <div className="flex flex-col">
              <Form.Label>Sobre</Form.Label>
              <Form.TextArea id="sobre" name="sobre" rows={4} cols={4} />
              <Form.ErrorMessage field="sobre" />
            </div>

            <div className="flex flex-col">
              <Form.Label>Experiência</Form.Label>
              <Form.TextArea
                id="experiencia"
                name="experiencia"
                rows={4}
                cols={4}
              />
              <Form.ErrorMessage field="experiencia" />
            </div>

            <Form.Field>
              <div className="flex flex-1 flex-col">
                <Form.Label>ID Especialização</Form.Label>
                <Form.Input type="text" name="idEspecializacao" />
                <Form.ErrorMessage field="idEspecializacao" />
              </div>

              <div className="flex flex-1 flex-col">
                <Form.Label>ID Clínica</Form.Label>
                <Form.Input type="text" name="idClinica" />
                <Form.ErrorMessage field="idClinica" />
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

        <pre>{output}</pre>
      </div>
    </div>
  );
}
