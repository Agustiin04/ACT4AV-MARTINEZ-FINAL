'use client';
export default function CategoriesSection() {
  const categories = [
    { name: 'Electrónica', count: 42, color: 'bg-blue-100 text-blue-800' },
    { name: 'Ropa', count: 28, color: 'bg-green-100 text-green-800' },
    { name: 'Hogar', count: 35, color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Deportes', count: 19, color: 'bg-red-100 text-red-800' },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Explora por Categoría</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className={`${cat.color} p-6 rounded-xl text-center shadow hover:shadow-lg transition-shadow cursor-pointer`}
            >
              <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
              <p className="text-lg">{cat.count} productos</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}