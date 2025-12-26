import { Location } from "./enums";
import { Profile } from "@/types/definitions";

/**
 * Profile data object containing personal information.
 *
 * @type {Profile}
 */
export const profileData: Profile = {
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
        short: "I enjoy wrapping basic common sense in a slow deep voice just to see if it sounds like philosophy.",
        paragraphs: [
            "I enjoy wrapping basic common sense in a slow deep voice just to see if it sounds like philosophy.",
        ],
    },
};
