import { Education } from '@/features/builder/store/portfolio.store';
import { format } from 'date-fns';
import { GraduationCap, MapPin, BookOpen } from 'lucide-react';

export function EducationTimeline({ educations }: { educations: Education[] }) {
  return (
    <div className="space-y-4">
      {educations.map((edu) => (
        <div
          key={edu.id}
          className="group rounded-xl border border-gray-100 bg-white p-5 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
        >
          {/* Header */}
          <div className="flex items-start gap-3 sm:gap-4">
            {/* School icon */}
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 sm:h-11 sm:w-11">
              <GraduationCap className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>

            <div className="min-w-0 flex-1">
              {/* Degree and date row */}
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {edu.degree}
                </h3>
                {/* Date badge */}
                <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
                  {!edu.endDate && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      Current
                    </span>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                    {format(new Date(edu.startDate!), 'MMM yyyy')} –{' '}
                    {edu.endDate
                      ? format(new Date(edu.endDate), 'MMM yyyy')
                      : 'Present'}
                  </span>
                </div>
              </div>

              {/* School and location */}
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">{edu.school}</span>
                {edu.location && (
                  <>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {edu.location}
                    </span>
                  </>
                )}
              </div>

              {/* Field of study */}
              {edu.fieldOfStudy && (
                <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>{edu.fieldOfStudy}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
