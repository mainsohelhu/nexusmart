import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import useProductStore from '../store/useProductStore'; // 1. Import Product Store

const Navbar = () => {
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  // 2. Get Search state and setter
  const { searchQuery, setSearchQuery } = useProductStore();

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-slate-900">
          NEXUS<span className="text-indigo-600">MART</span>
        </Link>

        {/* Search Bar - Now Functional */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 bg-slate-100 rounded-full px-4 py-2 items-center focus-within:ring-2 focus-within:ring-indigo-600/20 focus-within:bg-white transition-all">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery} // 3. Bind to state
            onChange={(e) => setSearchQuery(e.target.value)} // 4. Update as you type
            className="bg-transparent border-none outline-none ml-2 w-full text-sm text-slate-600"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-slate-600 hover:text-indigo-600 transition-colors">
            <User size={24} />
          </Link>
          
          <Link to="/cart" className="relative text-slate-600 hover:text-indigo-600 transition-colors">
            <ShoppingCart size={24} />
            
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                {totalItems}
              </span>
            )}
          </Link>

          <button className="md:hidden text-slate-600">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;