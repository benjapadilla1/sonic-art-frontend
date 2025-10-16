'use client';

import Section from '@/components/ui/section';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Methodology() {
  const steps = [
    {
      id: 1,
      title: 'A tu ritmo, sin presión',
      description:
        'Todo el contenido está pensado para que avances de manera flexible, respetando tu proceso creativo. La música nace mejor cuando te sentís libre, no apurado.',
      image: '/images/methodology/step1.jpg',
    },
    {
      id: 2,
      title: 'Simple, claro y aplicable',
      description:
        'Cada explicación va directo al punto. Nos enfocamos en lo que realmente importa para que puedas usarlo en tu música de inmediato, sin enredos ni vueltas técnicas innecesarias.',
      image: '/images/methodology/step2.png',
    },
    {
      id: 3,
      title: 'Crear tu propio sonido',
      description:
        'Más que enseñarte a copiar, te ayudamos a construir tu identidad sonora. Combinamos técnica, selección de sonidos y mentalidad para que cada track refleje quién sos.',
      image: '/images/methodology/step3.jpg',
    },
    {
      id: 4,
      title: 'Crecimiento real',
      description:
        'Actualizamos y mejoramos constantemente nuestros contenidos para acompañarte en todas las etapas: desde las primeras ideas hasta el desarrollo de un sonido profesional, claro y auténtico.',
      image: '/images/methodology/step4.jpg',
    },
  ];

  return (
    <Section className="bg-secondaryBg flex flex-col items-center gap-20 rounded-none px-4 py-16 sm:px-6 md:px-8">
      <motion.h2
        className="text-backgroundLight text-center text-4xl font-bold tracking-tight uppercase md:text-5xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Nuestra Metodología
      </motion.h2>

      <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(step => (
          <motion.div
            key={step.id}
            className="group bg-totallyBlack flex flex-col items-center justify-start rounded-lg p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="text-backgroundLight text-center text-xl font-bold tracking-tight">
              {step.title}
            </h3>
            <p className="text-backgroundLight mt-2 text-center">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
