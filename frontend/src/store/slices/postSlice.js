import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Async thunks
export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/posts`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getPostsByUserId = createAsyncThunk(
  'posts/getPostsByUserId',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/posts/user/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/posts`, postData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const likePost = createAsyncThunk(
  'posts/likePost',
  async (postId, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/posts/like/${postId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPost: (state) => {
      state.post = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Posts
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Posts By User ID
      .addCase(getPostsByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPostsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Like Post
      .addCase(likePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPost } = postSlice.actions;
export default postSlice.reducer; 