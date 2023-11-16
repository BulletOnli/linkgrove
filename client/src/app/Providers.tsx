"use client";
// Next.js / React
import NextTopLoader from "nextjs-toploader";
import React, { Suspense } from "react";

// Chakra UI
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";

// Tanstack React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Local components
import Loading from "./loading";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <NextTopLoader color="#00CCCC" />
            <CacheProvider>
                <ChakraProvider>
                    <Suspense fallback={<Loading />}>
                        {children}
                        <ReactQueryDevtools />
                    </Suspense>
                </ChakraProvider>
            </CacheProvider>
        </QueryClientProvider>
    );
};

export default Providers;
