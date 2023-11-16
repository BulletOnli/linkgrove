import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import { lazy } from "react";

const Navbar = lazy(() => import("../components/Navbar"));

export const metadata: Metadata = {
    title: "LinkGrove",
    description: "Unite all your links in one website",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <div className="relative w-full min-h-screen text-[#F5F5F5] flex flex-col bg-[#000000] font-custom">
                        <Navbar />
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
