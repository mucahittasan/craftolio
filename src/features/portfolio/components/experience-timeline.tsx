import { Experience } from '@/features/builder/store/portfolio-store';
import { format } from 'date-fns';

export function ExperienceTimeline({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <div className="relative space-y-10 border-l-2 border-muted pl-6">
      {experiences.map((exp, index) => (
        <div key={exp.id} className="relative">
          <div className="absolute -left-[34px] top-1 h-4 w-4 rounded-full bg-primary" />
          <p className="text-sm text-muted-foreground">
            {format(new Date(exp.startDate!), 'MMM yyyy')} -{' '}
            {exp.endDate
              ? format(new Date(exp.endDate), 'MMM yyyy')
              : 'Present'}
          </p>
          <h3 className="mt-1 text-lg font-bold">{exp.jobTitle}</h3>
          <p className="text-md text-muted-foreground">{exp.company}</p>
          {exp.description && (
            <p className="mt-2 text-sm text-foreground/80">{exp.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
