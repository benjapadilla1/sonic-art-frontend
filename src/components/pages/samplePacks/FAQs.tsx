import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: '¿Cómo compro un sample pack en Sonic Art?',
    answer:
      'Seleccioná el sample pack que te interese, agregalo al carrito y completá el pago. Una vez confirmado, recibirás el enlace para descargar los archivos de inmediato.',
  },
  {
    question: '¿Qué incluyen los sample packs de Sonic Art?',
    answer:
      'Nuestros packs contienen one shots, loops, archivos MIDI, presets y drum racks para Ableton, todo cuidadosamente curado para potenciar tu creatividad según el género musical.',
  },
  {
    question: '¿En qué formatos se entregan los archivos de los sample packs?',
    answer:
      'Los sonidos vienen en formatos WAV 24 bits 48kHz, MIDI y Ableton Racks, listos para usar en cualquier DAW o proyecto musical.',
  },
  {
    question: '¿Los sample packs son royalty free?',
    answer:
      'Sí, todos los archivos son 100% royalty free. Podés usarlos en tus producciones comerciales y personales sin preocuparte por licencias adicionales.',
  },
  {
    question: '¿Ofrecen sample packs gratuitos?',
    answer:
      'Sí, contamos con packs gratuitos para que puedas empezar a expandir tu librería de sonidos sin costo. También lanzamos bundles especiales a precios promocionales.',
  },
  {
    question: '¿Puedo usar los sonidos en cualquier estilo de música?',
    answer:
      'Aunque cada pack tiene una curaduría específica para determinados géneros, los sonidos son lo suficientemente versátiles para adaptarse a distintos estilos musicales.',
  },
  {
    question: '¿Lanzan nuevos sample packs regularmente?',
    answer:
      'Sí, publicamos nuevos sample packs y bundles de forma periódica para mantener tu biblioteca de sonidos siempre fresca y actualizada.',
  },
];

export function FAQs() {
  return (
    <div className="bg-secondaryBg w-full p-20">
      <h1 className="text-backgroundLight mb-10 text-center text-3xl font-bold tracking-tight">
        Preguntas Frecuentes
      </h1>
      <Accordion type="multiple" className="mx-auto w-full max-w-2xl">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-backgroundLight text-lg">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-backgroundLight">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
