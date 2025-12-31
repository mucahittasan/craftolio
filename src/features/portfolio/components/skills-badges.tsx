import { Skill } from '@/features/builder/store/portfolio.store';

export function SkillsBadges({ skills }: { skills: Skill[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill.id}
          className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
        >
          {skill.name}
        </span>
      ))}
    </div>
  );
}
