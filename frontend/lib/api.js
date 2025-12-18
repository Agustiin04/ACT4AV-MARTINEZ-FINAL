const API_URL = 'http://localhost:5000/api';

export async function fetchProducts(filters = {}) {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${API_URL}/products?${params}`);
  if (!response.ok) throw new Error('Error al cargar productos');
  return response.json();
}

export async function fetchProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error('Producto no encontrado');
  return response.json();
}

export async function createProduct(productData, token) {
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
}

export async function updateProduct(id, productData, token) {
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
}

export async function deleteProduct(id, token) {
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
}

export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error en login');
  }
  
  return response.json();
}

export async function register(userData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error en registro');
  }
  
  return response.json();
}
