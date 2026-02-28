import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import { sendEnquiryNotification } from '@/lib/mailer';
import { ADMIN_SESSION_COOKIE, getAdminSessionValue } from '@/lib/adminAuth';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isAdmin(request: NextRequest) {
  const cookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return cookie === getAdminSessionValue();
}

async function sendToFormSubmit(payload: {
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  investmentPlan: string[];
  investmentStatus: string[];
  investmentTimeline: string[];
  investmentPurpose: string[];
  preferredContactTime: string[];
  message: string;
}) {
  const rawEndpoint = process.env.FORMSUBMIT_ENDPOINT || 'https://formsubmit.co/sales.tradelands@gmail.com';
  const identifier = rawEndpoint.replace(/^https?:\/\/formsubmit\.co\/(ajax\/)?/i, '').replace(/\/+$/, '');
  const endpoint = `https://formsubmit.co/ajax/${identifier}`;
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: origin,
      Referer: `${origin}/`,
    },
    body: JSON.stringify({
      _subject: 'New Enquiry - TradeLands',
      _captcha: 'false',
      _template: 'table',
      fullName: payload.fullName,
      mobile: payload.mobile,
      email: payload.email,
      city: payload.city,
      investmentPlan: payload.investmentPlan.join(', '),
      investmentStatus: payload.investmentStatus.join(', '),
      investmentTimeline: payload.investmentTimeline.join(', '),
      investmentPurpose: payload.investmentPurpose.join(', '),
      preferredContactTime: payload.preferredContactTime.join(', '),
      message: payload.message || 'Not provided',
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`FormSubmit failed (${response.status}): ${errorText.slice(0, 200)}`);
  }

  const result = (await response.json()) as { success?: string; message?: string };
  if (result.success !== 'true') {
    throw new Error(`FormSubmit rejected: ${result.message || 'Unknown error'}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const fullName = String(body.fullName ?? '').trim();
    const mobile = String(body.mobile ?? '').trim();
    const email = String(body.email ?? '').trim();
    const city = String(body.city ?? '').trim();
    const investmentPlan = Array.isArray(body.investmentPlan) ? body.investmentPlan : [];
    const investmentStatus = Array.isArray(body.investmentStatus) ? body.investmentStatus : [];
    const investmentTimeline = Array.isArray(body.investmentTimeline) ? body.investmentTimeline : [];
    const investmentPurpose = Array.isArray(body.investmentPurpose) ? body.investmentPurpose : [];
    const preferredContactTime = Array.isArray(body.preferredContactTime) ? body.preferredContactTime : [];
    const message = String(body.message ?? '').trim();

    if (!fullName || !mobile || !email || !city) {
      return NextResponse.json({ success: false, message: 'Missing required fields.' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ success: false, message: 'Invalid email format.' }, { status: 400 });
    }

    if (mobile.replace(/\D/g, '').length < 10) {
      return NextResponse.json({ success: false, message: 'Invalid mobile number.' }, { status: 400 });
    }

    await connectToDatabase();

    const saveEnquiryPromise = Enquiry.create({
      fullName,
      mobile,
      email,
      city,
      investmentPlan,
      investmentStatus,
      investmentTimeline,
      investmentPurpose,
      preferredContactTime,
      message,
    });

    const formSubmitPromise = sendToFormSubmit({
      fullName,
      mobile,
      email,
      city,
      investmentPlan,
      investmentStatus,
      investmentTimeline,
      investmentPurpose,
      preferredContactTime,
      message,
    });

    const [enquiry] = await Promise.all([saveEnquiryPromise, formSubmitPromise]);

    // Optional nodemailer notification (only if SMTP creds are configured).
    try {
      await sendEnquiryNotification({
        fullName,
        mobile,
        email,
        city,
        investmentPlan,
        investmentStatus,
        investmentTimeline,
        investmentPurpose,
        preferredContactTime,
        message,
        createdAt: enquiry.createdAt,
      });
    } catch (emailError) {
      console.error('Failed to send enquiry email via SMTP:', emailError);
    }

    return NextResponse.json({ success: true, message: 'Enquiry submitted successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Enquiry submission failed:', error);
    return NextResponse.json(
      { success: false, message: 'Enquiry failed. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    console.error('Failed to fetch enquiries:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch enquiries.' }, { status: 500 });
  }
}
