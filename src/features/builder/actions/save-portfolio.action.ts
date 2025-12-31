'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { usePortfolioStore } from '@/features/builder/store/portfolio.store';
import { revalidatePath } from 'next/cache';

export async function savePortfolio(
  portfolioState: ReturnType<typeof usePortfolioStore.getState>,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: 'Not authenticated' };
  }

  const userId = session.user.id;
  const { profile, experiences, educations, projects, skills, username } =
    portfolioState;

  try {
    // Delete all existing data first (without transaction for Supabase compatibility)
    await prisma.experience.deleteMany({ where: { userId } });
    await prisma.education.deleteMany({ where: { userId } });
    await prisma.project.deleteMany({ where: { userId } });
    await prisma.skill.deleteMany({ where: { userId } });

    // Upsert profile
    await prisma.profile.upsert({
      where: { userId },
      update: profile,
      create: { userId, ...profile },
    });

    // Prepare experiences data
    const experiencesToCreate = experiences
      .filter(
        (exp) =>
          exp.jobTitle?.trim() ||
          exp.company?.trim() ||
          exp.description?.trim() ||
          exp.startDate ||
          exp.endDate,
      )
      .map(({ id, ...expData }) => ({
        ...expData,
        userId,
        startDate: expData.startDate || new Date(),
        endDate: expData.endDate || null,
      }));

    if (experiencesToCreate.length > 0) {
      await prisma.experience.createMany({ data: experiencesToCreate });
    }

    // Prepare educations data
    const educationsToCreate = educations
      .filter(
        (edu) =>
          edu.school?.trim() ||
          edu.degree?.trim() ||
          edu.fieldOfStudy?.trim() ||
          edu.startDate ||
          edu.endDate,
      )
      .map((edu) => {
        const {
          id: _eduId,
          description: _omit,
          ...restEdu
        } = edu as unknown as {
          id?: string;
          description?: string | null;
          school?: string;
          degree?: string;
          fieldOfStudy?: string | null;
          location?: string | null;
          startDate?: Date | null;
          endDate?: Date | null;
        };
        return {
          school: restEdu.school ?? '',
          degree: restEdu.degree ?? '',
          fieldOfStudy: restEdu.fieldOfStudy ?? null,
          location: restEdu.location ?? null,
          startDate: restEdu.startDate ?? new Date(),
          endDate: restEdu.endDate ?? null,
          userId,
        };
      });

    if (educationsToCreate.length > 0) {
      await prisma.education.createMany({ data: educationsToCreate });
    }

    // Prepare projects data
    const projectsToCreate = projects
      .filter(
        (proj) =>
          proj.name?.trim() ||
          proj.description?.trim() ||
          proj.url?.trim() ||
          proj.githubUrl?.trim() ||
          proj.imageUrl?.trim(),
      )
      .map(({ id, ...projData }) => ({
        ...projData,
        userId,
      }));

    if (projectsToCreate.length > 0) {
      await prisma.project.createMany({ data: projectsToCreate });
    }

    // Create skills
    if (skills.length > 0) {
      await prisma.skill.createMany({
        data: skills.map((skill) => ({ name: skill.name, userId })),
      });
    }

    revalidatePath('/dashboard');
    if (username) {
      revalidatePath(`/portfolio/${username}`);
    }

    return { success: 'Portfolio saved successfully!' };
  } catch (error) {
    console.error('Failed to save portfolio:', error);
    return { error: 'Failed to save portfolio.' };
  }
}
