import { Footer } from '@/components/local/Footer/Footer';
import NavBar from '@/components/local/Navbar/NavBar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sonic Art | Cursos de Producción Musical',
  description:
    'Aprende producción musical con cursos online, sample packs y mentorías personalizadas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Sonic Art | Cursos de Producción Musical</title>
        <meta
          name="description"
          content="Aprende producción musical con cursos online, sample packs y mentorías personalizadas."
        />
      </head>
      <body
        className={`${geistSans.variable} bg-backgroundLight ${geistMono.variable} antialiased`}
      >
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <ToastContainer />
          <NavBar />
          <main>{children}</main>
          <Footer />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
