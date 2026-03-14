import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore'; // 1. Import the store hook

const ProductCard = ({ product }) => {
  // 2. Initialize the addToCart function from our store
  const addToCart = useCartStore((state) => state.addToCart);

  // 3. Handle the click event
  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevents the Link from navigating
    addToCart(product); // Adds the item to Zustand state
  };

  return (
    <Link to={`/product/${product._id}`} className="block group">
      <div className="relative bg-white border border-slate-100 rounded-3xl p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2">
        
        {/* Image Container */}
        <div className="relative h-64 w-full bg-slate-50 rounded-2xl overflow-hidden mb-4">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-slate-700">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            {product.rating}
          </div>
        </div>

        {/* Content */}
        <div className="px-2">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{product.category}</span>
          <h3 className="text-lg font-syne font-bold text-slate-900 mt-1 mb-2 line-clamp-1">{product.name}</h3>
          
          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-sm text-slate-400 block font-medium">Price</span>
              <span className="text-xl font-black text-slate-900">${product.price}</span>
            </div>
            
            {/* 4. Update the button with the onClick handler */}
            <button 
              onClick={handleAddToCart}
              className="relative z-30 bg-slate-900 text-white p-3 rounded-xl hover:bg-indigo-600 transition-colors duration-300 group-hover:rotate-12 active:scale-90"
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;