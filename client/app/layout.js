import "./globals.css";
import dynamic from "next/dynamic";
const App = dynamic(() => import("./App"), {
    ssr: false,
});

export const metadata = {
    title: "LinkGrove",
    description: "Unite all your links in one website",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <App>{children}</App>
            </body>
        </html>
    );
}
