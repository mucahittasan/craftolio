import Image from 'next/image';
import React from 'react';
import { MapPin, Sparkles, Linkedin, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Props {
  name: string | null;
  title: string | null | undefined;
  location: string | null | undefined;
  avatarUrl: string | null | undefined;
  bio?: string | null;
  linkedin?: string | null;
  github?: string | null;
  website?: string | null;
}

export function PortfolioHeader({
  name,
  title,
  location,
  avatarUrl,
  bio,
  linkedin,
  github,
  website,
}: Props) {
  return (
    <header className="flex flex-col items-center space-y-6 text-center md:flex-row md:items-start md:space-x-8 md:space-y-0 md:text-left">
      {/* Avatar with enhanced styling */}
      <div className="group relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-lg transition-opacity duration-300 group-hover:opacity-50"></div>
        <div className="relative h-32 w-32 flex-shrink-0 md:h-40 md:w-40">
          <Image
            src={
              avatarUrl ||
              `https://ui-avatars.com/api/?name=${name}&background=random&size=200&bold=true`
            }
            alt={name || 'User Avatar'}
            className="rounded-full border-4 border-white/20 object-cover shadow-2xl transition-transform duration-300 group-hover:scale-105"
            fill
          />
          {/* Floating sparkle effect */}
          <div className="absolute -right-2 -top-2 text-yellow-400">
            <Sparkles className="h-6 w-6 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Text content with enhanced styling */}
      <div className="flex-1">
        <h1 className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-5xl font-black leading-tight tracking-tight text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200 md:text-6xl">
          {name}
        </h1>
        <p className="mt-3 text-xl font-semibold text-gray-600 dark:text-gray-300 md:text-2xl">
          {title}
        </p>
        {location && (
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 md:justify-start">
            <MapPin className="h-5 w-5" />
            <span className="text-lg font-medium">{location}</span>
          </div>
        )}

        {/* Bio */}
        {bio && (
          <div className="prose prose-sm mt-4 max-w-none">
            <div
              className="portfolio-page-description leading-relaxed text-gray-600 dark:text-gray-400"
              dangerouslySetInnerHTML={{ __html: bio }}
            />
          </div>
        )}

        {/* Social Links */}
        {(linkedin || github || website) && (
          <div className="mt-6 flex items-center justify-center gap-4 md:justify-start">
            {linkedin && (
              <Link
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white/50 px-4 py-2 text-gray-700 transition-all duration-300 hover:bg-blue-500 hover:text-white hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-blue-500"
              >
                <Linkedin className="h-4 w-4" />
                <span className="text-sm font-medium">LinkedIn</span>
              </Link>
            )}
            {github && (
              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white/50 px-4 py-2 text-gray-700 transition-all duration-300 hover:bg-gray-800 hover:text-white hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <Github className="h-4 w-4" />
                <span className="text-sm font-medium">GitHub</span>
              </Link>
            )}
            {website && (
              <Link
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white/50 px-4 py-2 text-gray-700 transition-all duration-300 hover:bg-purple-500 hover:text-white hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-purple-500"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="text-sm font-medium">Website</span>
              </Link>
            )}
          </div>
        )}

        {/* Decorative line */}
        <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 md:mx-0"></div>
      </div>
    </header>
  );
}
