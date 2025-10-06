'use server';

import prisma from '@/lib/prisma';

export async function getUserPortfolio(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      image: true,
      profile: true,
      experiences: { orderBy: { startDate: 'desc' } },
      educations: { orderBy: { startDate: 'desc' } },
      projects: true,
      skills: true,
    },
  });

  if (!user) return null;

  const hasProfile = Boolean(
    user.profile &&
      (user.profile.title || user.profile.bio || user.profile.website),
  );

  return {
    id: user.id,
    name: user.name,
    image: user.image,
    profile: user.profile,
    experiences: user.experiences,
    educations: user.educations,
    projects: user.projects,
    skills: user.skills,
    isEmpty:
      !hasProfile &&
      user.experiences.length === 0 &&
      user.projects.length === 0,
  };
}
