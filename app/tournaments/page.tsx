'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Tournament } from '@/types/tournament';

export default function Tournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const router = useRouter();
  const userId = 1; // replace with actual user ID from authentication

  useEffect(() => {
    const fetchTournaments = async () => {
      const response = await fetch('/api/tournaments/list');
      const data = await response.json();
      setTournaments(data);
    };

    fetchTournaments();
  }, []);

  const handleRegister = async (tournamentId: number) => {
    const response = await fetch('/api/tournaments/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tournamentId, userId }),
    });

    if (response.ok) {
      alert('Registered successfully');
      router.refresh();
    } else {
      alert('Registration failed');
    }
  };

return (
    <div>
        <h1>Tournaments</h1>
        <ul>
            {tournaments.map((tournament: Tournament) => (
                <li key={tournament.id}>
                    <h2>{tournament.title}</h2>
                    <button onClick={() => handleRegister(tournament.id)}>Register</button>
                </li>
            ))}
        </ul>
    </div>
);
}


