'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  animateOnScroll?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, className = '', animateOnScroll = true }) => {
  const content = (
    <div className={cn('rounded-md px-4 py-16 sm:px-6 sm:py-24 lg:px-16 lg:py-32', className)}>
      {children}
    </div>
  );

  if (!animateOnScroll) return content;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {content}
    </motion.section>
  );
};

export default Section;
