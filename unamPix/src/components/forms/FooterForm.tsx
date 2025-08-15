export const FooterForm = () => {
  return (
    <div className="fixed bottom-4 left-4 right-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center border border-gray-200">
        <p className="text-sm text-gray-600">
          Solo estudiantes de la{" "}
          <strong className="font-semibold text-blue-600">
            Universidad Nacional de Moquegua
          </strong>{" "}
          pueden acceder a esta plataforma.
        </p>
      </div>
    </div>
  );
};
