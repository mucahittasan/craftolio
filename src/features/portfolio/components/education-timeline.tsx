import { Education } from '@/features/builder/store/portfolio-store';
import { format } from 'date-fns';

export function EducationTimeline({ educations }: { educations: Education[] }) {
  return (
    <div className="relative space-y-10 border-l-2 border-muted pl-6">
      {educations.map((edu) => (
        <div key={edu.id} className="relative">
          <div className="absolute -left-[34px] top-1 h-4 w-4 rounded-full bg-primary" />
          <p className="text-sm text-muted-foreground">
            {format(new Date(edu.startDate!), 'MMM yyyy')} -{' '}
            {edu.endDate
              ? format(new Date(edu.endDate), 'MMM yyyy')
              : 'Present'}
          </p>
          <h3 className="mt-1 text-lg font-bold">{edu.degree}</h3>
          <p className="text-md text-muted-foreground">{edu.school}</p>
          {edu.fieldOfStudy && (
            <p className="mt-1 text-sm text-foreground/80">
              {edu.fieldOfStudy}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
