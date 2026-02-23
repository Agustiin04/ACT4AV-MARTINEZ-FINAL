'use client';
import ProductCard from '@/components/products/ProductCard';

export default function FeaturedProducts() {
  const featuredProducts = [
    { id: '1', name: 'Producto Ejemplo 1', description: 'Descripción 1', price: 29.99, image: '/api/placeholder/300/200', rating: 4.5, stock: 10 },
    { id: '2', name: 'Producto Ejemplo 2', description: 'Descripción 2', price: 49.99, image: '/api/placeholder/300/200', rating: 4.0, stock: 5 },
    { id: '3', name: 'Producto Ejemplo 3', description: 'Descripción 3', price: 19.99, image: '/api/placeholder/300/200', rating: 5.0, stock: 0 },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Productos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}