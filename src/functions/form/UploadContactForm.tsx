import axios from 'axios';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}
export async function uploadContactForm({ email, message, name }: ContactForm) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact`,
    { email, message, name },
    { headers: { 'Content-Type': 'application/json' } }
  );

  return res.data;
}
