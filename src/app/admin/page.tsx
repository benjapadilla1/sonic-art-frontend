import { CoursesCard } from '@/components/pages/admin/courses/CoursesCard';
import { SamplePacks } from '@/components/pages/admin/samplePacks/SamplePacks';
import UsersDashboard from '@/components/pages/admin/users/UsersDashboard';

const page = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col pt-20">
      <CoursesCard />
      <SamplePacks />
      <UsersDashboard />
    </div>
  );
};

export default page;
