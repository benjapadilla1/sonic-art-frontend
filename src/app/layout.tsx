import { Footer } from '@/components/local/Footer/Footer';
import NavBar from '@/components/local/Navbar/NavBar';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
        <meta
          name="trustpilot-one-time-domain-verification-id"
          content="946b0be5-ac82-4bfe-9b3b-db5f57128759"
        />
        <title>Sonic Art | Cursos de Producción Musical</title>
        <meta
          name="description"
          content="Aprende producción musical con cursos online, sample packs y mentorías personalizadas."
        />
      </head>
      <body
        className={`${geistSans.variable} bg-backgroundLight ${geistMono.variable} antialiased`}
      >
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
