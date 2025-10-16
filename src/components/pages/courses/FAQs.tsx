import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const coursesFAQs = [
  {
    question: '¿Cómo accedo a los cursos después de comprar?',
    answer:
      'Una vez comprada la formación, tendrás acceso inmediato al contenido a través de nuestra plataforma online. Podrás comenzar a aprender en cuanto quieras, desde cualquier lugar.',
  },
  {
    question: '¿Los cursos son grabados o en vivo?',
    answer:
      'Todos los cursos son 100% online y grabados. Si surgen dudas comunes entre los alumnos, organizamos clases en vivo adicionales sin costo extra, para aclararlas.',
  },
  {
    question: '¿El acceso al curso tiene límite de tiempo?',
    answer:
      'No, el acceso es de por vida con un solo pago. Podrás revisar los contenidos siempre que lo necesites.',
  },
  {
    question: '¿Qué pasa si no estoy satisfecho con el curso?',
    answer:
      'Si no quedas satisfecho, ofrecemos una garantía de reembolso total dentro de los primeros 60 días. Solo necesitás enviar un correo desde nuestra sección de contacto.',
  },
  {
    question: '¿Se actualizan los cursos con nueva información?',
    answer:
      'Sí, todos los cursos se actualizan constantemente para mantenerlos alineados con las últimas tendencias y técnicas de producción musical.',
  },
  {
    question: '¿Puedo aprender a mi propio ritmo?',
    answer:
      'Sí, los cursos están diseñados para que puedas avanzar a tu propio ritmo, adaptándose a tus horarios y disponibilidad.',
  },
  {
    question: '¿Qué tipo de contenido incluyen los cursos?',
    answer:
      'Nuestros cursos incluyen lecciones detalladas sobre técnicas de producción, mezcla, composición, y más. Están diseñados para que puedas aplicar lo aprendido de forma inmediata en tus proyectos musicales.',
  },
];

export function FAQs() {
  return (
    <div className="bg-secondaryBg w-full p-20">
      <h1 className="text-backgroundLight mb-10 text-center text-3xl font-bold tracking-tight">
        Preguntas Frecuentes
      </h1>
      <Accordion type="multiple" className="mx-auto w-full max-w-2xl">
        {coursesFAQs.map((faq, index) => (
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
