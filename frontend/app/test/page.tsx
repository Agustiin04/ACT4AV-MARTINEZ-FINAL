export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        ¡Tailwind funciona!
      </h1>
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        Si ves esto con estilos, Tailwind está funcionando.
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Botón de prueba
      </button>
    </div>
  );
}