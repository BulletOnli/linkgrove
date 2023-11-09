"use client";
import { usePathname } from "next/navigation";
import { ChakraProvider } from "@chakra-ui/react";
import NextTopLoader from "nextjs-toploader";
import Navbar from "../components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import Loading from "./loading";
import { CacheProvider } from "@chakra-ui/next-js";

const queryClient = new QueryClient();

const App = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const hideNav = pathname === "/login" || pathname === "/register";

    return (
        <QueryClientProvider client={queryClient}>
            <NextTopLoader color="#00CCCC" />
            <CacheProvider>
                <ChakraProvider>
                    <Suspense fallback={<Loading />}>
                        <div className="relative w-full min-h-screen text-[#F5F5F5] flex flex-col bg-[#000000] font-custom">
                            {!hideNav && <Navbar />}
                            {children}
                        </div>
                        <ReactQueryDevtools />
                    </Suspense>
                </ChakraProvider>
            </CacheProvider>
        </QueryClientProvider>
    );
};

export default App;
