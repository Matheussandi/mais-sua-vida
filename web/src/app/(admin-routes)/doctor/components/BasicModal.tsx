"use client";

import { Form } from "@/components/Form";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { v4 as uuidv4 } from "uuid";

const createHistoricFormSchema = z.object({
  descricao: z.string(),
});

export interface HistoryProps {
  id: string;
  data: string | Date;
  descricao: string;
}

interface BasicModalProps {
  isOpen: boolean;
  onClose: () => void;
  setHistory: (
    newHistory:
      | HistoryProps[]
      | ((prevHistory: HistoryProps[]) => HistoryProps[])
  ) => void;
}

type CreateHistoricFormData = z.infer<typeof createHistoricFormSchema>;

export function BasicModal({ isOpen, onClose, setHistory }: BasicModalProps) {
  const pathname = usePathname();

  // Divide o pathname em partes, separando-as pelos caracteres '/'
  const pathParts = pathname.split("/");

  const doctor = pathParts[2];
  const patient = pathParts[4];

  const createHistoricForm = useForm<CreateHistoricFormData>({
    resolver: zodResolver(createHistoricFormSchema),
  });

  async function createHistoric(data: CreateHistoricFormData) {
    try {
      const newId = uuidv4();

      const requestData = {
        data: new Date(),
        descricao: data.descricao,
        idPaciente: patient,
        idMedico: doctor,
      };

      const newHistoryEntry: HistoryProps = {
        id: newId,
        data: requestData.data,
        descricao: requestData.descricao,
      };

      setHistory((prevHistory: HistoryProps[]) => [
        ...prevHistory,
        newHistoryEntry,
      ]);

      await api.post("/historico", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      ("Dados enviados com sucesso");
    } catch (error) {
      console.error("Erro ao enviar os dados", error);
    }
    onClose();
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = createHistoricForm;

  return (
    <div
      className="fixed inset-0 z-10 overflow-y-auto"
      id="error-modal"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <FormProvider {...createHistoricForm}>
            <form
              onSubmit={handleSubmit(createHistoric)}
              className="flex flex-1 flex-col gap-4"
            >
              <div className="flex flex-col">
                <Form.Label>Descrição</Form.Label>
                <Form.TextArea
                  id="descricao"
                  name="descricao"
                  rows={4}
                  cols={4}
                />
                <Form.ErrorMessage field="descricao" />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="rounded-lg bg-primary px-10 py-3 font-bold text-white"
                >
                  Sair
                </button>
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
    </div>
  );
}
