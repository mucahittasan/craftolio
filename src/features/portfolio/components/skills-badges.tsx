import { Skill } from '@/features/builder/store/portfolio.store';
import { Badge } from '@/features/shared/components/ui/badge';

export function SkillsBadges({ skills }: { skills: Skill[] }) {
  // Generate random colors for each skill
  const getRandomGradient = (index: number) => {
    const gradients = [
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-yellow-500',
      'from-purple-500 to-pink-500',
      'from-indigo-500 to-blue-500',
      'from-red-500 to-rose-500',
      'from-teal-500 to-green-500',
      'from-violet-500 to-purple-500',
      'from-amber-500 to-orange-500',
      'from-emerald-500 to-teal-500',
      'from-cyan-500 to-blue-500',
      'from-pink-500 to-rose-500',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {skills.map((skill, index) => (
        <Badge
          key={skill.id}
          variant="secondary"
          className={`group relative overflow-hidden bg-gradient-to-r ${getRandomGradient(index)} border-0 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl`}
        >
          <span className="relative z-10 font-medium">{skill.name}</span>
          <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </Badge>
      ))}
    </div>
  );
}
