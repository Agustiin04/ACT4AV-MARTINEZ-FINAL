import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

export function useProducts(filters = {}) {
  const { token } = useAuth();
  
  const queryKey = ['products', filters];
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await fetch(`${API_URL}/products?${params}`);
      if (!response.ok) throw new Error('Error al cargar productos');
      return response.json();
    },
  });

  return {
    products: data || [],
    isLoading,
    error,
    refetch,
  };
}

export function useProduct(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products/${id}`);
      if (!response.ok) throw new Error('Producto no encontrado');
      return response.json();
    },
    enabled: !!id,
  });

  return {
    product: data,
    isLoading,
    error,
  };
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: async (productData) => {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al crear producto');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('Producto creado exitosamente');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: async ({ id, ...productData }) => {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al actualizar producto');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('Producto actualizado exitosamente');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al eliminar producto');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('Producto eliminado exitosamente');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
