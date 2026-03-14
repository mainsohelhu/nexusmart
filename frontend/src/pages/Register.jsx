import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const { register, loading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData.name, formData.email, formData.password, formData.phone);
    if (result) setSuccessMsg(result.message);
  };

  if (successMsg) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-xl text-center">
        <div className="text-6xl mb-4">📧</div>
        <h2 className="text-2xl font-black mb-4">Verify Your Email</h2>
        <p className="text-slate-600 mb-6">{successMsg}</p>
        <Link to="/login" className="text-indigo-600 font-bold">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
      <h2 className="text-3xl font-black mb-6">Create Account</h2>
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm font-bold">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" placeholder="Full Name" required
          className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20"
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input 
          type="email" placeholder="Email Address" required
          className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="password" placeholder="Password" required
          className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <button 
          disabled={loading}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Register;