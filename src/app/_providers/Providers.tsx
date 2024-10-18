'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import { getQueryClient } from '@/src/config/get-query-client';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
    </QueryClientProvider>
  );
}
