import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = request.body;

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.TO_EMAIL_ADDRESS,
      subject: `New message from ${name}: ${subject}`,
      html: `<p>You have received a new message from your portfolio contact form.</p>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
    });

    response.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    response.status(500).json({ message: 'Error sending email' });
  }
}
