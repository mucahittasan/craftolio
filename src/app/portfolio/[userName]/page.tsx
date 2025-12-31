import { getUserPortfolio } from '@/features/portfolio/actions/get-user-portfolio.action';
import { notFound } from 'next/navigation';
import React from 'react';
import { PortfolioHeader } from '@/features/portfolio/components/portfolio-header';
import { ExperienceTimeline } from '@/features/portfolio/components/experience-timeline';
import { EducationTimeline } from '@/features/portfolio/components/education-timeline';
import { ProjectCard } from '@/features/portfolio/components/project-card';
import { SkillsBadges } from '@/features/portfolio/components/skills-badges';
import { PdfDownloadButton } from '@/features/portfolio/components/pdf-download-button';
import {
  Edit,
  MoreVertical,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Wrench,
} from 'lucide-react';
import { auth } from '@/auth';
import Link from 'next/link';
import { Button } from '@/features/shared/components/ui/button';
import { ThemeToggle } from '@/features/shared/components/ui/theme-toggle';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/features/shared/components/ui/popover';
import '@/features/portfolio/style/portfolio.css';
import { EmptyPortfolioState } from '@/features/portfolio/components/empty-portfolio-state';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{
    userName: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userName } = await params;
  const portfolioData = await getUserPortfolio(userName);

  if (!portfolioData) {
    return {
      title: 'Portfolio Not Found',
    };
  }

  const name = portfolioData.name ?? 'Portfolio';
  const profileTitle = portfolioData.profile?.title;

  const title = profileTitle ? `${name} - ${profileTitle}` : name;

  const description =
    portfolioData.profile?.bio ??
    `View ${name}'s professional portfolio on Craftolio.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      images: portfolioData.image ? [portfolioData.image] : undefined,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { userName } = await params;
  const portfolioData = await getUserPortfolio(userName);

  if (!portfolioData) {
    return notFound();
  }

  const { profile, experiences, educations, projects, skills, name, isEmpty } =
    portfolioData;

  // Check if the current user is the owner of this portfolio
  const session = await auth();
  const isOwner = session?.user?.id === portfolioData.id;

  if (isEmpty) {
    return <EmptyPortfolioState />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-16">
        {/* Actions menu */}
        <div className="fixed right-4 top-4 z-20 md:right-6 md:top-6">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">Open actions</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 p-2">
              <div className="flex flex-col gap-2">
                <PdfDownloadButton userName={userName} />
                {isOwner && (
                  <Button
                    asChild
                    size="sm"
                    className="flex h-10 w-full items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
                  >
                    <Link href="/dashboard">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Portfolio
                    </Link>
                  </Button>
                )}
                <ThemeToggle showLabel />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Header */}
        <section className="mb-12">
          <PortfolioHeader
            name={name}
            title={profile?.title}
            location={profile?.location}
            avatarUrl={portfolioData.image}
            bio={profile?.bio}
            linkedin={profile?.linkedin}
            github={profile?.github}
            website={profile?.website}
            email={profile?.email}
            phone={profile?.phone}
          />
        </section>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="mb-14">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                <Wrench className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Skills
              </h2>
            </div>
            <SkillsBadges skills={skills} />
          </section>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && (
          <section className="mb-14">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <Briefcase className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Experience
              </h2>
            </div>
            <ExperienceTimeline experiences={experiences} />
          </section>
        )}

        {/* Education */}
        {educations && educations.length > 0 && (
          <section className="mb-14">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Education
              </h2>
            </div>
            <EducationTimeline educations={educations} />
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-16">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <FolderKanban className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-8 dark:border-gray-800">
          <p className="text-center text-sm text-gray-400 dark:text-gray-500">
            Built with{' '}
            <Link
              href="/"
              className="font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Craftolio
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
