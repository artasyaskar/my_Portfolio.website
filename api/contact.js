export default function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = request.body;

  console.log('Form submission:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Subject:', subject);
  console.log('Message:', message);

  response.status(200).json({ message: 'Form submitted successfully!' });
}
