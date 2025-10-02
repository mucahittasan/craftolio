'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/src/lib/utils'; // Projemizdeki doğru yol '@/lib/utils'
import { motion } from 'framer-motion';

// ... (Sparkle arayüzü ve bileşeni aynı kalabilir)

interface SparkleType {
  id: string;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
  lifespan: number;
}

interface SparklesTextProps {
  text: string;
  className?: string;
  sparklesCount?: number;
}

export const SparklesText: React.FC<SparklesTextProps> = ({
  text,
  className,
  sparklesCount = 10,
}) => {
  const [sparkles, setSparkles] = useState<SparkleType[]>([]);

  useEffect(() => {
    const generateStar = (): SparkleType => {
      const starX = `${Math.random() * 100}%`;
      const starY = `${Math.random() * 100}%`;
      // DEĞİŞİKLİK: Renkler artık doğrudan burada tanımlı.
      const color = Math.random() > 0.5 ? '#ff4040' : '#a640ff';
      const delay = Math.random() * 2;
      const scale = Math.random() * 1 + 0.3;
      const lifespan = Math.random() * 10 + 5;
      const id = `${starX}-${starY}-${Date.now()}`;
      return { id, x: starX, y: starY, color, delay, scale, lifespan };
    };
    // ... (useEffect'in geri kalanı aynı kalabilir)
  }, [sparklesCount]);

  return (
    <div
      className={cn(
        'relative inline-block text-4xl font-bold sm:text-5xl md:text-6xl',
        className,
      )}
    >
      {/* ... (sparkles.map kısmı aynı kalabilir) */}

      {/* DEĞİŞİKLİK: Gradient renkleri doğrudan burada tanımlı. */}
      <span className="relative bg-gradient-to-r from-[#ff4040] via-[#a640ff] to-[#409cff] bg-clip-text text-transparent">
        {text}
      </span>
    </div>
  );
};
