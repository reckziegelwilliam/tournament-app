import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const { tournamentId, userId } = await request.json();

  const tournament = await prisma.tournament.update({
    where: { id: tournamentId },
    data: {
      participants: {
        connect: { id: userId }
      }
    }
  });

  return NextResponse.json(tournament);
}
