import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';

const CartPage = () => {
  // 1. Pull decreaseQty from the store
  const { cart, addToCart, removeFromCart, decreaseQty } = useCartStore();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-40 text-center">
        <h2 className="text-3xl font-syne font-black text-slate-900 mb-4">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Looks like you haven't added any gear to your Nexus collection yet.</p>
        <Link to="/" className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-700 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-syne font-black text-slate-900 mb-12">Your Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center gap-6 bg-white border border-slate-100 p-6 rounded-3xl">
              <div className="w-24 h-24 bg-slate-50 rounded-2xl flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-900">{item.name}</h3>
                <p className="text-indigo-600 font-black">${item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl">
                {/* 2. Fixed Minus Button */}
                <button
                  onClick={() => decreaseQty(item._id)}
                  className="text-slate-600 hover:text-red-500 transition-colors active:scale-90"
                >
                  <Minus size={18} />
                </button>

                <span className="font-bold w-4 text-center">{item.qty}</span>

                {/* 3. Plus Button */}
                <button
                  onClick={() => addToCart(item)}
                  className="text-slate-600 hover:text-indigo-600 transition-colors active:scale-90"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-slate-300 hover:text-red-500 transition-colors p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-slate-50 rounded-[2.5rem] p-8 h-fit sticky top-32">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Summary</h2>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-slate-600 font-medium">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600 font-medium">
              <span>Shipping</span>
              <span className="text-emerald-500 font-bold">Free</span>
            </div>
            <div className="border-t border-slate-200 pt-4 flex justify-between text-xl font-black text-slate-900">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Change the button to a Link */}
          <Link
            to="/checkout"
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100"
          >
            Checkout <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;