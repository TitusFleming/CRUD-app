import {
  ClerkProvider,
} from '@clerk/nextjs';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CRUD App with Clerk',
  description: 'A simple CRUD app with Clerk authentication',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={`${inter.className} bg-gray-100 min-h-screen`}>
          <Header />
          <main className="container mx-auto p-4">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}