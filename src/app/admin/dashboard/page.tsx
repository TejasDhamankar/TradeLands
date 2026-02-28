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

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-green-50/40 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-forest-dark">Admin Dashboard</h1>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-forest-base hover:bg-forest-dark text-white font-semibold transition"
            >
              Logout
            </button>
          </form>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left">
              <thead className="bg-forest-dark text-white">
                <tr>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Mobile</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">City</th>
                  <th className="p-4 font-semibold">Plan</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">View</th>
                  <th className="p-4 font-semibold">Delete</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.length === 0 ? (
                  <tr>
                    <td className="p-6 text-gray-500" colSpan={8}>
                      No enquiries yet.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enquiry) => (
                    <tr key={enquiry._id} className="border-t border-gray-100 align-top">
                      <td className="p-4 font-semibold text-forest-dark">{enquiry.fullName}</td>
                      <td className="p-4 text-gray-700">{enquiry.mobile}</td>
                      <td className="p-4 text-gray-700">{enquiry.email}</td>
                      <td className="p-4 text-gray-700">{enquiry.city}</td>
                      <td className="p-4 text-gray-700">
                        {enquiry.investmentPlan?.length ? enquiry.investmentPlan.join(', ') : 'N/A'}
                      </td>
                      <td className="p-4 text-gray-700">
                        {new Date(enquiry.createdAt).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </td>
                      <td className="p-4">
                        <details className="group">
                          <summary className="cursor-pointer text-forest-base font-semibold">View</summary>
                          <div className="mt-2 text-sm text-gray-600 space-y-1 min-w-[260px]">
                            <p><strong>Status:</strong> {enquiry.investmentStatus?.join(', ') || 'N/A'}</p>
                            <p><strong>Timeline:</strong> {enquiry.investmentTimeline?.join(', ') || 'N/A'}</p>
                            <p><strong>Purpose:</strong> {enquiry.investmentPurpose?.join(', ') || 'N/A'}</p>
                            <p><strong>Contact:</strong> {enquiry.preferredContactTime?.join(', ') || 'N/A'}</p>
                            <p><strong>Message:</strong> {enquiry.message || 'N/A'}</p>
                          </div>
                        </details>
                      </td>
                      <td className="p-4">
                        <form action={deleteEnquiry}>
                          <input type="hidden" name="enquiryId" value={String(enquiry._id ?? '')} />
                          <button
                            type="submit"
                            className="px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 font-semibold transition"
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
        </div>
      </div>
    </main>
  );
}
