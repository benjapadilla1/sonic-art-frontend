'use client';

import Section from '@/components/ui/section';
import { motion } from 'framer-motion';
import { GraduationCap, Music2, Users } from 'lucide-react';

export const SonicArtPhilosophy = () => {
  return (
    <Section className="bg-secondaryBg relative w-screen overflow-hidden px-6 py-20 text-white md:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-12"
      >
        <h2 className="text-center text-3xl font-bold tracking-tight text-white md:text-5xl">
          Nuestra filosofía
        </h2>

        <div className="text-secondaryLight grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4 text-center">
            <Music2 className="text-ctas h-10 w-10" />
            <p className="text-base leading-relaxed md:text-lg">
              En <strong>Sonic Art</strong> no creemos en fórmulas mágicas. Creemos en el trabajo
              consciente, en el desarrollo de un oído crítico y en la importancia de encontrar tu
              propia identidad sonora.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <GraduationCap className="text-ctas h-10 w-10" />
            <p className="text-base leading-relaxed md:text-lg">
              Nuestra propuesta combina conocimientos técnicos sólidos con un enfoque artístico y
              creativo, siempre adaptado a tus necesidades y nivel de experiencia.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <Users className="text-ctas h-10 w-10" />
            <p className="text-base leading-relaxed md:text-lg">
              Más que una academia, <strong>Sonic Art</strong> es una comunidad de personas que
              comparten una misma pasión: la música como forma de vida.
            </p>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};
