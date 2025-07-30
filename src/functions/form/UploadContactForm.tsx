interface ContactForm {
  name: string;
  email: string;
  message: string;
}
export async function uploadContactForm({ email, message, name }: ContactForm) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, message, name }), 
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error de envío del formulario: ${errorText}`);
  }
}
