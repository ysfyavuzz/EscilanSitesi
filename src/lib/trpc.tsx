/**
 * tRPC Client Module
 *
 * Configures the tRPC client for making type-safe API calls from the frontend.
 * Integrates with React Query for data fetching and caching.
 *
 * @module lib/trpc
 * @category Library - API Client
 */

import React, { useState } from "react";
import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppRouter } from "../server";
import { supabase } from "./supabase";

/**
 * Create tRPC React hooks
 * These hooks provide type-safe API calls throughout the app
 */
export const trpc = createTRPCReact<AppRouter>();

/**
 * Get API URL based on environment
 */
function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Browser should use relative URL
    return "";
  }
  // SSR should use absolute URL
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

/**
 * tRPC Provider Component
 * Wraps the application with tRPC and React Query providers
 */
export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000, // 5 seconds
            retry: 1,
          },
        },
      }),
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          // Add auth token from Supabase to requests
          async headers() {
            const {
              data: { session },
            } = await supabase.auth.getSession();
            return {
              authorization: session?.access_token
                ? `Bearer ${session.access_token}`
                : "",
            };
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
