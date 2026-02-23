'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X, Star, ShoppingCart, ChevronDown, Sparkles, Loader2 } from 'lucide-react';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  stock: number;
  category: string;
  isFeatured?: boolean;
  discount?: number;
  tags?: string[];
}


const mockProducts: Product[] = [
  {
    id: "1",
    name: "Laptop Gamer Pro",
    description: "Rendimiento extremo con RTX 4070 y procesador i9",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
    rating: 4.7,
    stock: 12,
    category: "Electrónica",
    isFeatured: true,
    discount: 15,
    tags: ["Gaming", "Nuevo", "Destacado"]
  },
  {
    id: "2", 
    name: "Auriculares Elite",
    description: "Sonido envolvente con cancelación de ruido activa",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    rating: 4.5,
    stock: 25,
    category: "Electrónica",
    discount: 10,
    tags: ["Audio", "Inalámbrico"]
  },
  {
    id: "3",
    name: "Smartwatch Pro",
    description: "Monitoreo de salud 24/7 con GPS integrado",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    rating: 4.3,
    stock: 18,
    category: "Wearables",
    tags: ["Fitness", "Nuevo"]
  },
  {
    id: "4",
    name: "Cámara Mirrorless",
    description: "Fotografía profesional con sensor full frame",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    rating: 4.8,
    stock: 8,
    category: "Electrónica",
    discount: 20,
    tags: ["Fotografía", "Profesional"]
  },
  {
    id: "5",
    name: "Zapatillas Running",
    description: "Tecnología de amortiguación para máximo confort",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    rating: 4.4,
    stock: 42,
    category: "Deportes",
    tags: ["Running", "Comfort"]
  },
  {
    id: "6",
    name: "Libro: El Arte de Programar",
    description: "Edición especial con cubierta dorada",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
    rating: 4.9,
    stock: 57,
    category: "Libros",
    isFeatured: true,
    tags: ["Programación", "Edición Especial"]
  }
];

const categories = [
  "Todos",
  "Electrónica", 
  "Moda",
  "Hogar",
  "Deportes",
  "Libros",
  "Belleza",
  "Wearables"
];

const sortOptions = [
  { label: "Más relevantes", value: "relevant" },
  { label: "Precio: menor a mayor", value: "price_asc" },
  { label: "Precio: mayor a menor", value: "price_desc" },
  { label: "Mejor valorados", value: "rating" },
  { label: "Más nuevos", value: "newest" },
  { label: "En oferta", value: "discount" }
];

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('relevant');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const applyFilters = useCallback(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'Todos') {
      result = result.filter(product => product.category === selectedCategory);
    }

    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (selectedTags.length > 0) {
      result = result.filter(product =>
        product.tags?.some(tag => selectedTags.includes(tag))
      );
    }

    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.reverse();
        break;
      case 'discount':
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
    }

    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategory, sortBy, priceRange, selectedTags]);

 
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);


  useEffect(() => {
    setLoading(true);
    
    fetch('http://localhost:3001/api/products')
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
    setPriceRange([0, 2000]);
    setSelectedTags([]);
    setSortBy('relevant');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white">
     
      <section className="relative bg-gradient-to-br from-amber-700 via-orange-700 to-rose-800 text-white overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-sm">✨ Colección exclusiva de productos dorados</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Mercado <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">Dorado</span>
            </h1>
            
            <p className="text-xl text-amber-100 mb-8 max-w-2xl">
              Descubre productos seleccionados con la más alta calidad. Tecnología, moda, hogar y más, todo con el sello Aurea.
            </p>
          </div>
        </div>
      </section>

     
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
         
          <aside className="lg:w-1/4">
            <div className="hidden lg:block sticky top-24">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Filtros</h3>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-amber-600 hover:text-amber-800 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" /> Limpiar
                  </button>
                </div>

              
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buscar producto
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearch}
                      placeholder="Nombre, descripción..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

              
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Categorías</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-all ${selectedCategory === category 
                          ? 'bg-gradient-to-r from-amber-100 to-orange-50 text-amber-700 border border-amber-200' 
                          : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {category}
                        {category !== 'Todos' && (
                          <span className="float-right text-gray-400 text-sm">
                            {products.filter(p => p.category === category).length}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Rango de Precio</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500"
                    />
                  </div>
                </div>

                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Etiquetas</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Nuevo', 'Destacado', 'Oferta', 'Gaming', 'Inalámbrico', 'Profesional'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all ${selectedTags.includes(tag)
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Mostrando <span className="font-bold text-amber-600">{filteredProducts.length}</span> de{' '}
                    <span className="font-bold">{products.length}</span> productos
                  </p>
                </div>
              </div>
            </div>

            
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden w-full mb-4 bg-white border border-amber-200 text-amber-700 px-6 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Filter className="w-5 h-5" />
              Filtrar Productos
              <ChevronDown className="w-4 h-4" />
            </button>
          </aside>

         
          <main className="lg:w-3/4">
            
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-amber-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {selectedCategory === 'Todos' ? 'Todos los productos' : selectedCategory}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {filteredProducts.length === products.length 
                      ? `Mostrando todos los ${products.length} productos`
                      : `${filteredProducts.length} productos encontrados`
                    }
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <button className="p-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
                <p className="text-gray-600">Cargando productos dorados...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-amber-100">
                <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No se encontraron productos</h3>
                <p className="text-gray-600 mb-6">
                  No hay productos que coincidan con tu búsqueda. Prueba con otros filtros.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
                >
                  Ver todos los productos
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto animate-slideIn">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Filtros</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              

              
              <div className="mt-8 space-y-4">
                <button
                  onClick={resetFilters}
                  className="w-full border border-amber-200 text-amber-700 px-6 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-all"
                >
                  Limpiar filtros
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-md"
                >
                  Aplicar filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}