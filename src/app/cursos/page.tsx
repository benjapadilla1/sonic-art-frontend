import Courses from '@/components/pages/courses/Courses';
import { FAQs } from '@/components/pages/courses/FAQs';

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pt-20">
      <Courses />
      <FAQs />
    </div>
  );
};

export default page;
