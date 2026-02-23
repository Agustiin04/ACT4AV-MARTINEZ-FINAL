import axios from 'axios';
import { Product } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const productService = {
 
  async getProducts(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    featured?: boolean;
  }) {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.featured) params.append('featured', 'true');
    
    const response = await axios.get(`${API_URL}/products?${params}`);
    return response.data.data;
  },


  async getProductById(id: string): Promise<Product> {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data.data;
  },

 
  async createProduct(productData: Partial<Product>, token: string) {
    const response = await axios.post(`${API_URL}/products`, productData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data;
  },

  
  async updateProduct(id: string, productData: Partial<Product>, token: string) {
    const response = await axios.put(`${API_URL}/products/${id}`, productData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data;
  },

  
  async deleteProduct(id: string, token: string) {
    const response = await axios.delete(`${API_URL}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  
  async uploadImage(file: File): Promise<string> {
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUrl = `https://via.placeholder.com/300?text=${encodeURIComponent(file.name)}`;
        resolve(mockUrl);
      }, 1000);
    });
  }
};