/**
 * @fileoverview Personal profile data including bio, education, and social links.
 */

import { Location } from "./enums";

/**
 * Profile data object containing personal information.
 *
 * @type {{
 *   name: string,
 *   title: string,
 *   pronouns: string,
 *   location: Location,
 *   avatar: string,
 *   education: { university: string, degree: string, years: string, grade: string },
 *   socials: { linkedin: string, github: string, email: string },
 *   bio: { paragraphs: string[] }
 * }}
 */
export const profileData = {
    name: "Adarsh Anand",
    title: "Adarsh Anand",
    pronouns: "He/Him",
    location: Location.Bengaluru,
    avatar: "/dp.jpeg",
    education: {
        university: "Indian Institute of Technology (IIT) Goa",
        degree: "B.Tech, CSE",
        years: "2020 - 2024",
        grade: "8.67",
    },
    socials: {
        linkedin: "https://linkedin.com/in/adarshanand67",
        github: "https://github.com/adarshanand67",
        email: "adarshan20302@gmail.com",
    },
    bio: {
        paragraphs: [
            "I enjoy wrapping basic common sense in a slow deep voice just to see if it sounds like philosophy.",
        ],
    },
};
