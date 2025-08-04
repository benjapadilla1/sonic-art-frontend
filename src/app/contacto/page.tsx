import { ContactForm } from '@/components/pages/contact/ContactForm';
import Section from '@/components/ui/section';
import Image from 'next/image';

// TODO: Cambiar a componente

const page = () => {
  return (
    <Section className="grid min-h-screen grid-cols-1 py-20 md:grid-cols-2">
      <div className="relative hidden md:ml-20 md:block">
        <Image
          fill
          className="rounded-lg object-cover"
          priority
          src="/images/contact/contact.png"
          alt="Decorative contact"
        />
      </div>

      <div className="flex items-center justify-center px-4 pt-16 sm:px-8 md:px-16">
        <div className="w-full max-w-xl space-y-8">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-secondaryBlack font-engravers text-3xl font-bold">
              Contactate con nosotros
            </h1>
            <div className="flex flex-col justify-center gap-1 md:justify-start">
              <p className="text-secondaryBlack">
                ¿Tenés una pregunta, una idea o simplemente querés decir hola?
              </p>
              <p className="text-secondaryBlack pl-1">
                Dejanos tu mensaje y nos pondremos en contacto a la brevedad. ¡Nos encantaría saber
                de vos!
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </Section>
  );
};

export default page;
