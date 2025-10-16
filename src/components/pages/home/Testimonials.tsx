import { Button } from '@/components/ui/button';
import Section from '@/components/ui/section';
import Script from 'next/script';
import { LabelLogoCarousel } from './LabelLogoCarousel';

interface TestimonialsProps {
  isLandingPage?: boolean;
}

export const Testimonials = ({ isLandingPage }: TestimonialsProps) => {
  return (
    <Section className="">
      <p className="text-secondaryBg mb-12 text-center text-3xl font-semibold tracking-tight">
        Experiencias de <span className="text-ctas">nuestra comunidad</span>
      </p>
      <Script
        src="https://widget.senja.io/widget/569bb6fd-a0e3-46bc-ac0d-5bdf0793dc04/platform.js"
        type="text/javascript"
        async
      />
      <div
        className="senja-embed"
        data-id="569bb6fd-a0e3-46bc-ac0d-5bdf0793dc04"
        data-mode="shadow"
        data-lazyload="false"
        style={{ display: 'block', width: '100%' }}
      />
      {isLandingPage && (
        <>
          <div className="mt-8 flex justify-center">
            <a
              href="https://senja.io/p/sonicartlab/r/DZg3vo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="py-7 text-xl">
                ¡Déjanos tu reseña!
              </Button>
            </a>
          </div>
          <LabelLogoCarousel />
        </>
      )}
    </Section>
  );
};
