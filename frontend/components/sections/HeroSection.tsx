'use client';
export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4 text-center">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Bienvenido a Nuestra Tienda
        </h1>
        <p className="text-xl mb-8">
          Descubre los mejores productos con descuentos exclusivos
        </p>
        <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition">
          Comprar Ahora
        </button>
      </div>
    </section>
  );
}