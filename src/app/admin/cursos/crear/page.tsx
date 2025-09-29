import { CreateCourse } from '@/components/pages/admin/courses/create/CreateCourse';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const page = () => {
  return (
    <div className="pt-20">
      <div className="mx-auto mb-6 max-w-4xl">
        <Link href="/admin">
          <Button variant="outline" className="navy-button flex items-center gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Volver al Panel
          </Button>
        </Link>
      </div>
      <CreateCourse />
    </div>
  );
};

export default page;
