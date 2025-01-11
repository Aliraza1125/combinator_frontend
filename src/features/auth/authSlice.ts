// features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  isAdmin: boolean;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('userData') || 'null'),
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  success: false,
  isAdmin: JSON.parse(localStorage.getItem('userData') || 'null')?.isAdmin || false
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: AuthData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://combinator-backend.onrender.com/register', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData: AuthData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://combinator-backend.onrender.com/login', userData);
      
      // Store user data and token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));

      return {
        user: response.data.user,
        token: response.data.token,
        isAdmin: response.data.user.isAdmin
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.error = null;
      state.success = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      state.success = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    }
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAdmin = action.payload.isAdmin;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearAuthState, logout } = authSlice.actions;
export default authSlice.reducer;