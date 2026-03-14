import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, error

  useEffect(() => {
    const verify = async () => {
      try {
        await axios.get(`http://localhost:5000/api/users/verify/${token}`);
        setStatus('success');
      } catch (err) {
        setStatus('error');
      }
    };
    verify();
  }, [token]);

  return (
    <div className="max-w-md mx-auto mt-40 p-10 bg-white rounded-[3rem] shadow-2xl text-center border border-slate-50">
      {status === 'verifying' && <h2 className="text-2xl font-black animate-pulse">Verifying your account...</h2>}
      
      {status === 'success' && (
        <>
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-3xl font-black mb-4">Email Verified!</h2>
          <p className="text-slate-500 mb-8 font-bold">Your account is now fully active. You can now shop the latest gear.</p>
          <Link to="/login" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg inline-block">Go to Login</Link>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="text-6xl mb-6">❌</div>
          <h2 className="text-3xl font-black mb-4">Invalid Link</h2>
          <p className="text-slate-500 mb-8 font-bold">This link is expired or has already been used.</p>
          <Link to="/register" className="text-indigo-600 font-black">Try Registering Again</Link>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;