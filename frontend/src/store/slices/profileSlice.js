import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Async thunks
export const getCurrentProfile = createAsyncThunk(
  'profile/getCurrentProfile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/profile/me`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProfileById = createAsyncThunk(
  'profile/getProfileById',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/profile/user/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createProfile = createAsyncThunk(
  'profile/createProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/profile`, profileData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  profile: null,
  profiles: [],
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Current Profile
      .addCase(getCurrentProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getCurrentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Profile By ID
      .addCase(getProfileById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Profile
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer; 