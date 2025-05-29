import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logger } from '../../utils/logger';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// Async thunks
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      logger.info('Attempting user registration', { email: userData.email });
      const response = await axios.post(`${API_URL}/api/auth/register`, userData);
      logger.info('Registration successful', { email: userData.email });
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      logger.error('Registration failed', { error: error.response?.data || error.message });
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      logger.info('Attempting user login', { email: userData.email });
      const response = await axios.post(`${API_URL}/api/auth/login`, userData);
      logger.info('Login successful', { email: userData.email });
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      logger.error('Login failed', { error: error.response?.data || error.message });
      return rejectWithValue(error.response.data);
    }
  }
);

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      logger.info('Loading user data');
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_URL}/api/auth/me`, config);
      logger.info('User data loaded successfully');
      return response.data;
    } catch (error) {
      logger.error('Failed to load user data', { error: error.response?.data || error.message });
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      logger.info('User logging out');
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    clearError: (state) => {
      logger.info('Clearing auth error');
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        logger.info('Registration in progress');
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        logger.info('Registration completed', { user: action.payload.user });
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        logger.error('Registration failed', { error: action.payload });
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        logger.info('Login in progress');
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        logger.info('Login completed', { user: action.payload.user });
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        logger.error('Login failed', { error: action.payload });
        state.loading = false;
        state.error = action.payload;
      })
      // Load User
      .addCase(loadUser.pending, (state) => {
        logger.info('Loading user data in progress');
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        logger.info('User data loaded successfully', { user: action.payload });
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        logger.error('Failed to load user data', { error: action.payload });
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer; 