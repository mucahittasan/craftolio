import { Blocks, Gem, Palette } from 'lucide-react';
import React from 'react';

const featuresList = [
  {
    icon: <Palette size={28} className="text-primary" />,
    title: 'Easy Customization',
    description:
      'Choose from various themes, colors, and fonts to create a portfolio that truly represents you.',
  },
  {
    icon: <Blocks size={28} className="text-primary" />,
    title: 'Structured Sections',
    description:
      'Easily add and manage your experience, education, projects, and skills in a structured and professional way.',
  },
  {
    icon: <Gem size={28} className="text-primary" />,
    title: 'AI-Powered Assistance',
    description:
      'Leverage AI to get suggestions for your descriptions, helping you showcase your skills effectively.',
  },
];

export function Features() {
  return (
    <section id="features" className="container mx-auto px-4 py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Everything You Need to Shine
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl md:text-lg">
          Craftolio provides powerful features to make your portfolio stand out
          from the crowd.
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featuresList.map((feature, index) => (
          <div
            key={index}
            className="bg-card flex flex-col items-start rounded-lg border p-6 shadow-sm"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
