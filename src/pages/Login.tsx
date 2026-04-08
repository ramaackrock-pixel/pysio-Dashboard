import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Fake authentication
    localStorage.setItem('physio_auth', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Physio</h1>
        <p className="text-xs font-semibold text-slate-500 tracking-widest mt-2 uppercase">Health Enterprise</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Welcome back</h2>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5ab2b2] focus:border-transparent transition-shadow sm:text-sm bg-slate-50 focus:bg-white"
                  placeholder="admin@physio.inc"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5ab2b2] focus:border-transparent transition-shadow sm:text-sm bg-slate-50 focus:bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#5ab2b2] focus:ring-[#5ab2b2] border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-slate-600">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-semibold text-[#5ab2b2] hover:text-[#439c9c]">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-[#5ab2b2] hover:bg-[#439c9c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5ab2b2] transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?{' '}
              <a href="#" className="font-semibold text-[#5ab2b2] hover:text-[#439c9c]">
                Contact administration
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
