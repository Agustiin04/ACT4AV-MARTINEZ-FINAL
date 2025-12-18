'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
  console.log('🔍 Iniciando login...');
  
  try {
    
    const url = 'http://localhost:5000/api/auth/login';
    console.log('📡 Conectando a:', url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    console.log('📊 Response status:', response.status, response.statusText);
    
    
    if (response.status === 0) {
      throw new Error('No se puede conectar al servidor. Verifica que el backend esté corriendo en http://localhost:5000');
    }
    
    
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error('❌ Error parseando JSON:', parseError);
      throw new Error(`Respuesta inválida del servidor: ${await response.text()}`);
    }
    
    if (!response.ok) {
      throw new Error(data.error || `Error ${response.status}: ${response.statusText}`);
    }

    console.log('✅ Login exitoso!', data.user);
    
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    setToken(data.token);
    setUser(data.user);
    
   
    router.push('/dashboard');
    
  } catch (error: any) {
    console.error('❌ Error completo en login:', error);
    
    
    let errorMessage = error.message;
    
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      errorMessage = 'No se puede conectar al servidor. Asegúrate que: 1) El backend esté corriendo en http://localhost:5000, 2) No haya problemas de firewall, 3) El servidor acepte conexiones desde http://localhost:3000';
    }
    
    throw new Error(errorMessage);
  }
};

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en registro');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setToken(data.token);
      setUser(data.user);
      
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    router.push('/');
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}