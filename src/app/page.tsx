import Login from '@/pages/user/login';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  return <Login />;
}
