import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata: Metadata = {
  title: 'Users App',
  description: 'Next.js users app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-light">
        <main className="container py-4 py-md-5">{children}</main>
      </body>
    </html>
  );
}
