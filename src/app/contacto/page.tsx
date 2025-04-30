import { ContactForm } from '@/components/pages/contact/ContactForm';
import Image from 'next/image';

const page = () => {
  return (
    <div className="grid h-screen grid-cols-1 py-20 md:grid-cols-2">
      <div className="relative mt-10 ml-20 hidden h-[600px] w-[900px] md:block">
        <Image
          fill
          className="rounded-lg object-cover"
          priority
          src="https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="Decorative contact"
        />
      </div>

      <div className="flex items-center justify-center px-6 md:px-16">
        <div className="w-full max-w-xl space-y-8">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-secondaryBlack font-engravers text-3xl font-bold">
              Contactate con nosotros
            </h1>
            <p className="text-secondaryBlack">
              ¿Tenés una pregunta, una idea o simplemente querés decir hola? Dejanos tu mensaje y
              nos pondremos en contacto a la brevedad. ¡Nos encantaría saber de vos!
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default page;
