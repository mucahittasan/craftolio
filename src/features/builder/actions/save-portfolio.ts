'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { usePortfolioStore } from '@/features/builder/store/portfolio-store';
import { revalidatePath } from 'next/cache';

// Bu fonksiyon, client-side'dan çağrılacak.
// Zustand'daki state'in tamamını bir argüman olarak alacak.
export async function savePortfolio(
  portfolioState: ReturnType<typeof usePortfolioStore.getState>,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: 'Not authenticated' };
  }

  const userId = session.user.id;
  const { profile, experiences, educations, projects, skills } = portfolioState;

  try {
    // Prisma Transaction: Bu, veritabanı işlemlerinin "ya hep ya hiç" mantığıyla çalışmasını sağlar.
    // Eğer işlemlerden biri bile başarısız olursa, tüm işlemler geri alınır. Bu, veri bütünlüğü için kritiktir.
    await prisma.$transaction(async (tx) => {
      // 1. Mevcut tüm listeleri temizle (güncelleme mantığı için en temiz yol)
      await tx.experience.deleteMany({ where: { userId } });
      await tx.education.deleteMany({ where: { userId } });
      await tx.project.deleteMany({ where: { userId } });
      await tx.skill.deleteMany({ where: { userId } });

      // 2. Profile bilgisini oluştur veya güncelle (upsert)
      await tx.profile.upsert({
        where: { userId },
        update: profile,
        create: { userId, ...profile },
      });

      // 3. Yeni listeleri 'createMany' ile toplu halde ekle
      // Prisma'nın createMany'i, ID'leri manuel yönettiğimiz için bu senaryoda doğrudan uymayabilir.
      // Bu yüzden her birini ayrı ayrı oluşturmak daha güvenlidir.
      for (const exp of experiences) {
        await tx.experience.create({
          data: {
            ...exp,
            userId,
            startDate: exp.startDate || new Date(),
            endDate: exp.endDate || new Date(),
          },
        });
      }
      for (const edu of educations) {
        await tx.education.create({
          data: {
            ...edu,
            userId,
            startDate: edu.startDate || new Date(),
            endDate: edu.endDate || new Date(),
          },
        });
      }
      for (const proj of projects) {
        await tx.project.create({ data: { ...proj, userId } });
      }
      for (const skill of skills) {
        await tx.skill.create({ data: { name: skill.name, userId } });
      }
    });

    // Veri güncellendiği için, bu veriyi gösteren sayfaların cache'ini temizle
    revalidatePath('/dashboard');
    revalidatePath(`/${session.user.name}`); // Gelecekteki public profil sayfası için

    return { success: 'Portfolio saved successfully!' };
  } catch (error) {
    console.error('Failed to save portfolio:', error);
    return { error: 'Failed to save portfolio.' };
  }
}
