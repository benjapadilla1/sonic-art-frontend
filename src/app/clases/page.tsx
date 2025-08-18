import BookAClass from '@/components/pages/classes/BookAClass';
import { FAQs } from '@/components/pages/classes/FAQs';

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pt-20">
      <BookAClass />
      <FAQs />
    </div>
  );
};

export default page;
