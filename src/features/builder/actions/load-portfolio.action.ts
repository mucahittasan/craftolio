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
            email: user.profile.email || '',
            phone: user.profile.phone || '',
          }
        : {
            title: '',
            bio: '',
            location: '',
            website: '',
            linkedin: '',
            github: '',
            email: '',
            phone: '',
          },
      experiences: user.experiences.map((exp) => ({
        id: exp.id,
        jobTitle: exp.jobTitle,
        company: exp.company,
        location: exp.location,
        startDate: exp.startDate,
        endDate: exp.endDate,
        description: exp.description,
      })),
      educations: user.educations.map((edu) => ({
        id: edu.id,
        school: edu.school,
        degree: edu.degree,
        fieldOfStudy: edu.fieldOfStudy,
        location: edu.location,
        startDate: edu.startDate,
        endDate: edu.endDate,
      })),
      projects: user.projects.map((proj) => ({
        id: proj.id,
        name: proj.name,
        description: proj.description,
        url: proj.url,
        githubUrl: proj.githubUrl,
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
