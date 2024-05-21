import { FaPaperPlane } from "react-icons/fa";

export function Newsletter() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-primary rounded-3xl py-12 px-8 md:py-24 md:px-64 flex flex-col items-center">
        <h2 className="text-white font-bold text-center text-2xl md:text-4xl">
          Inscreva-se para acesso beta
        </h2>
        <p className="text-white mb-5 text-center">
          Vamos enviar um e-mail com o link de acesso à versão beta da plataforma.
        </p>
        <form className="flex flex-col">
          <div className="relative">
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="bg-white rounded-lg py-3 px-4 mb-4 w-full md:w-80 lg:w-96 outline-none"
            />
            <button
              type="submit"
              className="bg-primary text-white rounded-lg py-2 px-4 absolute top-0 right-0 mt-2 mr-2"
            >
              <FaPaperPlane />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
