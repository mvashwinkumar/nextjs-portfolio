import React from 'react';
import NavigationWrapper from '@/components/layout/NavigationWrapper';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Personal Website',
  description: 'My professional portfolio and blog',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavigationWrapper />
        <main className="pt-16 min-h-screen bg-neutral-50">
          {children}
        </main>
      </body>
    </html>
  );
}
