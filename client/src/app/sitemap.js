const URL = "https://linkgrove.vercel.app";

export default function sitemap() {
    return [
        {
            url: `${URL}/`,
            lastModified: new Date(),
        },
        {
            url: `${URL}/login`,
            lastModified: new Date(),
        },
        {
            url: `${URL}/register`,
            lastModified: new Date(),
        },
    ];
}
