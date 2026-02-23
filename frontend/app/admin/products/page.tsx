'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Package, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Plus,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreVertical,
  Star,
  TrendingUp,
  Tag
} from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  rating: number;
  discount?: number;
  isFeatured: boolean;
  createdAt: string;
}

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Laptop Gamer Pro',
      description: 'Rendimiento extremo para gaming',
      price: 1299.99,
      stock: 12,
      category: 'Electrónica',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80',
      rating: 4.7,
      discount: 15,
      isFeatured: true,
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      name: 'Auriculares Elite',
      description: 'Sonido envolvente con cancelación de ruido',
      price: 249.99,
      stock: 25,
      category: 'Electrónica',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
      rating: 4.5,
      discount: 10,
      isFeatured: true,
      createdAt: '2024-01-09'
    },
    {
      id: '3',
      name: 'Smartwatch Pro',
      description: 'Tu compañero fitness y salud 24/7',
      price: 299.99,
      stock: 18,
      category: 'Wearables',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
      rating: 4.3,
      isFeatured: false,
      createdAt: '2024-01-08'
    },
    {
      id: '4',
      name: 'Cámara Mirrorless',
      description: 'Fotografía profesional con sensor full frame',
      price: 899.99,
      stock: 8,
      category: 'Electrónica',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',
      rating: 4.8,
      discount: 20,
      isFeatured: true,
      createdAt: '2024-01-07'
    },
    {
      id: '5',
      name: 'Zapatillas Running',
      description: 'Tecnología de amortiguación para máximo confort',
      price: 129.99,
      stock: 42,
      category: 'Deportes',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
      rating: 4.4,
      isFeatured: false,
      createdAt: '2024-01-06'
    },
    {
      id: '6',
      name: 'Libro: El Arte de Programar',
      description: 'Edición especial con cubierta dorada',
      price: 49.99,
      stock: 57,
      category: 'Libros',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
      rating: 4.9,
      isFeatured: true,
      createdAt: '2024-01-05'
    },
    {
      id: '7',
      name: 'Perfume Élite',
      description: 'Fragancia premium de larga duración',
      price: 89.99,
      stock: 34,
      category: 'Belleza',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80',
      rating: 4.6,
      discount: 5,
      isFeatured: false,
      createdAt: '2024-01-04'
    },
    {
      id: '8',
      name: 'Silla Gaming Pro',
      description: 'Confort ergonómico para sesiones largas',
      price: 349.99,
      stock: 15,
      category: 'Hogar',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80',
      rating: 4.7,
      isFeatured: true,
      createdAt: '2024-01-03'
    }
  ];

  const categories = [
    'Todos',
    'Electrónica',
    'Moda',
    'Hogar',
    'Deportes',
    'Libros',
    'Belleza',
    'Wearables'
  ];

  useEffect(() => {
    
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  
  const getUniqueCategories = () => {
    const uniqueCategories: string[] = [];
    const seen = new Set<string>();
    
    products.forEach(product => {
      if (!seen.has(product.category)) {
        seen.add(product.category);
        uniqueCategories.push(product.category);
      }
    });
    
    return uniqueCategories;
  };

  const handleDelete = async (productId: string) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        
        console.log('Eliminando producto:', productId);
        setProducts(prev => prev.filter(p => p.id !== productId));
      } catch (error) {
        console.error('Error eliminando producto:', error);
      }
    }
  };

  const handleToggleFeatured = async (productId: string) => {
    try {
      
      setProducts(prev => prev.map(p => 
        p.id === productId ? { ...p, isFeatured: !p.isFeatured } : p
      ));
    } catch (error) {
      console.error('Error actualizando producto:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Gestión de Productos</h1>
          <p className="text-gray-600">Administra tu catálogo de productos</p>
        </div>
        <Link
          href="/admin/products/create"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Nuevo Producto
        </Link>
      </div>

      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(category => (
                <option key={category} value={category === 'Todos' ? 'all' : category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Productos</p>
              <p className="text-2xl font-bold text-gray-800">{products.length}</p>
            </div>
            <div className="p-3 bg-amber-100 rounded-xl">
              <Package className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Destacados</p>
              <p className="text-2xl font-bold text-gray-800">
                {products.filter(p => p.isFeatured).length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">En Stock</p>
              <p className="text-2xl font-bold text-gray-800">
                {products.filter(p => p.stock > 0).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Categorías</p>
              
              <p className="text-2xl font-bold text-gray-800">
                {getUniqueCategories().length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <Tag className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Producto</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Categoría</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Precio</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Stock</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Rating</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Estado</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-800 truncate">{product.name}</p>
                        <p className="text-sm text-gray-600 truncate">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm whitespace-nowrap">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-800">
                        ${product.price.toFixed(2)}
                      </p>
                      {product.discount && product.discount > 0 && (
                        <p className="text-sm text-red-600 whitespace-nowrap">
                          -{product.discount}% descuento
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${product.stock > 10 
                      ? 'bg-green-100 text-green-800' 
                      : product.stock > 0 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 0 ? `${product.stock} unidades` : 'Agotado'}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-medium">{product.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${product.isFeatured ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className="text-sm whitespace-nowrap">
                        {product.isFeatured ? 'Destacado' : 'Normal'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleFeatured(product.id)}
                        className={`p-2 rounded-lg transition-colors ${product.isFeatured 
                          ? 'text-amber-600 hover:bg-amber-50' 
                          : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        title={product.isFeatured ? 'Quitar destacado' : 'Destacar'}
                      >
                        <Star className={`w-4 h-4 ${product.isFeatured ? 'fill-amber-400' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Más opciones"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        {paginatedProducts.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Intenta con otros filtros de búsqueda' 
                : 'Aún no hay productos en tu catálogo'}
            </p>
            <Link
              href="/admin/products/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all"
            >
              <Plus className="w-5 h-5" />
              Crear primer producto
            </Link>
          </div>
        )}

       
        {paginatedProducts.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-gray-600 text-sm">
                Mostrando {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredProducts.length)} de {filteredProducts.length} productos
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === pageNum
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}