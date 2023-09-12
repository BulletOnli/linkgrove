import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
// import App from "./App";
const App = dynamic(() => import("./App"), {
    ssr: false,
});

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
                <App>{children}</App>
            </body>
        </html>
    );
}
