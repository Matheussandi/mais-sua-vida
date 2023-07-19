import { getPatientById } from "../../../../../../services/get-patient-by-id";

import Image from "next/image";

import Retangle from "../../../../../../assets/Rectangle.svg";
import Patient from "../../../../../../assets/doctor1.png";

interface PatientId {
  params: {
    patientId: string;
  };
}

interface PatientProps {
  id: string;
  nome: string;
  sobrenome: string;
}

export default async function Historic({ params }: PatientId) {
  const patient: PatientProps = await getPatientById(params.patientId);

  return (
    <div className="flex-grow p-10">
      <div className="relative rounded bg-gray-50 ">
        <div className="relative">
          <Image
            src={Retangle}
            alt=""
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 transform">
            <Image
              src={Patient}
              alt=""
              width={120}
              height={120}
              className="rounded-full"
              style={{ border: "6px solid white" }}
            />
            <h1 className="my-2 text-2xl font-extrabold">{`${patient.nome} ${patient.sobrenome}`}</h1>
          </div>
        </div>

        <div className="p-7">
          <div className="mt-12 flex flex-col">
            <div className="relative max-h-80 max-w-screen-xl overflow-y-scroll">
              <ul className="divide-y divide-gray-300">
                <li className="py-2">
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                    <p className="ml-3 font-medium text-gray-500">
                      10 de Julho de 2023
                    </p>
                  </div>
                  <p className="ml-7 text-gray-800">
                    Lorem ipsum dolor sit amet. Et omnis dolorem 33 expedita
                    sequi hic minus tenetur vel perferendis perferendis? Qui
                    dolor error et autem architecto aut nulla doloremque cum
                    voluptate deserunt quo rerum culpa sit totam reprehenderit
                    qui eveniet excepturi. Et omnis velit qui officiis quaerat
                    qui possimus alias qui cumque ullam aut labore impedit.
                  </p>
                </li>
                <li className="py-2">
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                    <p className="ml-3 font-medium text-gray-500">
                      15 de Julho de 2023
                    </p>
                  </div>
                  <p className="ml-7 text-gray-800">
                    Lorem ipsum dolor sit amet. Et omnis dolorem 33 expedita
                    sequi hic minus tenetur vel perferendis perferendis? Qui
                    dolor error et autem architecto aut nulla doloremque cum
                    voluptate deserunt quo rerum culpa sit totam reprehenderit
                    qui eveniet excepturi. Et omnis velit qui officiis quaerat
                    qui possimus alias qui cumque ullam aut labore impedit.
                  </p>
                </li>
                <li className="py-2">
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                    <p className="ml-3 font-medium text-gray-500">
                      15 de Julho de 2023
                    </p>
                  </div>
                  <p className="ml-7 text-gray-800">
                    Lorem ipsum dolor sit amet. Et omnis dolorem 33 expedita
                    sequi hic minus tenetur vel perferendis perferendis? Qui
                    dolor error et autem architecto aut nulla doloremque cum
                    voluptate deserunt quo rerum culpa sit totam reprehenderit
                    qui eveniet excepturi. Et omnis velit qui officiis quaerat
                    qui possimus alias qui cumque ullam aut labore impedit.
                  </p>
                </li>
                <li className="py-2">
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                    <p className="ml-3 font-medium text-gray-500">
                      15 de Julho de 2023
                    </p>
                  </div>
                  <p className="ml-7 text-gray-800">
                    Realizada a análise de sangue. Resultados dentro dos
                    parâmetros normais.
                  </p>
                </li>
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-center">
              <button className="rounded-lg bg-primary px-16 py-5 font-bold text-white ">
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
