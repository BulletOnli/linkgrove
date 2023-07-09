"use client";
import { usePathname } from "next/navigation";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { ErrorBoundary } from "react-error-boundary";
// import NextNProgress from "nextjs-progressbar";

const App = ({ children }) => {
    const pathname = usePathname();
    const hideNav = pathname === "/login" || pathname === "/register";

    return (
        <ChakraProvider>
            <div className="relative w-full min-h-screen text-[#F5F5F5] flex flex-col bg-[#0D1117] font-custom">
                {/* <NextNProgress /> */}
                {!hideNav && <Navbar />}
                {children}
            </div>
        </ChakraProvider>
    );
};

export default App;
