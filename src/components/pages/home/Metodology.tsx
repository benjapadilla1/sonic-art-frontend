'use client';

import Section from '@/components/ui/section';
import { motion } from 'framer-motion';

export default function Methodology() {
  const steps = [
    {
      title: 'A tu ritmo, sin presión',
      description:
        'Todo el contenido está pensado para que avances de manera flexible, respetando tu proceso creativo. La música nace mejor cuando te sentís libre, no apurado.',
    },
    {
      title: 'Simple, claro y aplicable',
      description:
        'Cada explicación va directo al punto. Nos enfocamos en lo que realmente importa para que puedas usarlo en tu música de inmediato, sin enredos ni vueltas técnicas innecesarias.',
    },
    {
      title: 'Crear tu propio sonido',
      description:
        'Más que enseñarte a copiar, te ayudamos a construir tu identidad sonora. Combinamos técnica, selección de sonidos y mentalidad para que cada track refleje quién sos.',
    },
    {
      title: 'Crecimiento real',
      description:
        'Actualizamos y mejoramos constantemente nuestros contenidos para acompañarte en todas las etapas: desde las primeras ideas hasta el desarrollo de un sonido profesional, claro y auténtico.',
    },
  ];

  return (
    <Section className="bg-secondaryLight flex flex-col items-center gap-12 px-6 py-16">
      <motion.h2
        className="font-engravers text-center text-4xl font-bold tracking-widest uppercase md:text-5xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ color: '#521503' }}
      >
        Nuestra Metodología
      </motion.h2>

      <div className="grid w-full max-w-6xl gap-10 md:grid-cols-2">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            className="relative overflow-hidden rounded-3xl p-8 shadow-lg transition-transform duration-300 hover:scale-105"
            style={{
              backgroundColor: '#f2ebe2',
              color: '#442d1c',
              border: `2px solid #ee8b1a`,
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <div
              className="pointer-events-none absolute top-4 right-6 text-8xl font-extrabold opacity-20"
              style={{ color: '#ee8b1a' }}
            >
              {idx + 1}
            </div>
            <h3 className="mb-4 text-2xl font-semibold">{step.title}</h3>
            <p className="leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
