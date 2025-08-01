'use client';

import { EditCourse } from '@/components/pages/admin/courses/EditCourse';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const CourseDetailPage = () => {
  const params = useParams();
  const id =
    typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';

  return (
    <div className="pt-20">
      <Link className="p-6" href={`/admin`}>
        <Button variant="outline">Volver</Button>
      </Link>
      <EditCourse id={id} />
    </div>
  );
};

export default CourseDetailPage;
