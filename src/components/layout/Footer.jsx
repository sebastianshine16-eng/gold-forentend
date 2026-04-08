import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-serif tracking-widest uppercase">GOLD</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Handcrafting authentic men's jewelry since 1995. We believe in quality, tradition, and the modern spirit.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 text-brandGold">Customer Care</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Gift Cards</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Warranty</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 text-brandGold">The Company</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-white transition-colors">Our Story</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Sustainability</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Craftsmanship</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Journal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 text-brandGold">Newsletter</h4>
          <p className="text-sm text-gray-400 mb-4">Subscribe to receive updates and exclusive offers.</p>
          <div className="flex border-b border-gray-700 py-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-transparent text-sm w-full outline-none"
            />
            <button className="text-[10px] uppercase tracking-widest font-bold text-brandGold">Join</button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-500 gap-4">
        <p>© 2026 GOLD JEWELRY. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-8">
          <Link to="/">Instagram</Link>
          <Link to="/">Twitter</Link>
          <Link to="/">Facebook</Link>
        </div>
      </div>
    </footer>
  );
}
