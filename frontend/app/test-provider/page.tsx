// app/test-provider/page.tsx
'use client';

export default function TestProviderPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test: Provider Hierarchy</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded">
          <h2 className="font-bold text-green-800">✅ Layout correcto</h2>
          <p className="text-sm">AuthProvider está en layout.tsx envolviendo todo</p>
        </div>
        
        <button 
          onClick={() => {
            // Test manual de useAuth
            try {
              const { useAuth } = require('@/contexts/AuthContext');
              const auth = useAuth();
              alert(`useAuth funciona! Usuario: ${auth.user?.name || 'null'}`);
            } catch (error: any) {
              alert(`ERROR: ${error.message}`);
            }
          }}
          className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
        >
          Probar useAuth manualmente
        </button>
      </div>
    </div>
  );
}