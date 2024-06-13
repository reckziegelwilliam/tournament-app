import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Role } from '@/types/user';

export async function POST(request: Request) {
  const { tournamentId, title, userId } = await request.json();

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const tournament = await prisma.tournament.update({
    where: { id: tournamentId },
    data: { title }
  });

  return NextResponse.json(tournament);
}
