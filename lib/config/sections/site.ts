/**
 * @fileoverview Site-wide configuration.
 * Contains metadata, SEO settings, contact info, and author details.
 */

import { Designation, Skill } from "@/data/enums";

/**
 * Site configuration object.
 * Central configuration for site metadata, author info, SEO, and contact details.
 * @constant
 */
export const siteConfig = {
    name: "Adarsh Anand",
    title: "Adarsh Anand - Software Engineer",
    description:
        "Personal portfolio showcasing my work in software engineering, system design, and security.",
    url: "https://adarshanand.dev",
    author: {
        name: "Adarsh Anand",
        email: "adarshan20302@gmail.com",
        role: Designation.SDE_Trellix,
        location: "India",
        github: "adarshanand67",
        linkedin: "adarshanand67",
    },
    seo: {
        keywords: [
            "Software Engineer",
            Skill.Cpp,
            Skill.SystemDesign,
            Skill.Security,
            "Full Stack Developer",
            "Backend Engineer",
        ],
        ogImage: "/ogImage.png",
        twitterHandle: "@adarshanand67",
    },
    contact: {
        email: "adarshan20302@gmail.com",
        linkedin: "linkedin.com/in/adarshanand67",
        github: "github.com/adarshanand67",
    },
    whoami: {
        user: "Adarsh Anand",
        role: Designation.SDE_Trellix,
        expertise: `${Skill.Cpp}, ${Skill.SystemDesign}, ${Skill.Security}`,
        status: "Online",
    },
} as const;

/** Type definition for site config. */
export type SiteConfig = typeof siteConfig;
