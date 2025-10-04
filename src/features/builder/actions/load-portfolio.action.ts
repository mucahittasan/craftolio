'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function loadPortfolio() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
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

    // Transform data to match store format
    return {
      username: user.username,
      profile: user.profile
        ? {
            title: user.profile.title || '',
            bio: user.profile.bio || '',
            location: user.profile.location || '',
            website: user.profile.website || '',
            linkedin: user.profile.linkedin || '',
            github: user.profile.github || '',
          }
        : {
            title: '',
            bio: '',
            location: '',
            website: '',
            linkedin: '',
            github: '',
          },
      experiences: user.experiences.map((exp) => ({
        id: exp.id,
        jobTitle: exp.jobTitle,
        company: exp.company,
        startDate: exp.startDate,
        endDate: exp.endDate,
        description: exp.description,
      })),
      educations: user.educations.map((edu) => ({
        id: edu.id,
        school: edu.school,
        degree: edu.degree,
        fieldOfStudy: edu.fieldOfStudy,
        startDate: edu.startDate,
        endDate: edu.endDate,
      })),
      projects: user.projects.map((proj) => ({
        id: proj.id,
        name: proj.name,
        description: proj.description,
        url: proj.url,
        imageUrl: proj.imageUrl,
      })),
      skills: user.skills.map((skill) => ({
        id: skill.id,
        name: skill.name,
      })),
    };
  } catch (error) {
    console.error('Failed to load portfolio:', error);
    return null;
  }
}
