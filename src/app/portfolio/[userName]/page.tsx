import { getUserPortfolio } from '@/features/portfolio/actions/get-user-portfolio.action';
import { notFound } from 'next/navigation';
import React from 'react';
import { PortfolioHeader } from '@/features/portfolio/components/portfolio-header';
import { ExperienceTimeline } from '@/features/portfolio/components/experience-timeline';
import { EducationTimeline } from '@/features/portfolio/components/education-timeline';
import { ProjectCard } from '@/features/portfolio/components/project-card';
import { SkillsBadges } from '@/features/portfolio/components/skills-badges';
import { Edit, MoreVertical, Sparkles } from 'lucide-react';
import { auth } from '@/auth';
import Link from 'next/link';
import { Button } from '@/features/shared/components/ui/button';
import { ThemeToggle } from '@/features/shared/components/ui/theme-toggle';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/features/shared/components/ui/popover';
import { MotionSection } from '@/features/shared/utils/motions/motions.util';
import {
  fadeUpVariant,
  headingVariants,
} from '@/features/shared/utils/motions/variants.util';
import '@/features/portfolio/style/portfolio.css';
import { EmptyPortfolioState } from '@/features/portfolio/components/empty-portfolio-state';

type Props = {
  params: Promise<{
    userName: string;
  }>;
};

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Background decorative elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-400/20 to-pink-600/20 blur-3xl"></div>
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-600/10 blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="container relative mx-auto max-w-7xl p-0 md:p-8">
          {/* Actions menu */}
          <div className="absolute right-4 top-4 z-20 md:right-8 md:top-8">
            {/* Mobile: compact popover */}
            <div className="md:hidden">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full border border-white/20 bg-black/10 shadow-none backdrop-blur-sm"
                  >
                    <MoreVertical className="h-5 w-5" />
                    <span className="sr-only">Open actions</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-56 p-2">
                  {isOwner ? (
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <Link href="/dashboard">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Portfolio
                      </Link>
                    </Button>
                  ) : null}
                  <ThemeToggle showLabel className="w-full justify-start" />
                </PopoverContent>
              </Popover>
            </div>
            {/* Desktop: show buttons inline */}
            <div className="hidden flex-col gap-2 md:flex">
              {isOwner ? (
                <Button
                  asChild
                  size="sm"
                  className="text-blac gap-2 border border-white/20 bg-black/10 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-black/30 hover:text-white"
                >
                  <Link href="/dashboard">
                    <Edit className="h-4 w-4" />
                    Edit Portfolio
                  </Link>
                </Button>
              ) : null}
              <ThemeToggle showLabel />
            </div>
          </div>

          {/* Hero Section */}
          <MotionSection
            initial="hidden"
            animate="visible"
            variants={headingVariants}
            custom={0}
            className="relative mb-8 md:mb-16"
          >
            <div className="glass-panel rounded-none border-0 p-4 shadow-none md:rounded-3xl md:border md:border-white/20 md:p-12 md:shadow-2xl">
              <PortfolioHeader
                name={name}
                title={profile?.title}
                location={profile?.location}
                avatarUrl={portfolioData.image}
                bio={profile?.bio}
                linkedin={profile?.linkedin}
                github={profile?.github}
                website={profile?.website}
              />

              {/* Floating decorative elements */}
              <div className="absolute right-4 top-4 text-blue-500/30">
                <Sparkles className="h-8 w-8 animate-pulse" />
              </div>
              <div className="absolute bottom-4 left-4 text-purple-500/30">
                <Sparkles className="h-6 w-6 animate-pulse delay-1000" />
              </div>
            </div>
          </MotionSection>

          {/* Skills Section - Centered */}
          <MotionSection
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            custom={0.2}
            className="mb-6 md:mb-12"
          >
            <div className="glass-panel rounded-none border-0 p-4 shadow-none md:rounded-2xl md:border md:border-white/20 md:p-8 md:shadow-xl">
              <h2 className="text-gradient mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-center text-2xl font-bold text-transparent">
                Skills
              </h2>
              <div className="flex justify-center">
                <SkillsBadges skills={skills} />
              </div>
            </div>
          </MotionSection>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Work Experience */}
            <MotionSection
              initial="hidden"
              animate="visible"
              variants={fadeUpVariant}
              custom={0.3}
            >
              <div className="glass-panel overflow-hidden rounded-none border-0 p-4 shadow-none md:rounded-2xl md:border md:border-white/20 md:p-8 md:shadow-xl">
                <h2 className="text-gradient mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-2xl font-bold text-transparent">
                  Work Experience
                </h2>
                <ExperienceTimeline experiences={experiences} />
              </div>
            </MotionSection>

            {/* Education */}
            {educations && educations.length > 0 && (
              <MotionSection
                initial="hidden"
                animate="visible"
                variants={fadeUpVariant}
                custom={0.4}
              >
                <div className="glass-panel overflow-hidden rounded-none border-0 p-4 shadow-none md:rounded-2xl md:border md:border-white/20 md:p-8 md:shadow-xl">
                  <h2 className="text-gradient mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-2xl font-bold text-transparent">
                    Education
                  </h2>
                  <EducationTimeline educations={educations} />
                </div>
              </MotionSection>
            )}

            {/* Projects */}
            <MotionSection
              initial="hidden"
              animate="visible"
              variants={fadeUpVariant}
              custom={0.5}
            >
              <div className="glass-panel overflow-hidden rounded-none border-0 p-4 shadow-none md:rounded-2xl md:border md:border-white/20 md:p-8 md:shadow-xl">
                <h2 className="text-gradient mb-8 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                  Projects
                </h2>
                <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-6">
                  {projects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </MotionSection>
          </div>
        </div>
      </div>
    </div>
  );
}
