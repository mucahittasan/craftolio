import { Skill } from '@/features/builder/store/portfolio.store';
import { Badge } from '@/features/shared/components/ui/badge';

export function SkillsBadges({ skills }: { skills: Skill[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <Badge key={skill.id} variant="secondary">
          {skill.name}
        </Badge>
      ))}
    </div>
  );
}
