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
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[var(--brand-dark)] via-[var(--brand-primary)] to-[var(--brand-accent)] opacity-75 blur-sm" />
        <Image
          src={
            avatarUrl ||
            `https://ui-avatars.com/api/?name=${name}&background=0c7779&color=ffffff&size=200&bold=true`
          }
          alt={name || 'User Avatar'}
          className="relative rounded-2xl border-2 border-white object-cover shadow-xl dark:border-gray-800"
          fill
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h1 className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:via-gray-100 dark:to-white md:text-4xl">
          {name}
        </h1>
        <p className="mt-1 text-lg font-medium text-[var(--brand-primary)] dark:text-[var(--brand-accent)] md:text-xl">
          {title}
        </p>

        {/* Meta info row */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-gray-500 dark:text-gray-400 md:justify-start">
          {location && (
            <span className="flex items-center gap-1.5 text-sm">
              <MapPin className="h-4 w-4" />
              {location}
            </span>
          )}
          {email && (
            <Link
              href={`mailto:${email}`}
              className="flex items-center gap-1.5 text-sm transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              <Mail className="h-4 w-4" />
              {email}
            </Link>
          )}
          {phone && (
            <Link
              href={`tel:${phone}`}
              className="flex items-center gap-1.5 text-sm transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              <Phone className="h-4 w-4" />
              {phone}
            </Link>
          )}
        </div>

        {/* Bio */}
        {bio && (
          <div className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
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
                className="hover:border-[var(--brand-primary)]/50 hover:bg-[var(--brand-primary)]/10 dark:hover:border-[var(--brand-accent)]/50 dark:hover:bg-[var(--brand-accent)]/10 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200/50 bg-white/80 text-gray-600 backdrop-blur-sm transition-all hover:text-[var(--brand-primary)] dark:border-gray-700/50 dark:bg-gray-800/80 dark:text-gray-400 dark:hover:text-[var(--brand-accent)]"
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
                className="hover:border-[var(--brand-dark)]/50 hover:bg-[var(--brand-dark)]/10 dark:hover:border-[var(--brand-secondary)]/50 dark:hover:bg-[var(--brand-secondary)]/10 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200/50 bg-white/80 text-gray-600 backdrop-blur-sm transition-all hover:text-[var(--brand-dark)] dark:border-gray-700/50 dark:bg-gray-800/80 dark:text-gray-400 dark:hover:text-[var(--brand-secondary)]"
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
                className="hover:border-[var(--brand-secondary)]/50 hover:bg-[var(--brand-secondary)]/10 dark:hover:border-[var(--brand-accent)]/50 dark:hover:bg-[var(--brand-accent)]/10 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200/50 bg-white/80 text-gray-600 backdrop-blur-sm transition-all hover:text-[var(--brand-secondary)] dark:border-gray-700/50 dark:bg-gray-800/80 dark:text-gray-400 dark:hover:text-[var(--brand-accent)]"
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
