'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { usePortfolioStore } from '@/features/builder/store/portfolio-store';
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
    await prisma.$transaction(async (tx) => {
      await tx.experience.deleteMany({ where: { userId } });
      await tx.education.deleteMany({ where: { userId } });
      await tx.project.deleteMany({ where: { userId } });
      await tx.skill.deleteMany({ where: { userId } });

      await tx.profile.upsert({
        where: { userId },
        update: profile,
        create: { userId, ...profile },
      });

      // Only save experiences that have actual data
      for (const exp of experiences) {
        const isTouched =
          exp.jobTitle?.trim() ||
          exp.company?.trim() ||
          exp.description?.trim() ||
          exp.startDate ||
          exp.endDate;

        if (!isTouched) continue; // Skip empty forms

        const { id, ...expData } = exp;
        await tx.experience.create({
          data: {
            ...expData,
            userId,
            startDate: expData.startDate || new Date(),
            endDate: expData.endDate || null,
          },
        });
      }

      // Only save educations that have actual data
      for (const edu of educations) {
        const isTouched =
          edu.school?.trim() ||
          edu.degree?.trim() ||
          edu.fieldOfStudy?.trim() ||
          edu.startDate ||
          edu.endDate;

        if (!isTouched) continue; // Skip empty forms

        const { id, ...eduData } = edu;
        await tx.education.create({
          data: {
            ...eduData,
            userId,
            startDate: eduData.startDate || new Date(),
            endDate: eduData.endDate || null,
          },
        });
      }

      // Only save projects that have actual data
      for (const proj of projects) {
        const isTouched =
          proj.name?.trim() ||
          proj.description?.trim() ||
          proj.url?.trim() ||
          proj.imageUrl?.trim();

        if (!isTouched) continue; // Skip empty forms

        const { id, ...projData } = proj;
        await tx.project.create({ data: { ...projData, userId } });
      }
      for (const skill of skills) {
        await tx.skill.create({ data: { name: skill.name, userId } });
      }
    });

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
