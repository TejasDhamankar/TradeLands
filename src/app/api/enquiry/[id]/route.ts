import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import { ADMIN_SESSION_COOKIE, getAdminSessionValue } from '@/lib/adminAuth';

function isAdmin(request: NextRequest) {
  const cookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return cookie === getAdminSessionValue();
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(request)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectToDatabase();
    await Enquiry.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Enquiry deleted.' });
  } catch (error) {
    console.error('Failed to delete enquiry:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete enquiry.' }, { status: 500 });
  }
}

