import { DiscordSection } from '@/components/pages/home/DiscordSection';
import { Hero } from '@/components/pages/home/Hero';
import { LastReleases } from '@/components/pages/home/LastReleases';
import LatestVideos from '@/components/pages/home/LatestVideos';
import Methodology from '@/components/pages/home/Methodology';
import { StartYourJourney } from '@/components/pages/home/StartYourJourney';
import { Testimonials } from '@/components/pages/home/Testimonials';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <Methodology />
      <Testimonials />
      <LastReleases />
      <StartYourJourney />
      <LatestVideos />
      <DiscordSection />
    </div>
  );
}
