import { CreateCourse } from '@/components/pages/admin/courses/create/CreateCourse';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const page = () => {
  return (
    <div className="pt-20">
      <Link className="p-6" href={`/admin`}>
        <Button variant="outline">Volver</Button>
      </Link>
      <CreateCourse />
    </div>
  );
};

export default page;
