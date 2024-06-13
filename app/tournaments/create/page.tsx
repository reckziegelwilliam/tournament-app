'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTournament() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const userId = 1; // replace with actual user ID from authentication

  const handleCreate = async () => {
    const response = await fetch('/api/tournaments/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, userId }),
    });

    const result = await response.json();

    if (response.ok) {
      setError(null);
      router.push('/tournaments');
    } else {
      setError(result.error || 'Creation failed');
    }
  };

  return (
    <div>
      <h1>Create Tournament</h1>
      <input
        type="text"
        placeholder="Tournament Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
