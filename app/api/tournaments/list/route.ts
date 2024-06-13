import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const tournaments = await prisma.tournament.findMany({
    include: { creator: true }
  });

  return NextResponse.json(tournaments);
}
