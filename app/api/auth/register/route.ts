import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'my_admin_secret_key'; // Secret key for admin registration

export async function POST(request: Request) {
  const { name, email, password, secretKey } = await request.json();

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const role = secretKey === ADMIN_SECRET ? 'admin' : 'user'; // Assign role based on secret key

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role }
  });

  return NextResponse.json(user, { status: 201 });
}
