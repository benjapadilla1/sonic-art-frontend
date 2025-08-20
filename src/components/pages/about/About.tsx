'use client';

import Section from '@/components/ui/section';
import { motion } from 'framer-motion';

export default function AboutUsSection() {
  return (
    <Section className="bg-secondaryBg text-secondaryLight relative flex w-screen flex-col gap-16 px-4 !py-14 sm:px-8 lg:px-0">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="font-engravers mb-12 text-center text-3xl font-semibold sm:text-4xl md:text-5xl">
          Mi Historia
        </h3>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              Mi nombre es <strong>Joaquín Arab Cohen</strong>, soy compositor, productor musical y
              diseñador sonoro nacido en Córdoba, Argentina. Desde muy chico sentí una conexión
              profunda con la música: empecé tocando la flauta y el piano, explorando ese mundo que
              parecía no tener límites.
            </p>

            <p>
              Más adelante, fue la música electrónica la que captó mi atención. Fascinado por los
              sonidos sintéticos y las posibilidades de los sintetizadores, comencé a crear mis
              propias producciones, transitando estilos que iban desde el house hasta la música
              experimental.
            </p>

            <p>
              Mi búsqueda artística me llevó a viajar por Europa, donde me enfoqué en desarrollar mi
              carrera como productor de música electrónica. Esa experiencia de vida, tan
              enriquecedora, expandió no sólo mi mirada sobre la música, sino también sobre la
              creatividad en general.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              Al regresar a Argentina, sentí la necesidad de unir dos mundos que me apasionaban: la
              música electrónica y la música orquestal. Esta fusión de lo orgánico y lo sintético
              definió mi estilo como compositor y me abrió las puertas a nuevos desafíos, como la
              creación de la banda sonora original de la película <em>“La Mujer De Vidrio”</em>,
              donde combiné instrumentos clásicos, sintetizadores y matices de la música nativa
              argentina.
            </p>

            <p>
              En el ámbito de la música electrónica, soy conocido como <strong>J. Koen</strong>,
              nombre bajo el cual he firmado tracks en sellos icónicos como Nervous Records y Nite
              Grooves, entre otros. Mi sonido actual toma influencias del house, el jazz, el funk,
              el soul y el disco, manteniendo siempre viva la intención de transmitir emoción a
              través de cada producción.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 flex flex-col gap-8 md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/artist/3QbVOovjszdth5tVlhaRXt?utm_source=generator&theme=0"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/artist/0J6pS88bfD9OL3FYOA6WA3?utm_source=generator"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </motion.div>
      </motion.div>
    </Section>
  );
}
