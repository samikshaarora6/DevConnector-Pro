import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../store/slices/profileSlice';
import { getPosts } from '../store/slices/postSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profile, loading } = useSelector((state) => state.profile);
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getCurrentProfile());
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      {profile === null ? (
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <p className="text-gray-600 mb-4">You have not yet set up a profile</p>
          <Link
            to="/create-profile"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Create Profile
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Profile</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p className="mt-1">{profile.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="mt-1">{profile.location || 'Not specified'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                  <p className="mt-1">{profile.bio || 'No bio added'}</p>
                </div>
                <Link
                  to="/edit-profile"
                  className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
              {posts.length > 0 ? (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post._id} className="border-b pb-4">
                      <h3 className="text-lg font-medium">{post.title}</h3>
                      <p className="text-gray-600 mt-2">{post.text}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        Posted by {post.name} on{' '}
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No posts found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 