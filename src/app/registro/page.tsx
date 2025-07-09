import { AuthForm } from '@/components/pages/auth/AuthForm';

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <AuthForm mode="register" />
    </div>
  );
};

export default page;
