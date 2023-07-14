/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                custom: "4px 4px 12px rgb(0, 0, 0, .3);",
                custom2: "3px 3px 6px rgb(0, 0, 0, .3);",
                custom3: "0 2px 4px rgb(0, 0, 0, .2);",
                custom4: "0 2px 12px -1px rgba( 31, 38, 135, 0.4 )",
            },
            backgroundColor: {
                custom: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
            },
            fontFamily: {
                custom: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
