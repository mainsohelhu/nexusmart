import React from 'react';
import { User, Mail, Settings, LogOut, Package, ShieldCheck } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="pt-32 pb-20 px-4 max-w-5xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-indigo-100/50 overflow-hidden mb-12">
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
        <div className="px-10 pb-10">
          <div className="relative -mt-16 mb-6 flex items-end justify-between">
            <div className="w-32 h-32 bg-slate-200 rounded-[2.5rem] border-8 border-white flex items-center justify-center text-4xl font-black text-slate-400 shadow-sm">
              {user?.name?.charAt(0).toUpperCase() || <User size={40} />}
            </div>
            <button 
              onClick={handleLogout}
              className="bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-bold hover:bg-red-600 hover:text-white transition-all flex items-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter">{user?.name || 'Nexus User'}</h1>
              <div className="flex items-center gap-4 mt-2 text-slate-500 font-medium">
                <span className="flex items-center gap-1.5"><Mail size={16} /> {user?.email}</span>
                <span className="flex items-center gap-1.5 text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold">
                  <ShieldCheck size={14} /> Verified Member
                </span>
              </div>
            </div>
            
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-600 transition-all">
              <Settings size={18} /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Profile Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
            <h3 className="text-lg font-black text-slate-900 mb-4">Account Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Total Orders</span>
                <span className="font-bold text-slate-900">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Reviews</span>
                <span className="font-bold text-slate-900">4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content: Recent Activity / Orders */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Package className="text-indigo-600" /> Recent Orders
            </h2>
            <button className="text-indigo-600 font-bold text-sm hover:underline">View All</button>
          </div>

          {/* Sample Order Item */}
          <div className="bg-white border border-slate-100 p-6 rounded-3xl flex items-center justify-between group cursor-pointer hover:border-indigo-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <Package size={24} />
              </div>
              <div>
                <p className="font-bold text-slate-900">ORD-99210</p>
                <p className="text-sm text-slate-400 font-medium">March 14, 2026</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-slate-900">$249.00</p>
              <p className="text-xs font-bold text-emerald-500 uppercase">In Transit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;