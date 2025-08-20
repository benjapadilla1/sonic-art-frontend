import Contact from '@/components/pages/contact/Contact';
import Section from '@/components/ui/section';

const page = () => {
  return (
    <Section className="grid min-h-screen grid-cols-1 py-20 md:grid-cols-2">
      <Contact />
    </Section>
  );
};

export default page;
