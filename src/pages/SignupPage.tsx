// src/pages/SignupPage.tsx
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { registerUser, clearAuthState } from '../features/auth/authSlice';
import SignUpImage from '../assets/images/register.jpg';

interface FormData {
 name: string;
 email: string;
 password: string;
 confirmPassword: string;
}

interface FormErrors {
 name?: string;
 email?: string;
 password?: string;
 confirmPassword?: string;
}

export const SignupPage = () => {
 const [formData, setFormData] = useState<FormData>({
   name: '',
   email: '',
   password: '',
   confirmPassword: '',
 });
 const [errors, setErrors] = useState<FormErrors>({});
 const navigate = useNavigate();
 const dispatch = useDispatch<AppDispatch>();
 const { loading, error, success } = useSelector((state: RootState) => state.auth);

 useEffect(() => {
   if (success) {
     navigate('/login');
   }
   return () => {
     dispatch(clearAuthState());
   };
 }, [success, navigate, dispatch]);

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   if (formData.password !== formData.confirmPassword) {
     setErrors({ confirmPassword: 'Passwords do not match' });
     return;
   }
   dispatch(registerUser(formData));
 };

 const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
   const { name, value } = e.target;
   setFormData(prev => ({ ...prev, [name]: value }));
   if (errors[name as keyof FormErrors]) {
     setErrors(prev => ({ ...prev, [name]: '' }));
   }
 };
  return (
    <div className=" flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          {error && (
       <div className="p-3 mb-4 bg-red-50 rounded-xl">
         <p className="text-sm text-red-600 text-center">{error}</p>
       </div>
     )}
     {loading && (
       <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
         <div className="bg-white p-4 rounded-lg shadow">
           <p>Creating your account...</p>
         </div>
       </div>
     )}
      <div className="max-w-5xl w-full flex bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left side - Info with Image */}
        <div className="w-1/2 bg-blue-600 p-8 flex flex-col">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4 text-white">Start Your Journey with YC Middle East</h2>
            <p className="text-blue-100 mb-8">
              Join our community of innovative founders and get access to world-class resources, 
              mentorship, and funding opportunities to transform your startup idea into reality.
            </p>
            <div className="mt-8">
              <img 
                src={SignUpImage}
                alt="Startup Journey"
                className="rounded-lg shadow-lg w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right side - Signup Form */}
        <div className="w-1/2 p-8">
          <div className="text-center mb-8">
            <div className="inline-block p-2 bg-blue-50 rounded-xl">
              <Building2 className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Create Your Account</h2>
            <p className="text-sm text-gray-600">Join the leading startup accelerator</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Account
            </button>

            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">Already have an account? </span>
              <Link to="/login" className="text-sm text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};