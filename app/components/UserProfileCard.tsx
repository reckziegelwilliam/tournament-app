'use client';

interface UserProfileCardProps {
  name: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
}

export default function UserProfileCard({
  name,
  bio,
  location,
  avatarUrl,
}: UserProfileCardProps) {
  return (
    <div className="max-w-sm mx-auto mt-8 p-4 border rounded-md shadow-md">
      <div className="flex flex-col items-center">
        <img
          src={avatarUrl || '/default-avatar.png'} // Fallback to default avatar
          alt={`${name}'s avatar`}
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-xl font-bold">{name}</h2>
        {bio && <p className="text-gray-600">{bio}</p>}
        {location && <p className="text-gray-500 mt-2">{location}</p>}
      </div>
    </div>
  );
}
