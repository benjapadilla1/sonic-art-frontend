'use client';

import DetailCourse from '@/components/pages/courses/detail/DetailCourse';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const DetailPage = () => {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';

  return (
    <div className="pt-20">
      <div className="pt-2 pl-10">
        <Button variant="outline" className="bg-white">
          <Link href={`/cursos`}>Volver</Link>
        </Button>
      </div>
      <DetailCourse id={id} />
    </div>
  );
};

export default DetailPage;
