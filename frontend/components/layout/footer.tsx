export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">E-Shop</h3>
            <p className="text-gray-400">
              Tu tienda online confiable con los mejores productos y precios competitivos.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/products" className="hover:text-white transition">Productos</a></li>
              <li><a href="/about" className="hover:text-white transition">Sobre nosotros</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contacto</a></li>
              <li><a href="/faq" className="hover:text-white transition">Preguntas frecuentes</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categorías</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/category/electronics" className="hover:text-white transition">Electrónica</a></li>
              <li><a href="/category/audio" className="hover:text-white transition">Audio</a></li>
              <li><a href="/category/wearables" className="hover:text-white transition">Wearables</a></li>
              <li><a href="/category/computers" className="hover:text-white transition">Computadoras</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <p className="text-gray-400">
              📧 info@eshop.com<br />
              📞 +1 234 567 890<br />
              🏢 Calle Falsa 123, Ciudad
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 E-Shop - Trabajo Final Plataformas de Desarrollo. Todos los derechos reservados.</p>
          <p className="mt-2 text-sm">Desarrollado con Next.js, Express, Prisma y SQLite</p>
        </div>
      </div>
    </footer>
  );
}