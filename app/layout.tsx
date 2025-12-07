import type { Metadata } from 'next';
import './globals.css';
import '@/styles/print.css';

export const metadata: Metadata = {
  title: 'TISAverse Studybooks - Visual Rendering Engine',
  description: 'Beautiful, interactive educational workbooks powered by markdown and AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
