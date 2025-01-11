// src/types/auth.ts
export interface User {
    id: string;
    name: string;
    email: string;
   }
   
   export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
   }
   
   export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    success: boolean;
   }
   