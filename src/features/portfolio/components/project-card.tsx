import { Project } from '@/features/builder/store/portfolio.store';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-200 hover:border-gray-200 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700">
      {/* Image */}
      {project.imageUrl && (
        <div className="relative h-44 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={`/api/i?url=${encodeURIComponent(project.imageUrl)}`}
            alt={project.name}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
          />
          {/* Overlay on hover */}
          {project.url && (
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/40 group-hover:opacity-100"
            >
              <span className="flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-lg">
                View Project
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {project.name}
        </h3>

        <div className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          <div
            className="portfolio-page-description line-clamp-3"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
        </div>

        {/* Links */}
        {(project.url || project.githubUrl) && (
          <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4 dark:border-gray-800">
            {project.url && (
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <ExternalLink className="h-4 w-4" />
                Demo
              </Link>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Github className="h-4 w-4" />
                Code
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
