'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';

interface GameCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  badges: Array<{
    text: string;
    color: string;
  }>;
  delay?: number;
}

export default function GameCard({ 
  title, 
  description, 
  icon, 
  href, 
  badges, 
  delay = 0 
}: GameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={href}>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 cursor-pointer hover:shadow-2xl transition-all duration-300 h-full">
          <div className="text-4xl md:text-6xl mb-4">{icon}</div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4 text-sm md:text-base leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 text-xs md:text-sm">
            {badges.map((badge, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full ${badge.color}`}
              >
                {badge.text}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}