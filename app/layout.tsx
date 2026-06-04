import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perfume Agent',
  description: 'DIY fragrance formulation assistant',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
