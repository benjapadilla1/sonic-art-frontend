import { cn } from '@/lib/utils';
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '' }) => {
  return (
    <section className={cn('rounded-md px-4 py-16 sm:px-6 sm:py-24 lg:px-16 lg:py-32', className)}>
      {children}
    </section>
  );
};

export default Section;
