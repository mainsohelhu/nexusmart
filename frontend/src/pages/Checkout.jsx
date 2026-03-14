import React, { useState } from 'react';
import { CreditCard, Truck, ShieldCheck, ChevronRight, Loader2 } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart } = useCartStore();
  const navigate = useNavigate();
  
  // Local state for the loading spinner
  const [isProcessing, setIsProcessing] = useState(false);

  // Logic for totals
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 100 ? 0 : 15; 
  const tax = subtotal * 0.08; 
  const total = subtotal + shipping + tax;

  const handleCompleteOrder = () => {
    setIsProcessing(true); // Start the spinner

    // Simulate a 2-second network delay (mimicking a bank transaction)
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/order-success');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 text-center">
        <h2 className="text-2xl font-black">Your cart is empty.</h2>
        <Link to="/" className="text-indigo-600 font-bold mt-4 inline-block underline">Go shopping</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-black text-slate-900 mb-10 tracking-tighter">Checkout.</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Forms */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Shipping Section */}
          <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Truck className="text-indigo-600" />
              <h2 className="text-xl font-bold">Shipping Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20" />
              <input type="text" placeholder="Last Name" className="p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20" />
              <input type="text" placeholder="Address" className="md:col-span-2 p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20" />
              <input type="text" placeholder="City" className="p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20" />
              <input type="text" placeholder="Postal Code" className="p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20" />
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-indigo-600" />
              <h2 className="text-xl font-bold">Payment Method</h2>
            </div>
            <div className="p-6 border-2 border-indigo-600 rounded-2xl bg-indigo-50/50 flex justify-between items-center">
              <span className="font-bold text-slate-700">Credit or Debit Card</span>
              <div className="flex gap-2">
                <div className="w-8 h-5 bg-slate-300 rounded" />
                <div className="w-8 h-5 bg-slate-300 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] sticky top-28">
            <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">
                    {item.name} <span className="text-white ml-1">x{item.qty}</span>
                  </span>
                  <span className="font-bold">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <hr className="border-slate-800 mb-6" />

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400 text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-sm">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-emerald-400" : ""}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-400 text-sm">
                <span>Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-black pt-4">
                <span>Total</span>
                <span className="text-indigo-400">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Complete Order Button with Loader */}
            <button 
              onClick={handleCompleteOrder}
              disabled={isProcessing}
              className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 group shadow-xl 
                ${isProcessing 
                  ? 'bg-slate-700 cursor-not-allowed text-slate-400' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/40 active:scale-95'
                }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 size={22} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Complete Order
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 mt-6 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
              <ShieldCheck size={14} className="text-emerald-500" />
              Secure Encrypted Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;