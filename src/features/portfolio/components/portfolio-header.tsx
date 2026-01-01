import Image from 'next/image';
import React from 'react';
import {
  MapPin,
  Linkedin,
  Github,
  ExternalLink,
  Mail,
  Phone,
} from 'lucide-react';
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
  email?: string | null;
  phone?: string | null;
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
  email,
  phone,
}: Props) {
  return (
    <header className="flex flex-col items-center space-y-6 text-center md:flex-row md:items-start md:space-x-8 md:space-y-0 md:text-left">
      {/* Avatar */}
      <div className="relative h-28 w-28 flex-shrink-0 md:h-32 md:w-32">
        <Image
          src={
            avatarUrl ||
            `https://ui-avatars.com/api/?name=${name}&background=e5e7eb&color=374151&size=200&bold=true`
          }
          alt={name || 'User Avatar'}
          className="rounded-2xl border-2 border-gray-100 object-cover shadow-lg dark:border-gray-800"
          fill
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          {name}
        </h1>
        <p className="mt-1 text-lg font-medium text-gray-600 dark:text-gray-400 md:text-xl">
          {title}
        </p>

        {/* Meta info row */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-gray-500 dark:text-gray-400 md:justify-start">
          {location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {location}
            </span>
          )}
          {email && (
            <Link
              href={`mailto:${email}`}
              className="flex items-center gap-1.5 transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              <Mail className="h-4 w-4" />
              {email}
            </Link>
          )}
          {phone && (
            <Link
              href={`tel:${phone}`}
              className="flex items-center gap-1.5 transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              <Phone className="h-4 w-4" />
              {phone}
            </Link>
          )}
        </div>

        {/* Bio */}
        {bio && (
          <div className="mt-5 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            <div
              className="portfolio-page-description"
              dangerouslySetInnerHTML={{ __html: bio }}
            />
          </div>
        )}

        {/* Social Links */}
        {(linkedin || github || website) && (
          <div className="mt-5 flex items-center justify-center gap-2 md:justify-start">
            {linkedin && (
              <Link
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-blue-500 dark:hover:text-blue-400"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            )}
            {github && (
              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-white dark:hover:text-white"
                title="GitHub"
              >
                <Github className="h-4 w-4" />
              </Link>
            )}
            {website && (
              <Link
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:border-purple-500 hover:text-purple-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-purple-500 dark:hover:text-purple-400"
                title="Website"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
