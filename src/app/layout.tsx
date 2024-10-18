import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import './globals.css';
import { cn } from '../shared/lib/utils';
import Providers from './_providers/Providers';

export const metadata: Metadata = {
  title: 'Outfits',
  description: 'Доставка товаров из Китая в Россию',
};

const fontMontserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={cn(fontMontserrat.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
