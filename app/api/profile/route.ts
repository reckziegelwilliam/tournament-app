import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const { userId, name, bio, location, avatarUrl } = await request.json();

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      bio,
      location,
      avatarUrl,
    },
  });

  return NextResponse.json(user, { status: 200 });
}
