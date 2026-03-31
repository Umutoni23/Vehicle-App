import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const success = login(data.email, data.password);
    if (!success) {
      setError('root', { message: 'Invalid credentials' });
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>
          <p className="text-slate-400 text-sm mt-2">Sign in to manage vehicles</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="test@gmail.com"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition
                ${errors.email
                  ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                  : 'border-slate-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400'
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              placeholder="••••••••"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition
                ${errors.password
                  ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                  : 'border-slate-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400'
                }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Invalid credentials error */}
          {errors.root && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <p className="text-red-600 text-sm">{errors.root.message}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
          >
            Sign In
          </button>

        </form>

        {/* Hint */}
        <div className="mt-6 bg-slate-50 rounded-lg px-4 py-3 text-center">
          <p className="text-xs text-slate-400">Use: <span className="font-medium text-slate-600">test@gmail.com</span> / <span className="font-medium text-slate-600">Password!234</span></p>
        </div>

      </div>
    </div>
  );
}