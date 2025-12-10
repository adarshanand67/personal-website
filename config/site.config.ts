export const siteConfig = {
    name: "Adarsh Anand",
    title: "Adarsh Anand - Software Engineer",
    description: "Personal portfolio showcasing my work in software engineering, system design, and security.",
    url: "https://adarshanand67.github.io/personal-website/",
    author: {
        name: "Adarsh Anand",
        email: "adarshan20302@gmail.com",
        role: "SDE @ Trellix",
        location: "India",
        github: "adarshanand67",
        linkedin: "adarshanand67",
    },
    seo: {
        keywords: [
            "Software Engineer",
            "C++",
            "System Design",
            "Security",
            "Full Stack Developer",
            "Backend Engineer",
        ],
        ogImage: "/og-image.png",
        twitterHandle: "@adarshanand67",
    },
    contact: {
        email: "adarshan20302@gmail.com",
        linkedin: "linkedin.com/in/adarshanand67",
        github: "github.com/adarshanand67",
    },
    whoami: {
        user: "Adarsh Anand",
        role: "SDE @ Trellix",
        expertise: "C++, System Design, Security",
        status: "Online",
    },
} as const;
export type SiteConfig = typeof siteConfig;
