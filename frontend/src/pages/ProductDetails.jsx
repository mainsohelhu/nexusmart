import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, ShieldCheck, Truck, Star } from 'lucide-react';
import axios from 'axios';
import useCartStore from '../store/useCartStore';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]); // State for suggestions
  
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products`);
        
        // 1. Find current product
        const found = data.find((p) => p._id === id);
        setProduct(found);

        // 2. Filter for related products (Same category, exclude current ID)
        if (found) {
          const related = data.filter(
            (p) => p.category === found.category && p._id !== id
          );
          setRelatedProducts(related.slice(0, 4)); // Show top 4
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
    // Scroll to top whenever ID changes
    window.scrollTo(0, 0);
  }, [id]); // Re-run when ID changes

  const handleAddToCart = () => {
    if (product) addToCart(product);
  };

  if (!product) return <div className="pt-40 text-center font-bold">Finding the perfect gear...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/" className="flex items-center text-slate-500 hover:text-indigo-600 mb-8 transition-colors group">
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold ml-1">Back to Shop</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Product Image */}
        <div className="bg-slate-50 rounded-[3rem] p-12 flex items-center justify-center border border-slate-100">
          <img src={product.image} alt={product.name} className="w-full h-auto max-h-[500px] object-contain" />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-2">{product.category}</span>
          <h1 className="text-5xl font-syne font-black text-slate-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-6 mb-8">
            <span className="text-3xl font-black text-slate-900">${product.price}</span>
            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-lg text-yellow-700 font-bold text-sm">
              <Star size={16} className="fill-yellow-700" /> {product.rating}
            </div>
          </div>

          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            Experience the next generation of {product.category} with the {product.name}. 
            Crafted for performance and designed for the modern lifestyle.
          </p>

          <button 
            onClick={handleAddToCart}
            className="bg-slate-900 text-white w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-indigo-100 mb-8"
          >
            <ShoppingCart /> Add to Cart
          </button>

          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded-lg text-slate-600"><Truck size={20} /></div>
              <span className="text-sm font-bold text-slate-500">Free Shipping</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded-lg text-slate-600"><ShieldCheck size={20} /></div>
              <span className="text-sm font-bold text-slate-500">2 Year Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS SECTION */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-slate-100 pt-16">
          <h2 className="text-3xl font-syne font-black text-slate-900 mb-10">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <Link key={item._id} to={`/product/${item._id}`} className="group">
                <div className="bg-slate-50 rounded-3xl p-6 mb-4 border border-transparent group-hover:border-indigo-100 group-hover:bg-white transition-all duration-300">
                  <img src={item.image} alt={item.name} className="h-40 w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-bold text-slate-900 truncate">{item.name}</h3>
                <p className="text-indigo-600 font-black">${item.price}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;