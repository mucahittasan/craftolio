import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse('Missing info', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error: unknown) {
    console.error('REGISTRATION_ERROR', error);
    const e = error as { code?: string; meta?: { target?: string[] } };
    if (e?.code === 'P2002' && e?.meta?.target?.includes('email')) {
      return new NextResponse('Email already exists', { status: 409 });
    }
    return new NextResponse('Internal Error', { status: 500 });
  }
}
