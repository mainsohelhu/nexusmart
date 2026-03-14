import React, { useEffect } from 'react';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';

const Success = () => {
  const clearCart = useCartStore((state) => state.clearCart);

  // Clear the cart automatically when they land here
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-2xl shadow-indigo-100 text-center border border-slate-100">
        
        {/* Animated Icon Container */}
        <div className="relative flex justify-center mb-8">
          <div className="absolute inset-0 bg-emerald-100 rounded-full scale-150 blur-2xl opacity-50 animate-pulse" />
          <div className="relative bg-emerald-500 text-white p-6 rounded-full shadow-lg shadow-emerald-200">
            <CheckCircle size={48} strokeWidth={3} />
          </div>
        </div>

        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">Order Confirmed!</h1>
        <p className="text-slate-500 font-medium mb-8">
          Your gear is being prepped for shipment. We've sent a receipt to your email.
        </p>

        {/* Order Details Preview */}
        <div className="bg-slate-50 rounded-3xl p-6 mb-8 flex items-center gap-4 text-left">
          <div className="bg-white p-3 rounded-2xl shadow-sm text-indigo-600">
            <Package size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Est. Delivery</p>
            <p className="font-bold text-slate-800">March 20 - March 22</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            to="/profile" 
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
          >
            Track Order <ArrowRight size={18} />
          </Link>
          
          <Link 
            to="/" 
            className="w-full bg-white text-slate-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:text-indigo-600 transition-all"
          >
            <Home size={18} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;