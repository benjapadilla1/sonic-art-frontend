import { Button } from '@/components/ui/button';
import Section from '@/components/ui/section';
import Link from 'next/link';

export const DiscordSection = () => {
  return (
    <Section className="bg-secondaryBg flex flex-col items-center justify-center gap-5 text-white">
      <p className="text-3xl font-semibold">Sumate a nuestra comunidad de artistas</p>
      <p>Unite a nuestro Discord y conectá con otros productores</p>
      <Button className="px-8 py-6" asChild>
        <Link href="/login">
          <p className="text-xl">Unirse</p>
        </Link>
      </Button>
    </Section>
  );
};
