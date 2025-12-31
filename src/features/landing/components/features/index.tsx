'use client';

import React, { useState } from 'react';
import {
  FileText,
  Palette,
  Smartphone,
  Download,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Wrench,
  ExternalLink,
  Github,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeader, IconBox } from '../shared';
import { type ColorVariant, getColorClasses } from '../../utils/colors.util';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: ColorVariant;
}

interface SectionTab {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  color: ColorVariant;
}

// Constants
const FEATURES: Feature[] = [
  {
    icon: Palette,
    title: 'Beautiful Design',
    description:
      'Clean, modern templates that make your work shine. No design skills needed.',
    color: 'violet',
  },
  {
    icon: FileText,
    title: 'All Your Sections',
    description:
      'Experience, education, projects, skills - everything organized beautifully.',
    color: 'blue',
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    description:
      'Your portfolio looks perfect on any device, from desktop to mobile.',
    color: 'emerald',
  },
  {
    icon: Download,
    title: 'PDF Export',
    description:
      'Download your portfolio as a professional PDF to share anywhere.',
    color: 'amber',
  },
];

const SECTION_TABS: SectionTab[] = [
  {
    id: 'experience',
    icon: Briefcase,
    title: 'Work Experience',
    desc: 'Timeline of your career journey',
    color: 'emerald',
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education',
    desc: 'Your academic background',
    color: 'blue',
  },
  {
    id: 'projects',
    icon: FolderKanban,
    title: 'Projects',
    desc: 'Showcase your best work',
    color: 'amber',
  },
  {
    id: 'skills',
    icon: Wrench,
    title: 'Skills',
    desc: 'Technologies you master',
    color: 'violet',
  },
];

// Sub-components
function FeatureCard({ feature }: { feature: Feature }) {
  const colors = getColorClasses(feature.color);

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700">
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg}`}
      >
        <feature.icon className={`h-6 w-6 ${colors.text}`} />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        {feature.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {feature.description}
      </p>
    </div>
  );
}

function SectionTabButton({
  tab,
  isActive,
  onClick,
}: {
  tab: SectionTab;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-xl p-3 text-left transition-all ${
        isActive
          ? 'bg-gray-100 dark:bg-gray-800'
          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
      }`}
    >
      <IconBox icon={tab.icon} color={tab.color} />
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{tab.title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{tab.desc}</p>
      </div>
    </button>
  );
}

function ExperiencePreview() {
  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <IconBox icon={Briefcase} color="emerald" />
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          Experience
        </h4>
      </div>
      <div className="space-y-3">
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Senior Frontend Developer
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tech Company Inc.
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                Jan 2022 - Present · San Francisco, CA
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              Current
            </span>
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Leading frontend architecture and mentoring junior developers. Built
            scalable React applications.
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Frontend Developer
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Startup Labs
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
              Mar 2020 - Dec 2021 · Remote
            </p>
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Developed user-facing features using React and TypeScript. Improved
            performance by 40%.
          </p>
        </div>
      </div>
    </>
  );
}

function EducationPreview() {
  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <IconBox icon={GraduationCap} color="blue" />
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          Education
        </h4>
      </div>
      <div className="space-y-3">
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
          <p className="font-semibold text-gray-900 dark:text-white">
            B.S. Computer Science
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Stanford University
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
            2016 - 2020 · Stanford, CA
          </p>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Graduated with honors. Focused on software engineering and machine
            learning.
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
          <p className="font-semibold text-gray-900 dark:text-white">
            Full Stack Web Development
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Udacity Nanodegree
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">2019</p>
        </div>
      </div>
    </>
  );
}

function ProjectsPreview() {
  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <IconBox icon={FolderKanban} color="amber" />
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          Projects
        </h4>
      </div>
      <div className="space-y-3">
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                E-Commerce Platform
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Full-stack e-commerce solution with React, Node.js, and
                PostgreSQL.
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {['React', 'Node.js', 'PostgreSQL'].map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-3 flex gap-3">
            <a
              href="#"
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ExternalLink className="h-3 w-3" /> Live Demo
            </a>
            <a
              href="#"
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Github className="h-3 w-3" /> Source
            </a>
          </div>
        </div>
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
          <p className="font-semibold text-gray-900 dark:text-white">
            AI Chat Application
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Real-time chat app with AI-powered responses using OpenAI API.
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {['Next.js', 'OpenAI', 'Tailwind'].map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function SkillsPreview() {
  const skillCategories = [
    {
      name: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    { name: 'Backend', skills: ['Node.js', 'Python', 'PostgreSQL', 'GraphQL'] },
    { name: 'Tools', skills: ['Git', 'Docker', 'AWS', 'Figma'] },
  ];

  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <IconBox icon={Wrench} color="violet" />
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          Skills
        </h4>
      </div>
      <div className="space-y-4">
        {skillCategories.map((category) => (
          <div key={category.name}>
            <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              {category.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function SectionPreview({ activeSection }: { activeSection: string }) {
  const previews: Record<string, React.ReactNode> = {
    experience: <ExperiencePreview />,
    education: <EducationPreview />,
    projects: <ProjectsPreview />,
    skills: <SkillsPreview />,
  };

  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-blue-500/10 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="p-6">{previews[activeSection]}</div>
      </div>
    </div>
  );
}

// Main component
export function Features() {
  const [activeSection, setActiveSection] = useState('experience');

  return (
    <section id="features" className="relative py-24">
      <div className="absolute inset-0 -z-10 bg-gray-50 dark:bg-gray-900/50" />

      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Features"
          badgeColor="violet"
          title="Everything you need to showcase your work"
          description="Build a professional portfolio in minutes with powerful features designed for developers, designers, and creators."
        />

        {/* Feature Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>

        {/* Interactive Section Preview */}
        <div className="mt-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: Tab buttons */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                Organized sections for every part of your career
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Showcase your experience, education, projects, and skills with
                dedicated sections that are easy to fill and beautiful to view.
              </p>

              <div className="mt-8 space-y-2">
                {SECTION_TABS.map((tab) => (
                  <SectionTabButton
                    key={tab.id}
                    tab={tab}
                    isActive={activeSection === tab.id}
                    onClick={() => setActiveSection(tab.id)}
                  />
                ))}
              </div>
            </div>

            {/* Right: Dynamic preview */}
            <SectionPreview activeSection={activeSection} />
          </div>
        </div>
      </div>
    </section>
  );
}
