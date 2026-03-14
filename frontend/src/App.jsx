import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Register from './pages/Register';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute'; // 1. IMPORT THIS
import useProductStore from './store/useProductStore'; // 2. IMPORT STORE
import { fetchProducts } from './api';

function App() {
  const { products, setProducts, searchQuery } = useProductStore(); // Use global store
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await fetchProducts();
        setProducts(data); // Save to Zustand store
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    getProducts();
  }, [setProducts]);

  // 3. LIVE SEARCH FILTER LOGIC
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-20">
          <Routes>
            {/* HOME PAGE ROUTE */}
            <Route path="/" element={
              <>
                <Hero />
                <section className="max-w-7xl mx-auto px-4 py-20">
                  <h2 className="text-4xl font-syne font-black text-slate-900 mb-12">
                    {searchQuery ? `Results for "${searchQuery}"` : "Featured Gear"}
                  </h2>

                  {loading ? (
                    <div className="text-center py-20 font-bold text-slate-400 animate-pulse">
                      Loading Nexus Collection...
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                          <ProductCard key={product._id} product={product} />
                        ))
                      ) : (
                        <div className="col-span-full text-center py-20 text-slate-400">
                          No gear matches your search 🛸
                        </div>
                      )}
                    </div>
                  )}
                </section>
              </>
            } />

            {/* OTHER ROUTES */}
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<Success />} />
            
            {/* PROTECTED PROFILE ROUTE */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;