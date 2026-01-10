import { Profile } from "@/types/definitions";
import { Location } from "@/types/definitions";

export const profileData: Profile = {
  name: "Adarsh Anand",
  title: "Adarsh Anand",
  pronouns: "He/Him",
  location: Location.Bengaluru,
  avatar: "/images/dp.jpeg",
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
    short: "Philosopher of the mundane.",
    paragraphs: [
      "I enjoy wrapping basic common sense in a slow, monotone voice just to see if it sounds like philosophy.",
    ],
  },
};
