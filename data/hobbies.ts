/**
 * @fileoverview Hobbies and interests data with humorous descriptions.
 */

import { HobbyIcon } from "./enums";

/**
 * Array of hobby objects with pseudo-intellectual descriptions.
 * Each hobby includes a name, description, icon identifier, and optional link.
 *
 * @type {Array<{ name: string, description: string, icon: HobbyIcon, link: string }>}
 */
export const hobbyData = [
    {
        name: "Gym",
        description: "Voluntary gravitational resistance training for somatic optimization.",
        icon: HobbyIcon.Dumbbell,
        link: "https://www.youtube.com/results?search_query=hypertrophy+training+guide",
    },
    {
        name: "Cinephile",
        description:
            "Analyzing the visual subtext of the human condition through cinematic lenses.",
        icon: HobbyIcon.Tv,
        link: "https://www.youtube.com/results?search_query=best+movies+documentaries",
    },
    {
        name: "Anime",
        description:
            "Post-modern storytelling where complexity is measured by the length of the title.",
        icon: HobbyIcon.Tv,
        link: "/animeshelf",
    },
    {
        name: "Book Reading",
        description: "Downloading the consciousness of superior minds into my organic hardware.",
        icon: HobbyIcon.Book,
        link: "/bookshelf",
    },
    {
        name: "Table Tennis",
        description: "High-frequency orbital manipulation of celluloid spheres.",
        icon: HobbyIcon.Trophy,
        link: "https://www.youtube.com/results?search_query=table+tennis+techniques",
    },
    {
        name: "Badminton",
        description: "Aerodynamic shuttlecock redirection at hyper-velocity speeds.",
        icon: HobbyIcon.Trophy,
        link: "https://www.youtube.com/results?search_query=badminton+skills+tutorial",
    },
    {
        name: "Pickleball",
        description: "A synthesis of racket-based disciplines for the intellectual athlete.",
        icon: HobbyIcon.Trophy,
        link: "https://www.youtube.com/results?search_query=pickleball+how+to+play",
    },
    {
        name: "Cycling",
        description: "Bipedal velocity generation for urban cartographic exploration.",
        icon: HobbyIcon.Bike,
        link: "https://www.youtube.com/results?search_query=cycling+adventures",
    },
    {
        name: "Trekking & Hiking",
        description:
            "Vertical locomotion through geological formations to achieve higher perspective.",
        icon: HobbyIcon.Mountain,
        link: "https://www.youtube.com/results?search_query=best+hiking+trails",
    },
    {
        name: "Board Games",
        description:
            "Simulated geopolitical and socio-economic conflict resolution in a safe-space.",
        icon: HobbyIcon.Dices,
        link: "https://www.youtube.com/results?search_query=best+board+games",
    },
    {
        name: "Travelling",
        description: "Empirical data gathering of cross-cultural sociodynamics.",
        icon: HobbyIcon.Plane,
        link: "https://www.youtube.com/results?search_query=travel+vlog",
    },
    {
        name: "Cafe Hopping",
        description:
            "Conducting qualitative analysis of roasted bean extracts in various social ecosystems.",
        icon: HobbyIcon.Coffee,
        link: "https://www.youtube.com/results?search_query=best+coffee+shops",
    },
    {
        name: "Tech Conferences",
        description: "Synchronizing with the hive mind of digital architects.",
        icon: HobbyIcon.Users,
        link: "https://www.youtube.com/results?search_query=tech+conferences",
    },
    {
        name: "Toastmasters",
        description:
            "Calibrating my vocal resonance to maximize intellectual impact during generic advice delivery.",
        icon: HobbyIcon.Mic,
        link: "https://www.toastmasters.org",
    },
];
