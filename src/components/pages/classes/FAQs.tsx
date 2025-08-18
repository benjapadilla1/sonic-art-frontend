import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const classesFAQs = [
  {
    question: '¿Cómo reservo una clase de producción musical online?',
    answer:
      'Reservar es muy fácil: simplemente ingresá a nuestro calendario, elegí la fecha y el horario que prefieras, seleccioná la duración (1 o 2 horas) y confirmá tu reserva. Recibirás el enlace de Zoom en tu correo.',
  },
  {
    question: '¿Qué temas puedo trabajar en una clase personalizada de música?',
    answer:
      'Podemos abordar todo lo que necesites: producción, mezcla, composición, diseño sonoro, flujo de trabajo, creatividad o desarrollo de tu proyecto musical. Las clases 1 a 1 se adaptan a tus objetivos.',
  },
  {
    question: '¿Qué necesito para tomar una clase online por Zoom?',
    answer:
      'Solo necesitás una conexión a internet estable, un dispositivo con Zoom instalado y, preferentemente, tu DAW o proyecto musical abierto para trabajar en tiempo real.',
  },
  {
    question: '¿Cuánto dura una clase de producción musical personalizada?',
    answer:
      'Podés elegir entre clases de 1 hora o de 2 horas, según tu necesidad y disponibilidad. También ofrecemos packs de clases para un acompañamiento más continuo.',
  },
  {
    question: '¿Las clases de Sonic Art son para principiantes o para avanzados?',
    answer:
      'Nuestras clases están abiertas a todos los niveles. No importa si recién estás empezando o si ya llevás tiempo produciendo: adaptamos el contenido a tu experiencia y a tus objetivos musicales.',
  },
  {
    question: '¿Puedo reservar un pack de clases de producción musical?',
    answer:
      'Sí, ofrecemos packs de varias clases a un precio especial. Son ideales si buscás un seguimiento personalizado para avanzar de forma consistente en tus proyectos musicales.',
  },
  {
    question: '¿Qué pasa si necesito reprogramar mi clase online?',
    answer:
      'Si surge algún imprevisto, podés reprogramar tu clase avisando con al menos 24 horas de anticipación. Coordinamos un nuevo horario que se ajuste a tu agenda.',
  },
  {
    question: '¿Puedo enfocarme en un proyecto específico durante las clases 1 a 1?',
    answer:
      '¡Claro! Si tenés un track, un EP, una banda sonora o cualquier proyecto musical en proceso, podemos trabajar directamente sobre eso para ayudarte a pulirlo y llevarlo al siguiente nivel.',
  },
];

export function FAQs() {
  return (
    <div className="bg-secondaryBg w-full p-20">
      <h1 className="font-engravers text-backgroundLight mb-10 text-center text-3xl font-bold">
        Preguntas Frecuentes
      </h1>
      <Accordion type="multiple" className="mx-auto w-full max-w-3xl">
        {classesFAQs.map((faq, index) => (
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
