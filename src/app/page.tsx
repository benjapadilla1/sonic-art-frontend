import { DiscordSection } from '@/components/pages/home/DiscordSection';
import { Hero } from '@/components/pages/home/Hero';
import { LastReleases } from '@/components/pages/home/LastReleases';
import { Testimonials } from '@/components/pages/home/Testimonials';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <Testimonials />
      <LastReleases />
      <DiscordSection />
    </div>
  );
}
