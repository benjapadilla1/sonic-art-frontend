import Link from 'next/link';

const Admin = () => {
  return (
    <div className="hidden lg:flex">
      <Link href="/admin" className="font-engravers text-backgroundLight text-lg font-semibold">
        Admin
      </Link>
    </div>
  );
};

export default Admin;
