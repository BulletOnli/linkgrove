"use client";
import { usePathname } from "next/navigation";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

const App = ({ children }) => {
    const pathname = usePathname();
    const hideNav = pathname === "/login" || pathname === "/register";

    return (
        <ChakraProvider>
            <div className="relative w-full min-h-screen text-[#F5F5F5] flex flex-col bg-[#0D1117] font-custom">
                {!hideNav && <Navbar />}
                {children}
            </div>
        </ChakraProvider>
    );
};

export default App;
