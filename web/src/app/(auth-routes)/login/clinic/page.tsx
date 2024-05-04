"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signIn } from "next-auth/react"
import { Form } from "@/components/Form";

type FormValues = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string()
});

export default function LoginClinic() {
  const router = useRouter();

  const loginClinicForm = useForm<FormValues>({resolver: zodResolver(schema)});
  
  const { control, handleSubmit, formState: { errors } } = loginClinicForm;

  async function onSubmit({ email, password }: FormValues) {
    const result = await signIn('credentials', {
      email,
      password,
      route: 'clinica',
      redirect: false
    })

    if (result?.error) {
      alert('E-mail ou senha inválidos')
      return
    }

    router.replace('/clinic')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Clínica</h1>
      <p className="my-10 text-sm text-gray-600">
        Acesse a plataforma inserindo suas credenciais
      </p>
      <FormProvider {...loginClinicForm}>
        <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) =>
                <>
                  <Form.Field>
                    <div className="flex flex-1 flex-col">
                      <Form.Label>E-mail:</Form.Label>
                      <Form.Input {...field} />
                      <Form.ErrorMessage field="email" />
                    </div>
                  </Form.Field>
                </>
              }
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) =>
                <>
                  <Form.Field>
                    <div className="flex flex-1 flex-col">
                      <Form.Label>Senha:</Form.Label>
                      <Form.InputPassword {...field} />
                      <Form.ErrorMessage field="password" />
                    </div>
                  </Form.Field>
                </>
              }
            />
          </div>

          <div className="flex flex-col items-center mt-4">
            <button
              className="focus:shadow-outline mb-4 w-full rounded bg-primary px-4 py-2 text-white transition duration-300 hover:bg-blue-500"
              type="submit"
            >
              Entrar
            </button>

            <Link
              className="inline-block align-baseline text-sm font-bold text-primary hover:text-blue-500"
              href="/"
            >
              Sair
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}