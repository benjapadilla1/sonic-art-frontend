import { Button } from '@/components/ui/button';
import Section from '@/components/ui/section';

export const DiscordSection = () => {
  return (
    <Section className="bg-secondaryBg flex flex-col items-center justify-center gap-5 text-white">
      <p className="font-engravers text-3xl font-semibold">
        Sumate a nuestra comunidad de artistas
      </p>
      <p>Unite a nuestro Discord y conectá con otros productores</p>
      <Button className="px-8 py-6" asChild>
        <a href="https://discord.com/invite/mz8XdqrCjU" target="_blank" rel="noopener noreferrer">
          <p className="text-xl">Unirse</p>
        </a>
      </Button>
    </Section>
  );
};
