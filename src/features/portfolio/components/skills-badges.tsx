import { Skill } from '@/features/builder/store/portfolio.store';

export function SkillsBadges({ skills }: { skills: Skill[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill.id}
          className="border-[var(--brand-primary)]/20 hover:border-[var(--brand-primary)]/40 hover:bg-[var(--brand-primary)]/10 dark:border-[var(--brand-accent)]/20 dark:hover:border-[var(--brand-accent)]/40 dark:hover:bg-[var(--brand-accent)]/10 rounded-full border bg-white/80 px-3 py-1.5 text-sm font-medium text-[var(--brand-dark)] backdrop-blur-sm transition-all dark:bg-gray-800/80 dark:text-[var(--brand-accent)]"
        >
          {skill.name}
        </span>
      ))}
    </div>
  );
}
