import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BsStars } from "react-icons/bs";

export default function Plans() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col justify-between gap-8 sm:flex-row">
        <div className="flex h-72 w-full flex-col rounded-lg bg-gray-100 p-6 sm:w-96">
          <h2 className="mb-4 mt-4 text-center text-3xl font-bold">Básico</h2>
          <p className="text-center text-xl font-semibold">
            <span className="text-4xl">R$59,99</span>/mês
          </p>
          <ul className="mt-4 list-disc">
            <li className="flex items-center">
              <AiOutlineCheck color="#0079FF" className="mr-2" />
              <span>Recurso 1</span>
            </li>
            <li className="flex items-center">
              <AiOutlineClose className="mr-2 text-red-500" />
              <span>Recurso 2</span>
            </li>
            <li className="flex items-center">
              <AiOutlineCheck color="#0079FF" className="mr-2" />
              <span>Recurso 3</span>
            </li>
            <li className="flex items-center">
              <AiOutlineCheck color="#0079FF" className="mr-2" />
              <span>Recurso 4</span>
            </li>
          </ul>
          <button className="mt-4 rounded-lg bg-gray-400 px-4 py-2 text-white hover:bg-primary">
            Plano Atual
          </button>
        </div>

        <div className="relative flex h-72 w-full flex-col rounded-lg border-4 border-primary bg-gray-100 p-6 sm:w-96">
          <span className="absolute left-0 top-0 flex w-full justify-center rounded-tr bg-primary px-2 py-1 font-semibold uppercase text-white">
            Mais Popular
            <BsStars className="mx-2" />
          </span>
          <h2 className="mb-4 mt-4 text-center text-3xl font-bold">Premium</h2>
          <p className="text-center text-xl font-semibold">
            <span className="text-4xl">R$119,99</span>/mês
          </p>
          <ul className="mt-4 list-disc">
            <li className="flex items-center">
              <AiOutlineCheck color="#0079FF" className="mr-2" />
              <span>Recurso 1</span>
            </li>
            <li className="flex items-center">
              <AiOutlineCheck color="#0079FF" className="mr-2" />
              <span>Recurso 2</span>
            </li>
            <li className="flex items-center">
              <AiOutlineCheck color="#0079FF" className="mr-2" />
              <span>Recurso 3</span>
            </li>
            <li className="flex items-center">
              <AiOutlineCheck color="#0079FF" className="mr-2" />
              <span>Recurso 4</span>
            </li>
          </ul>
          <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-white hover:bg-blue-600">
            Assinar
          </button>
        </div>
      </div>
    </div>
  );
}
