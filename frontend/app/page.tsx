import Navbar from "@/components/layout/navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🛒 Mini E-commerce
          </h1>
          <p className="text-lg text-gray-600">
            Trabajo Final - Plataformas de Desarrollo
          </p>
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
            <p className="text-gray-700">
              Backend: Express + Prisma + SQLite | Frontend: Next.js + TypeScript
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}