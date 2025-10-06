import { Project } from '@/features/builder/store/portfolio.store';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/features/shared/components/ui/card';
import Image from 'next/image';
import { Button } from '@/features/shared/components/ui/button';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { MotionDiv } from '@/features/shared/utils/motions/motions.util';
import { fadeUpVariant } from '@/features/shared/utils/motions/variants.util';

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <MotionDiv
      initial="hidden"
      animate="visible"
      variants={fadeUpVariant}
      custom={0.6 + index * 0.1}
    >
      <Card className="group relative h-full overflow-hidden border border-white/30 bg-gradient-to-br from-white/60 via-white/40 to-white/20 shadow-xl backdrop-blur-md transition-all duration-700 hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-2xl hover:shadow-purple-500/20 dark:border-white/10 dark:from-slate-900/70 dark:via-slate-900/50 dark:to-slate-900/30 sm:hover:-translate-y-3 sm:hover:scale-[1.03]">
        {/* Content */}
        <div className="relative z-10 flex h-full flex-col">
          <CardHeader className="pb-3 md:pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 md:text-2xl">
                  {project.name}
                </CardTitle>
                <div className="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">
                  <div
                    className="portfolio-page-description prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                </div>
              </div>

              {/* Enhanced project type badge */}
              {/* <div className="flex-shrink-0">
                <div className="rounded-full border border-violet-200/50 bg-gradient-to-r from-violet-500/20 to-purple-500/20 px-3 py-1.5 shadow-lg backdrop-blur-sm md:px-4 md:py-2">
                  <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                    Featured
                  </span>
                </div>
              </div> */}
            </div>
          </CardHeader>

          <CardContent className="flex-1 pb-3 md:pb-4">
            {project.imageUrl && (
              <>
                <div className="relative mb-4 h-44 w-full overflow-hidden rounded-xl shadow-lg md:mb-6 md:h-56 md:rounded-2xl">
                  <Image
                    src={`/api/i?url=${encodeURIComponent(project.imageUrl)}`}
                    alt={project.name}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    fill
                  />

                  {/* Enhanced image overlay */}
                  <div className="absolute inset-0 hidden bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block"></div>

                  {/* Enhanced hover overlay with better buttons */}
                  <div className="absolute inset-0 hidden items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 md:flex">
                    <div className="flex gap-4">
                      {project.url && (
                        <Button
                          asChild
                          size="lg"
                          className="bg-white/95 text-gray-900 shadow-xl transition-all duration-300 hover:scale-110 hover:bg-white"
                        >
                          <Link
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-5 w-5" />
                            View Live
                          </Link>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          asChild
                          variant="outline"
                          size="lg"
                          className="border-white/30 bg-black/60 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/70 hover:text-white"
                        >
                          <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-2 h-5 w-5" />
                            Code
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile actions under image */}
                {(project.url || project.githubUrl) && (
                  <div className="mt-2 flex gap-3 md:hidden">
                    {project.url && (
                      <Button asChild className="flex-1">
                        <Link
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Live
                        </Link>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button asChild variant="outline" className="flex-1">
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </div>
      </Card>
    </MotionDiv>
  );
}
