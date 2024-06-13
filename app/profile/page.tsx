'use client';

import { useState, useEffect } from 'react';

export default function Profile() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [userId, setUserId] = useState<number | null>(null); // replace with actual user ID fetching

  useEffect(() => {
    // Fetch the user profile details
    // Replace with actual user ID fetching from authentication
    const fetchUserProfile = async () => {
      const userId = 1; // Hard-coded for example; replace with actual user ID
      setUserId(userId);
      const response = await fetch(`/api/profile/${userId}`);
      const profile = await response.json();

      setName(profile.name);
      setBio(profile.bio || '');
      setLocation(profile.location || '');
      setAvatarUrl(profile.avatarUrl || '');
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/profile/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, name, bio, location, avatarUrl }),
    });

    if (response.ok) {
      alert('Profile updated successfully');
    } else {
      alert('Failed to update profile');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-md">
      <h1 className="text-xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Avatar URL</label>
          <input
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Save
        </button>
      </form>
    </div>
  );
}
