import { siteConfig } from "@/config";

/**
 * Generate Person schema for structured data
 */
export function generatePersonSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteConfig.name,
        jobTitle: siteConfig.author.role,
        email: siteConfig.author.email,
        url: siteConfig.url,
        sameAs: [
            `https://github.com/${siteConfig.author.github}`,
            `https://linkedin.com/in/${siteConfig.author.linkedin}`,
        ],
        worksFor: {
            "@type": "Organization",
            name: "Trellix",
            url: "https://trellix.com",
        },
        alumniOf: {
            "@type": "EducationalOrganization",
            name: "Indian Institute of Technology Goa",
            url: "https://iitgoa.ac.in",
        },
        knowsAbout: siteConfig.seo.keywords,
    };
}

/**
 * Generate BlogPosting schema for blog posts
 */
export function generateBlogPostSchema(post: {
    title: string;
    date: string;
    excerpt: string;
    slug: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        datePublished: post.date,
        dateModified: post.date,
        description: post.excerpt,
        author: {
            "@type": "Person",
            name: siteConfig.author.name,
            url: siteConfig.url,
        },
        publisher: {
            "@type": "Person",
            name: siteConfig.author.name,
            url: siteConfig.url,
        },
        url: `${siteConfig.url}/blogshelf/${post.slug}`,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/blogshelf/${post.slug}`,
        },
    };
}

/**
 * Generate WebSite schema
 */
export function generateWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        author: {
            "@type": "Person",
            name: siteConfig.author.name,
        },
        inLanguage: "en-US",
    };
}

/**
 * Generate Organization schema for work experience
 */
export function generateOrganizationSchema(org: {
    name: string;
    role: string;
    startDate: string;
    endDate?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: org.name,
        employee: {
            "@type": "Person",
            name: siteConfig.author.name,
            jobTitle: org.role,
            startDate: org.startDate,
            endDate: org.endDate || new Date().toISOString().split("T")[0],
        },
    };
}
