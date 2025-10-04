'use server';

import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export async function getUserPortfolio(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        profile: true,
        experiences: {
          orderBy: {
            startDate: 'desc',
          },
        },
        educations: {
          orderBy: {
            startDate: 'desc',
          },
        },
        projects: true,
        skills: true,
      },
    });

    if (!user) {
      return null;
    }

    const { hashedPassword, ...portfolioData } = user;
    return portfolioData;
  } catch (error) {
    console.error('Failed to fetch portfolio data:', error);
    return null;
  }
}
