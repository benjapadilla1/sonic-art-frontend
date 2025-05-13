'use client';

import Section from '@/components/ui/section';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Methodology() {
  const steps = [
    {
      title: 'A tu ritmo, sin presión',
      description:
        'Todo el contenido está pensado para que avances de manera flexible, respetando tu proceso creativo. La música nace mejor cuando te sentís libre, no apurado.',
      image:
        'https://images.pexels.com/photos/8133244/pexels-photo-8133244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      title: 'Simple, claro y aplicable',
      description:
        'Cada explicación va directo al punto. Nos enfocamos en lo que realmente importa para que puedas usarlo en tu música de inmediato, sin enredos ni vueltas técnicas innecesarias.',
      image:
        'https://images.pexels.com/photos/29463308/pexels-photo-29463308.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      title: 'Crear tu propio sonido',
      description:
        'Más que enseñarte a copiar, te ayudamos a construir tu identidad sonora. Combinamos técnica, selección de sonidos y mentalidad para que cada track refleje quién sos.',
      image:
        'https://images.pexels.com/photos/8132964/pexels-photo-8132964.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      title: 'Crecimiento real',
      description:
        'Actualizamos y mejoramos constantemente nuestros contenidos para acompañarte en todas las etapas: desde las primeras ideas hasta el desarrollo de un sonido profesional, claro y auténtico.',
      image:
        'https://images.pexels.com/photos/8197232/pexels-photo-8197232.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
  ];

  return (
    <Section className="bg-secondaryLight flex flex-col items-center gap-20 !px-0 py-16">
      <motion.h2
        className="font-engravers text-secondaryBlack text-center text-4xl font-bold tracking-widest uppercase md:text-5xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Nuestra Metodología
      </motion.h2>

      <div className="flex w-full max-w-6xl flex-col gap-40">
        {steps.map((step, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              className={`flex flex-col items-center gap-20 px-4 md:px-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              {isEven ? (
                <>
                  <div className="relative h-[300px] w-full overflow-hidden rounded-3xl shadow-md md:w-[500px]">
                    <Image src={step.image} alt={`Paso ${idx + 1}`} fill className="object-cover" />
                  </div>

                  <div className="border-ctas bg-secondaryLight relative w-full rounded-3xl border-[2px] p-8 shadow-lg md:w-1/2">
                    <div className="text-ctas absolute top-4 right-6 text-8xl font-extrabold opacity-20">
                      {idx + 1}
                    </div>
                    <h3 className="font-engravers mb-4 text-2xl font-semibold">{step.title}</h3>
                    <p className="leading-relaxed">{step.description}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="border-ctas bg-secondaryLight text-secondaryDark relative order-2 w-full rounded-3xl border-[2px] p-8 shadow-lg md:order-1 md:w-1/2">
                    <div className="text-ctas absolute top-4 right-6 text-8xl font-extrabold opacity-20">
                      {idx + 1}
                    </div>
                    <h3 className="font-engravers mb-4 text-2xl font-semibold">{step.title}</h3>
                    <p className="leading-relaxed">{step.description}</p>
                  </div>
                  <div className="relative h-[300px] w-full overflow-hidden rounded-3xl shadow-md md:w-[500px]">
                    <Image src={step.image} alt={`Paso ${idx + 1}`} fill className="object-cover" />
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
