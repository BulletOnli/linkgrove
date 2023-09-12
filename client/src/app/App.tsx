"use client";
import { usePathname } from "next/navigation";
import { ChakraProvider } from "@chakra-ui/react";
import NextTopLoader from "nextjs-toploader";
import Navbar from "../components/Navbar";

const App = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const hideNav = pathname === "/login" || pathname === "/register";

    return (
        <>
            <NextTopLoader color="#00CCCC" />
            <ChakraProvider>
                <div className="relative w-full min-h-screen text-[#F5F5F5] flex flex-col bg-[#000000] font-custom">
                    {!hideNav && <Navbar />}
                    {children}
                </div>
            </ChakraProvider>
        </>
    );
};

export default App;
