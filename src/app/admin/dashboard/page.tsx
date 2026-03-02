import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { connectToDatabase } from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import { ADMIN_SESSION_COOKIE, getAdminSessionValue } from '@/lib/adminAuth';

type EnquiryRow = {
  _id: string;
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  investmentPlan: string[];
  investmentStatus: string[];
  investmentTimeline: string[];
  investmentPurpose: string[];
  preferredContactTime: string[];
  message?: string;
  createdAt: Date;
};

async function deleteEnquiry(formData: FormData) {
  'use server';

  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (session !== getAdminSessionValue()) {
    redirect('/admin/login');
  }

  const enquiryId = String(formData.get('enquiryId') || '');
  if (!enquiryId) return;

  await connectToDatabase();
  await Enquiry.findByIdAndDelete(enquiryId);
  revalidatePath('/admin/dashboard');
}

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (session !== getAdminSessionValue()) {
    redirect('/admin/login');
  }

  await connectToDatabase();
  const rawEnquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
  const enquiries: EnquiryRow[] = rawEnquiries.map((enquiry) => ({
    _id: String(enquiry._id),
    fullName: String(enquiry.fullName ?? ''),
    mobile: String(enquiry.mobile ?? ''),
    email: String(enquiry.email ?? ''),
    city: String(enquiry.city ?? ''),
    investmentPlan: Array.isArray(enquiry.investmentPlan) ? enquiry.investmentPlan.map(String) : [],
    investmentStatus: Array.isArray(enquiry.investmentStatus) ? enquiry.investmentStatus.map(String) : [],
    investmentTimeline: Array.isArray(enquiry.investmentTimeline) ? enquiry.investmentTimeline.map(String) : [],
    investmentPurpose: Array.isArray(enquiry.investmentPurpose) ? enquiry.investmentPurpose.map(String) : [],
    preferredContactTime: Array.isArray(enquiry.preferredContactTime) ? enquiry.preferredContactTime.map(String) : [],
    message: typeof enquiry.message === 'string' ? enquiry.message : '',
    createdAt: enquiry.createdAt ? new Date(enquiry.createdAt) : new Date(),
  }));

  const now = Date.now();
  const recentThreshold = now - 7 * 24 * 60 * 60 * 1000;
  const recentCount = enquiries.filter((enquiry) => enquiry.createdAt.getTime() >= recentThreshold).length;
  const latestEnquiry = enquiries[0];

  return (
    <main className="min-h-screen bg-[#f7f7f5] py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-base/70">
              TradeLands Admin
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-[#0f172a]">Dashboard Overview</h1>
            <p className="text-sm text-slate-500">
              Track enquiry activity and manage follow-ups from one place.
            </p>
          </div>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Logout
            </button>
          </form>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Total Enquiries</p>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-3xl font-semibold text-slate-900">{enquiries.length}</p>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                +{recentCount} last 7 days
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Latest Enquiry</p>
            <div className="mt-3 space-y-1">
              <p className="text-lg font-semibold text-slate-900">{latestEnquiry?.fullName || '—'}</p>
              <p className="text-sm text-slate-500">{latestEnquiry?.email || 'No enquiries yet'}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Follow Up</p>
            <div className="mt-3 space-y-1">
              <p className="text-lg font-semibold text-slate-900">
                {latestEnquiry?.preferredContactTime?.length
                  ? latestEnquiry.preferredContactTime.join(', ')
                  : 'No preference set'}
              </p>
              <p className="text-sm text-slate-500">Use the table to respond quickly.</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-100 px-6 py-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Enquiry Inbox</h2>
              <p className="text-sm text-slate-500">Review the latest investor requests.</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Updated {new Date().toLocaleDateString('en-IN', { dateStyle: 'medium' })}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Client</th>
                  <th className="px-6 py-4 font-semibold">Contact</th>
                  <th className="px-6 py-4 font-semibold">Plan</th>
                  <th className="px-6 py-4 font-semibold">Timeline</th>
                  <th className="px-6 py-4 font-semibold">Received</th>
                  <th className="px-6 py-4 font-semibold">Details</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.length === 0 ? (
                  <tr>
                    <td className="px-6 py-10 text-slate-500" colSpan={7}>
                      No enquiries yet.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enquiry) => (
                    <tr key={enquiry._id} className="border-t border-slate-100 align-top">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">{enquiry.fullName}</p>
                        <p className="text-xs text-slate-500">{enquiry.city || 'City not provided'}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <p>{enquiry.mobile}</p>
                        <p>{enquiry.email}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {enquiry.investmentPlan?.length ? enquiry.investmentPlan.join(', ') : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {enquiry.investmentTimeline?.length ? enquiry.investmentTimeline.join(', ') : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {new Date(enquiry.createdAt).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <details className="group">
                          <summary className="cursor-pointer text-sm font-semibold text-forest-base">
                            View details
                          </summary>
                          <div className="mt-3 space-y-1 text-xs text-slate-600">
                            <p><strong>Status:</strong> {enquiry.investmentStatus?.join(', ') || 'N/A'}</p>
                            <p><strong>Purpose:</strong> {enquiry.investmentPurpose?.join(', ') || 'N/A'}</p>
                            <p><strong>Contact:</strong> {enquiry.preferredContactTime?.join(', ') || 'N/A'}</p>
                            <p><strong>Message:</strong> {enquiry.message || 'N/A'}</p>
                          </div>
                        </details>
                      </td>
                      <td className="px-6 py-4">
                        <form action={deleteEnquiry}>
                          <input type="hidden" name="enquiryId" value={String(enquiry._id ?? '')} />
                          <button
                            type="submit"
                            className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
