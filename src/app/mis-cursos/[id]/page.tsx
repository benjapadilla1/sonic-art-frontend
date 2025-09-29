import CoursePlayer from '@/components/pages/myCourses/CoursePlayer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const page = () => {
  return (
    <div className="pt-20">
      <div className="pl-4">
        <Link href="/mis-cursos">
          <Button className="">Volver a Mis Cursos</Button>
        </Link>
      </div>
      <CoursePlayer />
    </div>
  );
};

export default page;
