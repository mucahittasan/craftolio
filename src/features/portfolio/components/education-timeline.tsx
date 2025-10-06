import { Education } from '@/features/builder/store/portfolio.store';
import { format } from 'date-fns';
import { GraduationCap, Calendar, BookOpen, MapPin } from 'lucide-react';

export function EducationTimeline({ educations }: { educations: Education[] }) {
  return (
    <div className="relative md:overflow-visible md:pl-0">
      {/* Timeline line (hide on mobile) */}
      <div className="absolute bottom-0 left-8 top-0 hidden w-0.5 bg-gradient-to-b from-orange-500 via-red-500 to-pink-500 md:block"></div>

      <div className="space-y-6 md:space-y-8">
        {educations.map((edu) => (
          <div
            key={edu.id}
            className="group relative block md:flex md:items-start md:space-x-6"
          >
            {/* Timeline dot */}
            <div className="relative z-10 hidden flex-shrink-0 md:block">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 p-0.5 shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-gray-900">
                  <GraduationCap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              {/* Pulse effect for current education */}
              {!edu.endDate && (
                <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-orange-500 to-red-500 opacity-20"></div>
              )}
            </div>

            {/* Education card */}
            <div className="min-w-0 flex-1">
              <div className="glass-panel rounded-2xl border border-white/20 p-4 shadow-lg transition-all duration-300 hover:shadow-xl group-hover:-translate-y-1 md:p-6">
                {/* Header */}
                <div className="mb-3 flex flex-col gap-2 md:mb-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                      {edu.degree}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-gray-500" />
                      <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        {edu.school}
                      </span>
                      {edu.location && (
                        <>
                          <span className="text-gray-400">•</span>
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {edu.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Date badge */}
                  <div className="flex items-center gap-2 rounded-full border border-orange-200/50 bg-gradient-to-r from-orange-500/10 to-red-500/10 px-2 py-1 md:px-3">
                    <Calendar className="h-4 w-4 text-orange-600" />
                    <span className="text-xs font-medium text-orange-700 dark:text-orange-300 md:text-sm">
                      {format(new Date(edu.startDate!), 'MMM yyyy')} -{' '}
                      {edu.endDate
                        ? format(new Date(edu.endDate), 'MMM yyyy')
                        : 'Present'}
                    </span>
                  </div>
                </div>

                {/* Field of study */}
                {edu.fieldOfStudy && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <BookOpen className="h-4 w-4" />
                    <span className="font-medium">{edu.fieldOfStudy}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
