import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false, // Prevent unnecessary refetches
      refetchOnMount: false, // Use cached data when available
      networkMode: 'offlineFirst', // Better offline experience
    },
    mutations: {
      retry: 0, // Don't retry mutations by default
      networkMode: 'offlineFirst',
    },
  },
});