/**
 * Company names used in experience data.
 * @enum {string}
 * @example
 * ```ts
 * const exp = { company: Company.Trellix, ... };
 * ```
 */
export enum Company {
    Trellix = "Trellix",
    Intel = "Intel",
    Toastmasters = "Toastmasters International",
}

/**
 * Geographic locations for work and education.
 * @enum {string}
 */
export enum Location {
    Bengaluru = "Bengaluru, Karnataka, India",
}

/**
 * Professional roles and positions.
 * @enum {string}
 */
export enum Role {
    SDE = "Software Development Engineer",
    Intern = "Graduate Technical Intern",
    Secretary = "Secretary",
    Member = "Member",
}

/**
 * Icon identifiers for hobby items.
 * Maps to Lucide React icon component names.
 * @enum {string}
 */
export enum HobbyIcon {
    Dumbbell = "Dumbbell",
    Tv = "Tv",
    Book = "Book",
    Trophy = "Trophy",
    Bike = "Bike",
    Mountain = "Mountain",
    Dices = "Dices",
    Plane = "Plane",
    Coffee = "Coffee",
    Users = "Users",
    Mic = "Mic",
}

/**
 * System status labels with emoji indicators.
 * Used in the Hero section to show current availability.
 * @enum {string}
 */
export enum SystemStatusLabel {
    Available = "Available ✅",
    Coding = "Coding 💻",
    Sleeping = "Sleeping 😴",
}

/**
 * Skill category names for tech stack organization.
 * @enum {string}
 */
export enum SkillCategoryName {
    Languages = "Languages",
    SystemKernel = "System & Kernel",
    SecurityPrivacy = "Security & Privacy",
    AIML = "AI & Machine Learning",
    DatabasesTools = "Databases & Tools",
    FrontendWeb = "Frontend & Web",
    DevOpsInfra = "DevOps & Infrastructure",
}

/**
 * Individual skill identifiers.
 * @enum {string}
 */
export enum Skill {
    Cpp = "C++",
    Python = "Python",
    Security = "Security",
    SystemDesign = "System Design",
    DLP = "Data Loss Prevention",
    IntelSGXTDX = "Intel SGX/TDX",
}

/**
 * Professional designation labels.
 * @enum {string}
 */
export enum Designation {
    SDE_Trellix = "SDE @ Trellix",
}
