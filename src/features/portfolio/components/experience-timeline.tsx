import { Experience } from '@/features/builder/store/portfolio.store';
import { format } from 'date-fns';
import { Building2, MapPin } from 'lucide-react';

export function ExperienceTimeline({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <div className="space-y-4">
      {experiences.map((exp) => (
        <div
          key={exp.id}
          className="group rounded-xl border border-gray-100 bg-white p-5 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {/* Company icon */}
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                <Building2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {exp.jobTitle}
                </h3>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">{exp.company}</span>
                  {exp.location && (
                    <>
                      <span className="text-gray-300 dark:text-gray-600">
                        •
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Date badge */}
            <div className="flex flex-shrink-0 items-center gap-2">
              {!exp.endDate && (
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  Current
                </span>
              )}
              <span className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(exp.startDate!), 'MMM yyyy')} –{' '}
                {exp.endDate
                  ? format(new Date(exp.endDate), 'MMM yyyy')
                  : 'Present'}
              </span>
            </div>
          </div>

          {/* Description */}
          {exp.description && (
            <div className="mt-4 border-t border-gray-100 pt-4 text-sm leading-relaxed text-gray-600 dark:border-gray-800 dark:text-gray-400">
              <div
                className="portfolio-page-description"
                dangerouslySetInnerHTML={{ __html: exp.description }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
