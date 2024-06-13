import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Role } from '@/types/user';

export async function POST(request: Request) {
  const { title, userId } = await request.json();

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user || user.role !== Role.ADMIN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const tournament = await prisma.tournament.create({
    data: { title, createdBy: userId }
  });

  return NextResponse.json(tournament, { status: 201 });
}
