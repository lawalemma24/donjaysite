export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/Admin/", "/dashboard/", "/auth/"],
        },
        sitemap: "https://donjayautos.com/sitemap.xml",
    };
}
