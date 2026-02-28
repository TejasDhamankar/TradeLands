import nodemailer from 'nodemailer';

type SendEnquiryEmailInput = {
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

function formatList(items: string[]) {
  return items.length ? items.join(', ') : 'Not provided';
}

export async function sendEnquiryNotification(input: SendEnquiryEmailInput) {
  const adminEmail = process.env.ADMIN_USERNAME;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!adminEmail || !smtpUser || !smtpPass) {
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const submittedAt = input.createdAt.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const html = `
    <h2>New TradeLands Enquiry</h2>
    <p><strong>Date/Time:</strong> ${submittedAt}</p>
    <hr />
    <p><strong>Full Name:</strong> ${input.fullName}</p>
    <p><strong>Mobile:</strong> ${input.mobile}</p>
    <p><strong>Email:</strong> ${input.email}</p>
    <p><strong>City:</strong> ${input.city}</p>
    <p><strong>Investment Plan:</strong> ${formatList(input.investmentPlan)}</p>
    <p><strong>Investment Status:</strong> ${formatList(input.investmentStatus)}</p>
    <p><strong>Investment Timeline:</strong> ${formatList(input.investmentTimeline)}</p>
    <p><strong>Investment Purpose:</strong> ${formatList(input.investmentPurpose)}</p>
    <p><strong>Preferred Contact Time:</strong> ${formatList(input.preferredContactTime)}</p>
    <p><strong>Message:</strong> ${input.message?.trim() || 'Not provided'}</p>
  `;

  await transporter.sendMail({
    from: `"TradeLands Website" <${smtpUser}>`,
    to: adminEmail,
    subject: `New Enquiry: ${input.fullName}`,
    html,
  });
}
