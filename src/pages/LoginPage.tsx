import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearAuthState } from '../features/auth/authSlice';
import { AppDispatch, RootState } from '../store/store';
import loginImage from '../assets/images/download.jpg';

interface FormData {
 email: string;
 password: string;
}

interface FormErrors {
 email?: string;
 password?: string;
}

export const LoginPage = () => {
 const [formData, setFormData] = useState<FormData>({
   email: '',
   password: '',
 });
 const [errors, setErrors] = useState<FormErrors>({});
 const navigate = useNavigate();
 const dispatch = useDispatch<AppDispatch>();
 const { loading, error, success,isAdmin } = useSelector((state: RootState) => state.auth);

// components/LoginPage.tsx
useEffect(() => {
  if (success) {
    if (isAdmin) {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }
  }
}, [success, isAdmin, navigate]);

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   dispatch(loginUser(formData));
 };

 const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
   const { name, value } = e.target;
   setFormData(prev => ({ ...prev, [name]: value }));
   if (errors[name as keyof FormErrors]) {
     setErrors(prev => ({ ...prev, [name]: '' }));
   }
 };

 return (
   <div className="flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
     <div className="max-w-5xl w-full flex bg-white rounded-2xl shadow-xl overflow-hidden">
       {/* Left side - Login Form */}
       <div className="w-1/2 p-8">
         <div className="text-center mb-8">
           <div className="inline-block p-2 bg-blue-50 rounded-xl">
             <Building2 className="h-10 w-10 text-blue-600" />
           </div>
           <h2 className="mt-4 text-2xl font-bold text-gray-900">Welcome to YC Middle East</h2>
           <p className="text-sm text-gray-600">Please login to your account</p>
         </div>

         <form onSubmit={handleSubmit} className="space-y-6">
           {error && (
             <div className="p-3 bg-red-50 rounded-xl">
               <p className="text-sm text-red-600 text-center">{error}</p>
             </div>
           )}
           
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

           <div className="flex items-center justify-between">
             <div className="text-sm">
               <Link to="/forgot-password" className="text-blue-600 hover:text-blue-500">
                 Forgot password?
               </Link>
             </div>
           </div>

           <button
             type="submit"
             disabled={loading}
             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
           >
             {loading ? 'Logging in...' : 'Log in'}
           </button>

           <div className="text-center">
             <span className="text-sm text-gray-600">Don't have an account? </span>
             <Link to="/register" className="text-sm text-blue-600 hover:text-blue-500">
               Register
             </Link>
           </div>
         </form>
       </div>
        {/* Right side - Info with Image */}
        <div className="w-1/2 bg-blue-600 p-8 flex flex-col">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4 text-white">Join the Leading Startup Accelerator in Middle East</h2>
            <p className="text-blue-100 mb-8">
              Get access to world-class mentorship, funding opportunities, and a network of successful founders. 
              YC Middle East helps ambitious founders turn great ideas into successful companies.
            </p>
            <div className="mt-8">
              <img 
               src={loginImage} 
                alt="Startup Illustration"
                className="rounded-lg shadow-lg w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};