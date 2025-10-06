'use server';

import prisma from '@/lib/prisma';

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

    // Omit sensitive field before returning
    const { hashedPassword: _omit, ...portfolioData } = user;
    return portfolioData;
  } catch (error) {
    console.error('Failed to fetch portfolio data:', error);
    return null;
  }
}
