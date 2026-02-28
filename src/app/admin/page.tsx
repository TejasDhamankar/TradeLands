import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_SESSION_COOKIE, getAdminSessionValue } from '@/lib/adminAuth';

export default async function AdminRootPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (session === getAdminSessionValue()) {
    redirect('/admin/dashboard');
  }

  redirect('/admin/login');
}

