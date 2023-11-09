import type { Metadata } from "next";
import "./globals.css";
import App from "./_app";

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
