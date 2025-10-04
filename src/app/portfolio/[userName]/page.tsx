import { getUserPortfolio } from '@/features/portfolio/actions/get-user-portfolio.action';
import { notFound } from 'next/navigation';
import React from 'react';
import { PortfolioHeader } from '@/features/portfolio/components/portfolio-header';
import { PortfolioSection } from '@/features/portfolio/components/portfolio-section';
import { ExperienceTimeline } from '@/features/portfolio/components/experience-timeline';
import { EducationTimeline } from '@/features/portfolio/components/education-timeline';
import { ProjectCard } from '@/features/portfolio/components/project-card';
import { SkillsBadges } from '@/features/portfolio/components/skills-badges';
import { Globe, Github, Linkedin, Edit } from 'lucide-react';
import { auth } from '@/auth';
import Link from 'next/link';
import { Button } from '@/features/shared/components/ui/button';

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

  const { profile, experiences, educations, projects, skills, name, email } =
    portfolioData;

  // Check if the current user is the owner of this portfolio
  const session = await auth();
  const isOwner = session?.user?.id === portfolioData.id;

  return (
    <div className="min-h-screen bg-background">
      <div className="container relative mx-auto max-w-4xl p-4 md:p-8">
        {/* Edit Button - Only visible to owner */}
        {isOwner && (
          <div className="absolute right-4 top-4 md:right-8 md:top-8">
            <Button asChild size="sm" className="gap-2">
              <Link href="/dashboard">
                <Edit className="h-4 w-4" />
                Edit Portfolio
              </Link>
            </Button>
          </div>
        )}
        <PortfolioHeader
          name={name}
          title={profile?.title}
          location={profile?.location}
          avatarUrl={portfolioData.image} // Varsayılan olarak NextAuth'un image alanını kullanalım
        />

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <aside className="md:col-span-1">
            <PortfolioSection title="Contact">
              <div className="flex flex-col space-y-3">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Globe className="h-4 w-4" />
                    {email}
                  </a>
                )}
                {profile?.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Globe className="h-4 w-4" />
                    Website
                  </a>
                )}
                {profile?.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                )}
                {profile?.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                )}
              </div>
            </PortfolioSection>
            <PortfolioSection title="Skills" className="mt-8">
              <SkillsBadges skills={skills} />
            </PortfolioSection>
          </aside>

          <main className="md:col-span-2">
            {profile?.bio && (
              <PortfolioSection title="About Me">
                <p className="text-muted-foreground">{profile.bio}</p>
              </PortfolioSection>
            )}

            <PortfolioSection title="Work Experience" className="mt-8">
              <ExperienceTimeline experiences={experiences} />
            </PortfolioSection>

            {educations && educations.length > 0 && (
              <PortfolioSection title="Education" className="mt-8">
                <EducationTimeline educations={educations} />
              </PortfolioSection>
            )}

            <PortfolioSection title="Projects" className="mt-8">
              <div className="space-y-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </PortfolioSection>
          </main>
        </div>
      </div>
    </div>
  );
}
