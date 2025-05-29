import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../store/slices/profileSlice';

const Profiles = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Developers</h1>
      {profiles.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
        <ul className="space-y-4">
          {profiles.map((profile) => (
            <li key={profile._id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p>{profile.bio}</p>
              <p>Skills: {profile.skills.join(', ')}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profiles; 