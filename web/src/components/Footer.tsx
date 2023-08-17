export function Footer() {
  return (
    <footer className="py-8" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-x-6">
          <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
            <h2 className="text-xl font-bold mb-2 text-primary">+Sua Vida</h2>
            <p className="mr-0 lg:mr-12 text-justify">
              Este aplicativo gratuito fornece uma solução para suas
              necessidades de saúde, oferecendo a você acesso único às
              informações de agendamento, consultas e exames médicos.
            </p>
          </div>
          <div className="w-full">
            <div className="flex flex-wrap justify-between gap-2">
              <div className="flex flex-col gap-2 w-full md:w-1/2 lg:w-auto mb-4 lg:mb-0">
                <h3 className="text-lg font-bold mb-2">Sobre</h3>
                <a href="#" className="hover:text-primary">
                  Home
                </a>
                <a href="#" className="hover:text-primary">
                  Política de Privacidade
                </a>
                <a href="#" className="hover:text-primary">
                  Termos e condições
                </a>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-1/2 lg:w-auto mb-4 lg:mb-0">
                <h3 className="text-lg font-bold mb-2">Clínicas</h3>
                <a href="#" className="hover:text-primary">
                  Serviços
                </a>
                <a href="#" className="hover:text-primary">
                  Gerencia consultas
                </a>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-1/2 lg:w-auto mb-4 lg:mb-0">
                <h3 className="text-lg font-bold mb-2">Pacientes</h3>
                <a href="#" className="hover:text-primary">
                  Cookies
                </a>
                <a href="#" className="hover:text-primary">
                  Encontre médicos
                </a>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-1/2 lg:w-auto">
                <h3 className="text-lg font-bold mb-2">Baixe o app</h3>
                <div className="flex flex-col gap-2 ">
                  <a href="#" className="mr-2 hover:text-primary">
                    Google Play Store
                  </a>
                  <a href="#" className="hover:text-primary">
                    App Stores
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
