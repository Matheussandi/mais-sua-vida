export default function NotFound() {
  return (
    <div className="flex-grow p-10">
      <div className="relative rounded p-7">
        <div className="doctor-info">
          <h1 className="text-3xl font-bold text-gray-900">Página não encontrada</h1>
          <p className="text-gray-500 mt-2">
            A página que você está procurando não foi encontrada.
          </p>
        </div>
      </div>
    </div>
  );
}