import {
  Profile,
  AnimeType,
  WatchStatus,
  Book,
  CollectionType,
} from "@/types/definitions";
import {
  Company,
  Location,
  Role,
  HobbyIcon,
  SystemStatusLabel,
  SkillCategoryName,
  Skill,
  Designation,
} from "./data/enums";

export {
  Company,
  Location,
  Role,
  HobbyIcon,
  SystemStatusLabel,
  SkillCategoryName,
  Skill,
  Designation,
};

// ============================================================================
// Enums
// ============================================================================

// ============================================================================
// Profile
// ============================================================================

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
    short:
      "I enjoy wrapping basic common sense in a slow, monotone voice just to see if it sounds like philosophy.",
    paragraphs: [
      "I enjoy wrapping basic common sense in a slow, monotone voice just to see if it sounds like philosophy.",
    ],
  },
};

// ============================================================================
// Experience
// ============================================================================

export const experiencesData = [
  {
    company: Company.Trellix,
    role: Role.SDE,
    duration: "Jul 2025 - Present",
    location: Location.Bengaluru,
    logo: "/images/logos/trellix.png",
    description: "Data Loss Prevention, Windows || Endpoint Security",
    highlights: [
      "Developing native registry management modules for Chrome/Edge to ensure injection-free web protection.",
      "Integrating classification support (Boldon James) into endpoint solutions to enhance data security policies.",
      "Designing and orchestrating CppUnit test automation frameworks to improve code quality and regression testing coverage.",
    ],
  },
  {
    company: Company.Intel,
    role: Role.SDE,
    duration: "Jun 2024 - Jul 2025",
    location: Location.Bengaluru,
    logo: "/images/logos/intel.png",
    description:
      "Confidential Computing (Intel SGX/TDX) || Platform Engineering Group",
    highlights: [
      "Contributed to Intel SGX Gramine to secure confidential computing workloads (PyTorch, OpenVINO, MySQL, Redis), addressing memory faults and expanding distro support (Ubuntu 24.04, CentOS Stream 9, RHEL 9, and SUSE).",
      "Implemented Intel SGX fuzzing framework by CPU ID fuzzing harnesses with LLVM's clang libFuzzer and Address/Memory Sanitizers and building test automation with LLVM coverage tools (llvm-profdata, llvm-cov), resulting in 8+ vulnerability discoveries in Intel SGX TCB with 97% branch coverage with patches merged upstream.",
      "Engineered Intel TDX full-disk encryption (FDE) solution supporting multi-VM launch scenarios, implementing secure key retrieval through Hashicorp Vault and ITA Key Broker Service, optimizing .qcow2 encrypted image sizes by 30% and resolving 20+ critical validation bugs in Rust.",
      "Led creation of CentOS Virtualization SIG attestation guides for Intel TDX implementation, updating RHEL packages and fixing 10+ validation bugs that accelerated secure TD deployments across 4th Gen Intel Xeon.",
      "Integrated Post-Quantum Cryptography (PQC) with Intel SGX via Crypto API Toolkit (CTK), implementing 8+ NIST-approved algorithms for key encapsulation and digital signatures while maintaining PKCS11 compliance, creating a flexible alternative to hardware HSMs.",
      "Enhanced LLM Adversarial Robustness Toolkit for evaluating LLM robustness by integrating uv package manager, implementing automatic batch size detection, customizable filtering policies, storage of best attack tokens, and building an automated test runner that achieved 40% reduced build times.",
      "Conducted comprehensive vLLM benchmarking comparing legacy VMs vs Intel TDX Trusted Domains with Deepseek-7B/Llama-2-70B models, quantifying ITL latency and TPS throughput across 20K+ test runs on Intel 5th Gen Xeon (Emerald Rapids) processors.",
    ],
  },
  {
    company: Company.Intel,
    role: Role.Intern,
    duration: "Jun 2023 - Dec 2023",
    location: Location.Bengaluru,
    logo: "/images/logos/intel.png",
    description: "Device Onboarding || Intel Product Security",
    highlights: [
      "Strengthened Intel Edge Device security by implementing Zero-Touch Provisioning (ZTP) protocols in collaboration with the FIDO Device Onboarding (FDO) team, automating secure device identity assignment and eliminating manual configuration vulnerabilities.",
      "Optimized cryptographic architecture through a strategic OpenSSL 3.0 migration for Service Info (SVI) modules, leveraging the new provider model to streamline dependencies and achieve a 15% reduction in the Client SDK codebase size.",
      "Architected a comprehensive Bare Metal Onboarding (BMO) POC, featuring a React-based real-time monitoring dashboard for device telemetry and a scalable backend infrastructure utilizing CBOR/JSON REST APIs for high-efficiency data exchange.",
    ],
  },
];

// ============================================================================
// Hobbies
// ============================================================================

export const hobbyData = [
  {
    name: "Gym",
    description: "Lifting heavy to stay strong and focused.",
    icon: HobbyIcon.Dumbbell,
    link: "https://www.muscleandstrength.com/",
  },
  {
    name: "Cinephile",
    description: "Exploring the world through the lens of timeless cinema.",
    icon: HobbyIcon.Tv,
    link: "https://letterboxd.com/",
  },
  {
    name: "Anime",
    description: "Getting lost in the art and stories of fictional characters.",
    icon: HobbyIcon.Tv,
    link: "/animeshelf",
  },
  {
    name: "Book Reading",
    description: "Collecting wisdom and stories, one page at a time.",
    icon: HobbyIcon.Book,
    link: "/bookshelf",
  },
  {
    name: "Table Tennis",
    description: "Lightning-fast rallies and high-speed precision.",
    icon: HobbyIcon.Trophy,
    link: "https://www.ittf.com/",
  },
  {
    name: "Badminton",
    description: "Hard-hitting smash sessions on the court.",
    icon: HobbyIcon.Trophy,
    link: "https://bwfbadminton.com/",
  },
  {
    name: "Pickleball",
    description: "Low-impact, high-intensity rackets and fun.",
    icon: HobbyIcon.Trophy,
    link: "https://usapickleball.org/",
  },
  {
    name: "Cycling",
    description: "Exploring the city on two wheels.",
    icon: HobbyIcon.Bike,
    link: "https://www.strava.com/",
  },
  {
    name: "Trekking & Hiking",
    description: "Chasing sunsets and mountain peaks on the weekends.",
    icon: HobbyIcon.Mountain,
    link: "https://www.alltrails.com/",
  },
  {
    name: "Board Games",
    description: "Strategy, rivalry, and good vibes with friends.",
    icon: HobbyIcon.Dices,
    link: "https://boardgamegeek.com/",
  },
  {
    name: "Travelling",
    description: "Collecting memories and cultures across the map.",
    icon: HobbyIcon.Plane,
    link: "https://www.lonelyplanet.com/",
  },
  {
    name: "Cafe Hopping",
    description: "Finding the city's hidden aesthetics and best brews.",
    icon: HobbyIcon.Coffee,
    link: "https://sprudge.com/",
  },
  {
    name: "Tech Conferences",
    description: "Networking with the builders of the future.",
    icon: HobbyIcon.Users,
    link: "https://dev.events/",
  },
  {
    name: "Toastmasters",
    description: "Sharpening the edge of public speaking.",
    icon: HobbyIcon.Mic,
    link: "https://www.toastmasters.org",
  },
];

// ============================================================================
// Papers
// ============================================================================

export const papersData = [
  {
    title: "Measuring Agents in Production",
    url: "https://arxiv.org/abs/2512.04123",
  },
  {
    title: "Attention Is All You Need",
    url: "https://arxiv.org/abs/1706.03762",
  },
  {
    title: "Deep Residual Learning for Image Recognition",
    url: "https://arxiv.org/abs/1512.03385",
  },
  {
    title: "Cisco Integrated AI Security",
    url: "https://arxiv.org/abs/2512.12921",
  },
];

// ============================================================================
// Architecture
// ============================================================================

export interface ArchNode {
  id: string;
  label: string;
  type:
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "core"
  | "security"
  | "language"
  | "system"
  | "ai";
  x: number;
  y: number;
  description?: string;
}

export interface ArchConnection {
  source: string;
  target: string;
  description?: string;
}

export const architectureNodes: ArchNode[] = [
  {
    id: "nextjs",
    label: "Next.js",
    type: "frontend",
    x: 20,
    y: 20,
    description: "App Router framework.",
  },
  {
    id: "react",
    label: "React",
    type: "frontend",
    x: 20,
    y: 30,
    description: "UI Library.",
  },
  {
    id: "tailwind",
    label: "Tailwind",
    type: "frontend",
    x: 20,
    y: 40,
    description: "Styling.",
  },
  {
    id: "framer",
    label: "Framer",
    type: "frontend",
    x: 20,
    y: 50,
    description: "Motion.",
  },
  {
    id: "threejs",
    label: "Three.js",
    type: "frontend",
    x: 20,
    y: 60,
    description: "3D Visuals.",
  },
  {
    id: "zustand",
    label: "Zustand",
    type: "frontend",
    x: 20,
    y: 70,
    description: "State.",
  },
  {
    id: "python",
    label: "Python",
    type: "language",
    x: 45,
    y: 20,
    description: "Scripting & AI.",
  },
  {
    id: "cpp",
    label: "C++",
    type: "language",
    x: 45,
    y: 30,
    description: "Systems & Performance.",
  },
  {
    id: "c",
    label: "C",
    type: "language",
    x: 45,
    y: 40,
    description: "Low-level dev.",
  },
  {
    id: "java",
    label: "Java",
    type: "language",
    x: 45,
    y: 50,
    description: "Enterprise.",
  },
  {
    id: "js",
    label: "JS/TS",
    type: "language",
    x: 45,
    y: 60,
    description: "Web High-level.",
  },
  {
    id: "torch",
    label: "PyTorch",
    type: "ai",
    x: 45,
    y: 75,
    description: "Deep Learning.",
  },
  {
    id: "vllm",
    label: "vLLM",
    type: "ai",
    x: 55,
    y: 75,
    description: "LLM Inference.",
  },
  {
    id: "openvino",
    label: "OpenVINO",
    type: "ai",
    x: 50,
    y: 85,
    description: "AI Optimization.",
  },
  {
    id: "kernel",
    label: "Kernel",
    type: "system",
    x: 70,
    y: 20,
    description: "Linux Dev.",
  },
  {
    id: "sgx",
    label: "Intel SGX",
    type: "system",
    x: 70,
    y: 30,
    description: "Confidential Compute.",
  },
  {
    id: "win",
    label: "Windows",
    type: "system",
    x: 70,
    y: 40,
    description: "Internals.",
  },
  {
    id: "linux",
    label: "Linux",
    type: "system",
    x: 70,
    y: 50,
    description: "RHEL/CentOS/Ubuntu.",
  },
  {
    id: "redis",
    label: "Redis",
    type: "database",
    x: 85,
    y: 20,
    description: "Cache.",
  },
  {
    id: "sql",
    label: "SQL",
    type: "database",
    x: 85,
    y: 30,
    description: "Postgres/MySQL.",
  },
  {
    id: "docker",
    label: "Docker",
    type: "devops",
    x: 85,
    y: 50,
    description: "Containers.",
  },
  {
    id: "k8s",
    label: "K8s",
    type: "devops",
    x: 85,
    y: 60,
    description: "Orchestration.",
  },
  {
    id: "aws",
    label: "AWS",
    type: "devops",
    x: 85,
    y: 70,
    description: "Cloud.",
  },
  {
    id: "gh",
    label: "GitHub",
    type: "devops",
    x: 85,
    y: 80,
    description: "CI/CD.",
  },
  {
    id: "edr",
    label: "EDR/XDR",
    type: "security",
    x: 70,
    y: 65,
    description: "Endpoint Security.",
  },
  {
    id: "security",
    label: "Security",
    type: "security",
    x: 70,
    y: 75,
    description: "DLP / Encryption.",
  },
  {
    id: "threat",
    label: "Intel",
    type: "security",
    x: 70,
    y: 85,
    description: "Threat Intelligence.",
  },
];

export const architectureConnections: ArchConnection[] = [
  { source: "nextjs", target: "react" },
  { source: "nextjs", target: "js" },
  { source: "threejs", target: "react" },
  { source: "c", target: "kernel" },
  { source: "cpp", target: "win" },
  { source: "python", target: "torch" },
  { source: "kernel", target: "security" },
  { source: "win", target: "edr" },
  { source: "linux", target: "docker" },
  { source: "docker", target: "k8s" },
  { source: "gh", target: "nextjs" },
];

// ============================================================================
// Books
// ============================================================================

export const booksData: Book[] = [
  {
    title: "48 Laws of Power",
    author: "Robert Greene",
    recommended: true,
    description:
      "A definitive guide to understanding power dynamics, drawing on history's most famous strategists.",
    keyTakeaways: [
      "Never Outshine the Master: Help those above you feel superior to secure your position.",
      "Conceal Your Intentions: Keep others off-balance and in the dark to maintain control.",
      "Say Less Than Necessary: Brevity prevents mistakes and creates an air of mystery.",
    ],
    amazonLink:
      "https://www.amazon.com/48-Laws-Power-Robert-Greene/dp/0140280197",
    tags: ["Psychology", "Philosophy"],
  },
  {
    title: "12 Rules for Life",
    author: "Jordan Peterson",
    recommended: true,
    description:
      "Psychologist Jordan Peterson offers twelve profound and practical principles for how to live a meaningful life.",
    keyTakeaways: [
      "Stand up straight with your shoulders back: Physical posture affects mental state and social standing.",
      "Treat yourself like someone you are responsible for helping: Practice self-care with the same diligence you'd give to a loved one.",
      "Set your house in perfect order before you criticize the world: Internal change precedes external impact.",
    ],
    amazonLink:
      "https://www.amazon.com/12-Rules-Life-Antidote-Chaos/dp/0345816021",
    tags: ["Psychology", "Self-Improvement"],
  },
  {
    title: "The Way of the Superior Man",
    author: "David Deida",
    recommended: true,
    description:
      "A spiritual guide for men to navigate the challenges of women, work, and sexual desire with purpose.",
    keyTakeaways: [
      "Live as if your father were dead: Take full responsibility for your life and path.",
      "Always lean just beyond your edge: Growth happens in the zone of slight discomfort.",
      "Choose a core purpose: A man's primary mission should not be his relationship, but his purpose.",
    ],
    amazonLink:
      "https://www.amazon.com/Way-Superior-Man-Spiritual-Challenges/dp/1622036040",
    tags: ["Spirituality", "Relationships"],
  },
  {
    title: "Chip War",
    author: "Chris Miller",
    description:
      "An account of the decades-long battle to control the world's most critical technology: the microchip.",
    keyTakeaways: [
      "Semiconductors are the foundation of modern military and economic power.",
      "The complexity of the supply chain makes it the ultimate geopolitical bottleneck.",
      "TSMC is the most critical company in the world that most people don't fully understand.",
    ],
    amazonLink:
      "https://www.amazon.com/Chip-War-Fight-Critical-Technology/dp/1982172002",
    tags: ["Technology", "History", "Business"],
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    description:
      "Rules for focused success in a distracted world, arguing that the ability to focus is a competitive advantage.",
    keyTakeaways: [
      "Deep Work = (Time Spent) x (Intensity of Focus).",
      "Schedule your deep work blocks to protect them from the whirlwind of shallow tasks.",
      "Embrace boredom: The ability to focus is a muscle that must be trained.",
    ],
    amazonLink:
      "https://www.amazon.com/Deep-Work-Focused-Success-Distracted/dp/1455586692",
    tags: ["Productivity", "Self-Improvement"],
  },
  {
    title: "Don't Shut Up",
    author: "Prakhar Gupta",
    description:
      "Practical advice on effective communication, articulation, and building confidence.",
    keyTakeaways: [
      "Articulation is a superpower that clarifies your own thinking.",
      "Refining your voice allows you to navigate professional and social environments effectively.",
      "Silence is often a missed opportunity for growth and connection.",
    ],
    amazonLink:
      "https://www.amazon.com/Dont-Shut-Up-Prakhar-Gupta/dp/9390166266",
    tags: ["Communication", "Self-Improvement"],
  },
  {
    title: "Don't Take It Personal",
    author: "Elayne Savage",
    description:
      "Strategies for distinguishing between personal rejection and objective feedback to maintain self-worth.",
    keyTakeaways: [
      "Rejection is often a reflection of the other person's history, not your value.",
      "Separate your core identity from temporary external feedback.",
      "Understand your own triggers to respond rather than react.",
    ],
    amazonLink:
      "https://www.amazon.com/Dont-Take-Personal-Sting-Rejection/dp/1572242485",
    tags: ["Psychology", "Self-Improvement"],
  },
  {
    title: "Emotional Intelligence",
    author: "Daniel Goleman",
    description:
      "An exploration of why emotional intelligence can matter more than IQ for success and well-being.",
    keyTakeaways: [
      "Self-awareness is the foundation of emotional intelligence.",
      "Empathy is a critical skill for effective leadership and deep relationships.",
      "Emotional regulation prevents 'amygdala hijacks' from ruining rational decisions.",
    ],
    amazonLink:
      "https://www.amazon.com/Emotional-Intelligence-Why-Matter-Special/dp/055338371X",
    tags: ["Psychology", "Self-Improvement"],
  },
  {
    title: "Games People Play",
    author: "Eric Berne",
    description:
      "A classic analysis of the psychological games people play in social interactions.",
    keyTakeaways: [
      "We interact from three ego states: Parent, Adult, and Child.",
      "Many social interactions are 'games' with hidden agendas and predictable payoffs.",
      "The 'Adult' state is where rational and honest communication happens.",
    ],
    amazonLink:
      "https://www.amazon.com/Games-People-Play-Psychology-Relationships/dp/0345410033",
    tags: ["Psychology", "Relationships"],
  },
  {
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    description:
      "Time-tested principles for building relationships and influencing others positively.",
    keyTakeaways: [
      "A person's name is the sweetest sound in any language.",
      "Listen more than you talk: People love to feel heard and important.",
      "Avoid criticism, condemning, or complaining; focus on positive reinforcement.",
    ],
    amazonLink:
      "https://www.amazon.com/How-Win-Friends-Influence-People/dp/0671027034",
    tags: ["Communication", "Relationships"],
  },
  {
    title: "The Rudest Book Ever",
    author: "Shwetabh Gangwar",
    description:
      "A straightforward guide to thinking clearly, solving problems, and taking ownership of your life.",
    keyTakeaways: [
      "Happiness is the byproduct of solving problems, not a goal in itself.",
      "Reclaim your individuality by questioning every social narrative you've been taught.",
      "Self-respect is more important than being liked by others.",
    ],
    amazonLink:
      "https://www.amazon.com/Rudest-Book-Ever-Gangwar-Shwetabh/dp/9388754432",
    tags: ["Self-Improvement", "Philosophy"],
  },
  {
    title: "Stillness is the Key",
    author: "Ryan Holiday",
    description:
      "Drawing on ancient wisdom to show how stillness and focus are essential for clarity and success.",
    keyTakeaways: [
      "Stillness is not inactivity; it is the presence of total clarity.",
      "To think clearly, you must first find a way to quiet the noise of the world.",
      "Focus on what is in your control and let go of the rest.",
    ],
    amazonLink:
      "https://www.amazon.com/Stillness-Key-Ryan-Holiday/dp/0525538585",
    tags: ["Philosophy", "Self-Improvement"],
  },
  {
    title: "System Design Interview",
    author: "Alex Xu",
    description:
      "A comprehensive guide to mastering system design interviews for software engineers.",
    keyTakeaways: [
      "System design is all about trade-offs: Latency vs. Throughput, Consistency vs. Availability.",
      "Start with high-level architecture before diving into specific components.",
      "Scalability is built by identifying and removing bottlenecks.",
    ],
    amazonLink:
      "https://www.amazon.com/System-Design-Interview-Insiders-Guide/dp/1736049119",
    tags: ["Technology", "System Design"],
  },
  {
    title: "The 5 AM Club",
    author: "Robin Sharma",
    description:
      "A parable about maximizing productivity, health, and serenity by waking up early.",
    keyTakeaways: [
      "The 20/20/20 formula: 20 mins exercise, 20 mins reflection, 20 mins growth.",
      "Ownership of your morning leads to mastery of your life.",
      "Consistency is the hallmark of champions.",
    ],
    amazonLink:
      "https://www.amazon.com/AM-Club-Morning-Elevate-Life/dp/1443456624",
    tags: ["Productivity", "Self-Improvement"],
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    description:
      "A framework for personal and professional effectiveness based on timeless principles.",
    keyTakeaways: [
      "Be Proactive: Take responsibility for your response to every situation.",
      "Begin with the End in Mind: Define your mission and goals before acting.",
      "Seek first to understand, then to be understood.",
    ],
    amazonLink:
      "https://www.amazon.com/Habits-Highly-Effective-People-Powerful/dp/0743273562",
    tags: ["Productivity", "Self-Improvement", "Business"],
  },
  {
    title: "The Compound Effect",
    author: "Darren Hardy",
    description:
      "How small, consistent actions and choices lead to huge results over time.",
    keyTakeaways: [
      "Small choices + consistency + time = radical difference.",
      "Success is earned through daily discipline, not a single event.",
      "Take 100% responsibility for your life choices.",
    ],
    amazonLink:
      "https://www.amazon.com/Compound-Effect-Darren-Hardy/dp/159315724X",
    tags: ["Productivity", "Self-Improvement"],
  },
  {
    title: "The Definitive Book of Body Language",
    author: "Allan & Barbara Pease",
    description:
      "A guide to interpreting nonverbal cues to understand others' true thoughts and feelings.",
    keyTakeaways: [
      "Body language accounts for over 60% of human communication.",
      "Clusters of signals are more reliable than individual gestures.",
      "Mirroring builds rapport and trust in social interactions.",
    ],
    amazonLink:
      "https://www.amazon.com/Definitive-Book-Body-Language-Pease/dp/0553804715",
    tags: ["Communication", "Psychology"],
  },
  {
    title: "The Happiness Hypothesis",
    author: "Jonathan Haidt",
    description:
      "An examination of ten great ideas from ancient wisdom through the lens of modern psychology.",
    keyTakeaways: [
      "The mind is like a rider (rational) on an elephant (emotional).",
      "Happiness comes from within and from between (social connections).",
      "Reciprocity is a fundamental human drive that builds societies.",
    ],
    amazonLink:
      "https://www.amazon.com/Happiness-Hypothesis-Finding-Ancient-Science/dp/0465028020",
    tags: ["Psychology", "Philosophy"],
  },
  {
    title: "The Happiness Trap",
    author: "Russ Harris",
    description:
      "Using Acceptance and Commitment Therapy (ACT) to handle painful thoughts and create a rich life.",
    keyTakeaways: [
      "Attempts to avoid 'bad' feelings often create more suffering.",
      "Accept your thoughts and feelings rather than fighting them.",
      "Take action aligned with your core values, regardless of how you feel.",
    ],
    amazonLink:
      "https://www.amazon.com/Happiness-Trap-Struggling-Start-Living/dp/1590305841",
    tags: ["Psychology", "Self-Improvement"],
  },
  {
    title: "The Let Them Theory",
    author: "Mel Robbins",
    description:
      "A strategy for reducing stress and finding peace by letting others be who they are.",
    keyTakeaways: [
      "Release the burden of responsibility for other people's choices.",
      "Save your emotional energy for your own reactions and growth.",
      "Acceptance of others as they are reduces internal conflict.",
    ],
    amazonLink:
      "https://www.amazon.com/theory-let-them-theory-mel-robbins/s?k=theory+let+them+theory+mel+robbins",
    tags: ["Self-Improvement", "Psychology"],
  },
  {
    title: "The Mountain Is You",
    author: "Brianna Wiest",
    description:
      "A book about understanding self-sabotage and how to overcome it to reach your potential.",
    keyTakeaways: [
      "Self-sabotage is often a misguided attempt at self-protection.",
      "The mountain is the obstacle within you, not outside of you.",
      "Emotional resilience is built by facing the truth about yourself.",
    ],
    amazonLink:
      "https://www.amazon.com/Mountain-You-Transforming-Self-Sabotage-Self-Mastery/dp/1949759229",
    tags: ["Self-Improvement", "Psychology"],
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    description:
      "A counterintuitive approach to living a good life by prioritizing what truly matters.",
    keyTakeaways: [
      "Happiness comes from solving problems, not avoiding them.",
      "Choose your values wisely: Focus on what you can control.",
      "Acceptance of suffering is a key part of the human experience.",
    ],
    amazonLink:
      "https://www.amazon.com/Subtle-Art-Not-Giving-Fck/dp/0062457713",
    tags: ["Self-Improvement", "Philosophy"],
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    description:
      "A groundbreaking tour of the mind and the two systems that drive the way we think.",
    keyTakeaways: [
      "We are prone to numerous cognitive biases that cloud our judgment.",
      "System 1 is constantly creating 'stories' to explain the world.",
      "Decision-making can be improved by forcing System 2 to engage.",
    ],
    amazonLink:
      "https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555",
    tags: ["Psychology", "Science"],
  },
  {
    title: "Who Will Cry When You Die?",
    author: "Robin Sharma",
    description:
      "Simples wisdom for living a life of significance, distinguishing between the urgent and the important.",
    keyTakeaways: [
      "Success is meaningless if it doesn't leave a positive legacy.",
      "Live every day as if it were your last; focus on what truly matters.",
      "The quality of your life is determined by the quality of your thoughts.",
    ],
    amazonLink: "https://www.amazon.com/Who-Will-Cry-When-Die/dp/8172247651",
    tags: ["Self-Improvement", "Philosophy"],
  },
  {
    title: "Why We Sleep",
    author: "Matthew Walker",
    description:
      "A neuroscientist explores the vital importance of sleep for our physical and mental health.",
    keyTakeaways: [
      "Sleep is the pillar of health alongside nutrition and exercise.",
      "Lack of sleep impairs cognitive function more than we realize.",
      "Quality sleep is essential for emotional stability and memory consolidation.",
    ],
    amazonLink:
      "https://www.amazon.com/Why-We-Sleep-Unlocking-Dreams/dp/1501144324",
    tags: ["Health", "Science", "Psychology"],
  },
  {
    title: "You Are a Badass",
    author: "Jen Sincero",
    description:
      "A refreshing how-to guide for creating a life you love and believing in yourself.",
    keyTakeaways: [
      "Love yourself unapologetically; it's the foundation of change.",
      "Decide you are going to live a life you love and stop making excuses.",
      "Your external world is a reflection of your internal belief system.",
    ],
    amazonLink:
      "https://www.amazon.com/You-Are-Badass-Doubting-Greatness/dp/0762447699",
    tags: ["Self-Improvement"],
  },
];

// ============================================================================
// Anime
// ============================================================================

export const anime = [
  {
    title: "Pokémon",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1-20+",
    image: "https://cdn.myanimelist.net/images/anime/1405/117456l.jpg",
    description:
      "Ash Ketchum's journey to become a Pokémon Master with his partner Pikachu.",
    tags: ["Adventure", "Fantasy"],
    year: "1997",
    rating: "7.5/10",
    keyLearnings: [
      "True growth comes from the journey and the bonds formed, not just the championship title.",
      "Pikachu, I choose you! The strongest bond is one built on mutual respect.",
      "Gotta catch 'em all! Perseverance in the face of an impossible task is half the battle.",
    ],
  },
  {
    title: "Death Note",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1",
    image: "https://cdn.myanimelist.net/images/anime/9/9453l.jpg",
    description:
      "A brilliant student finds a supernatural notebook that allows him to kill anyone by writing their name.",
    tags: ["Thriller", "Supernatural"],
    year: "2006",
    rating: "8.7/10",
    keyLearnings: [
      "Absolute power corrupts absolutely, even the most righteous intentions.",
      "I am Justice! The line between god and monster is paper-thin.",
      "Anonymity is a weapon, but it also isolates you from the humanity you claim to save.",
    ],
  },
  {
    title: "One Punch Man",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1-2",
    image: "https://cdn.myanimelist.net/images/anime/12/76049l.jpg",
    description:
      "The story of Saitama, a hero who can defeat any opponent with a single punch but seeks a worthy challenge.",
    tags: ["Action", "Comedy"],
    year: "2015",
    rating: "8.7/10",
    keyLearnings: [
      "The struggle to improve is what gives life meaning, not the destination of perfection.",
      "100 pushups, 100 situps, 100 squats, and a 10km run every single day!",
      "True heroism often goes unrecognized, and that's okay as long as you know your worth.",
    ],
  },
  {
    title: "Haikyuu!!",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1-4 + Dumpster Battle",
    recommended: true,
    image: "https://cdn.myanimelist.net/images/anime/1665/140360l.jpg",
    description:
      "Shoyo Hinata joins a volleyball team to overcome his short stature and reach the national championship.",
    tags: ["Sports", "Drama"],
    year: "2014",
    rating: "8.9/10",
    keyLearnings: [
      "Individual talent is limited, but a team that connects can overcome the tallest of walls.",
      "The ball hasn't touched the court yet! Never give up until the very last whistle.",
      "Connect. The role of the setter is to essentially make the spiker look like a hero.",
    ],
  },
  {
    title: "Code Geass: Lelouch of the Rebellion",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1-2",
    recommended: true,
    image: "https://cdn.myanimelist.net/images/anime/1032/135088l.jpg",
    description:
      "Lelouch Lamperouge leads a rebellion against the Holy Britannian Empire using the power of Geass.",
    tags: ["Sci-Fi", "Thriller"],
    year: "2006",
    rating: "8.7/10",
    keyLearnings: [
      "Major change requires sacrifice and the courage to take on the world's hatred.",
      "If the king doesn't move, then his subjects won't follow.",
      "A life lived without a mask is impossible, but one must never forget the face underneath.",
    ],
  },
  {
    title: "Cowboy Bebop",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1",
    image: "https://cdn.myanimelist.net/images/anime/4/19644l.jpg",
    description:
      "A futuristic sci-fi western following a group of bounty hunters on the spaceship Bebop.",
    tags: ["Sci-Fi", "Action"],
    year: "1998",
    rating: "8.9/10",
    keyLearnings: [
      "You can't run from your past forever; eventually, you have to face it.",
      "See you space cowboy... Life is but a dream.",
      "Whatever happens, happens. Carrying the weight of the past only slows you down.",
    ],
  },
  {
    title: "Steins;Gate",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1 + 0",
    recommended: true,
    image: "https://cdn.myanimelist.net/images/anime/1935/127974l.jpg",
    description:
      "A group of friends discovers a way to send messages to the past, altering the future.",
    tags: ["Sci-Fi", "Thriller"],
    year: "2011",
    rating: "9.1/10",
    keyLearnings: [
      "The weight of a single choice can ripple across time.",
      "El Psy Kongroo. No one knows what the future holds, that's why its potential is infinite.",
      "Cherish the present, for it is the only timeline where you can truly act.",
    ],
  },
  {
    title: "Mob Psycho 100",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1-3",
    recommended: true,
    image: "https://cdn.myanimelist.net/images/anime/8/80356l.jpg",
    description:
      "A powerful psychic middle schooler wants to live a normal life.",
    tags: ["Action", "Comedy"],
    year: "2016",
    rating: "8.6/10",
    keyLearnings: [
      "Psychic powers don't make you a better person. Only kindness does.",
      "If everyone is special, maybe you can be what you want to be.",
      "It's okay to run away. You don't have to carry the weight of the world alone.",
    ],
  },
  {
    title: "Jujutsu Kaisen",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1-2 + Movie 0",
    image: "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg",
    description:
      "Yuji Itadori joins a secret organization of Jujutsu Sorcerers to eliminate a powerful Curse.",
    tags: ["Action", "Supernatural"],
    year: "2020",
    rating: "8.7/10",
    keyLearnings: [
      "Death is inevitable, so focus on living with no regrets.",
      "Love is the most twisted curse of all.",
      "I won't stop. Even if it means being a cog in the machine, I'll keep exorcising curses.",
    ],
  },
  {
    title: "Blue Lock",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1-2",
    recommended: true,
    image: "https://cdn.myanimelist.net/images/anime/1258/126929l.jpg",
    description:
      "Japan’s project to create the world's greatest striker through a rigorous selection process.",
    tags: ["Sports", "Thriller"],
    year: "2022",
    rating: "8.3/10",
    keyLearnings: [
      "In competitive fields, overwhelming 'egoism' is necessary to reach the top.",
      "Devour your rivals. Success is where preparation meets intense desire.",
      "Chemical reaction. Excellence happens when you force your talent to evolve against others.",
    ],
  },
  {
    title: "Solo Leveling",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1-2",
    recommended: true,
    image: "https://cdn.myanimelist.net/images/anime/1801/142390l.jpg",
    description:
      "In a world of hunters, the weakest hunter gains the ability to level up infinitely.",
    tags: ["Action", "Fantasy"],
    year: "2024",
    rating: "8.5/10",
    keyLearnings: [
      "Success is a solitary climb where one must constantly outdo their past self.",
      "Arise. Your greatest shadow is often the power you haven't yet mastered.",
      "The system uses you, but you must learn to use the system to survive.",
    ],
  },
  {
    title: "Demon Slayer",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1-5 + Mugen Train",
    image: "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
    description:
      "Tanjiro Kamado joins the Demon Slayer Corps to avenge his family and cure his sister.",
    tags: ["Action", "Fantasy"],
    year: "2019",
    rating: "9/10",
    keyLearnings: [
      "Empathy remains a warrior's greatest strength.",
      "Set your heart ablaze. Go beyond your limits to protect others.",
      "Breathing is the source of power. Mastery of the basics leads to ultimate strength.",
    ],
  },
  {
    title: "Tokyo Ghoul",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1-4",
    image: "https://cdn.myanimelist.net/images/anime/1498/134443l.jpg",
    description:
      "A college student is transformed into a half-ghoul and must navigate a dangerous new world.",
    tags: ["Horror", "Action"],
    year: "2014",
    rating: "7.8/10",
    keyLearnings: [
      "The world isn't wrong. It's the people within it who must choose how to survive.",
      "What's 1000 minus 7?",
      "Tragedy is not the end. It's the beginning of a transformation into something new.",
    ],
  },
  {
    title: "Aoashi",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1",
    image: "https://cdn.myanimelist.net/images/anime/1731/120871l.jpg",
    description:
      "A raw soccer talent from the countryside joins a prestigious youth academy in Tokyo.",
    tags: ["Sports", "Drama"],
    year: "2022",
    rating: "8.1/10",
    keyLearnings: [
      "Technical skill is useless without vision.",
      "Control the field. Soccer is about the space around the ball.",
      "Think. Don't just play; analyze the game and predict the future.",
    ],
  },
  {
    title: "Chainsaw Man",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1",
    image: "https://cdn.myanimelist.net/images/anime/1806/126216l.jpg",
    description:
      "A young man merges with a devil and hunts other devils for the Public Safety Division.",
    tags: ["Action", "Horror"],
    year: "2022",
    rating: "8.5/10",
    keyLearnings: [
      "Even the simplest desires are worth fighting for.",
      "Everyone's chasing some big dream. I just want a piece of toast.",
      "Fear is power. The more you are feared, the stronger you become.",
    ],
  },
  {
    title: "Erased",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1",
    image: "https://cdn.myanimelist.net/images/anime/10/77957l.jpg",
    description:
      "A man is sent back in time 18 years to prevent the death of his mother and classmates.",
    tags: ["Mystery", "Thriller"],
    year: "2016",
    rating: "8.5/10",
    keyLearnings: [
      "Courage is the spark that can change a tragic past.",
      "The town without me. Sometimes heroes step into the cold.",
      "Believing in someone is the strongest power you can give them.",
    ],
  },
  {
    title: "Dr. Stone",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1-4",
    recommended: true,
    image: "https://cdn.myanimelist.net/images/anime/1613/102576l.jpg",
    description:
      "Senku Ishigami uses science to rebuild civilization after humanity is petrified for thousands of years.",
    tags: ["Sci-Fi", "Adventure"],
    year: "2019",
    rating: "8.3/10",
    keyLearnings: [
      "Science is the ultimate equalizer.",
      "In a world of stone, steady progress is absolute.",
      "Passing the torch of knowledge is how humanity survives over thousands of years.",
    ],
  },
  {
    title: "Vinland Saga",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1-2",
    image: "https://cdn.myanimelist.net/images/anime/1500/103005l.jpg",
    description:
      "Thorfinn pursues a journey of revenge against the man who killed his father.",
    tags: ["Action", "Drama"],
    year: "2019",
    rating: "8.8/10",
    keyLearnings: [
      "The most difficult battle is the internal journey toward kindness.",
      "I have no enemies.",
      "A true warrior doesn't need a sword.",
    ],
  },
  {
    title: "Hajime no Ippo",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1-3",
    image: "https://cdn.myanimelist.net/images/anime/4/86334l.jpg",
    description:
      "Ippo Makunouchi discovers his talent for boxing and aims to become a champion.",
    tags: ["Sports", "Action"],
    year: "2000",
    rating: "8.8/10",
    keyLearnings: [
      "Boxers dont fight to hit. They fight to find the meaning of strength.",
      "The answer is at the end of every punch.",
      "Courage isn't the absence of fear; it's standing up when your legs are shaking.",
    ],
  },
  {
    title: "Great Teacher Onizuka",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1",
    image: "https://cdn.myanimelist.net/images/anime/13/11460.jpg",
    description:
      "The former leader of a biker gang becomes a high school teacher.",
    tags: ["Comedy", "Slice of Life"],
    year: "1999",
    rating: "8.6/10",
    keyLearnings: [
      "To reach students, you must be unafraid to be human.",
      "Life is more than just grades.",
      "Sometimes you have to break down walls—literally—to open someone's heart.",
    ],
  },
  {
    title: "Kuroko no Basket",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1-3",
    image: "https://cdn.myanimelist.net/images/anime/11/50453l.jpg",
    description:
      "A phantom sixth player helps his high school basketball team defeat the 'Generation of Miracles'.",
    tags: ["Sports"],
    year: "2012",
    rating: "8.4/10",
    keyLearnings: [
      "The greatest support allows others to shine.",
      "I am a shadow.",
      "Trust in your teammates is the only way to defeat a team of individuals.",
    ],
  },
  {
    title: "I want to eat your pancreas",
    type: AnimeType.Movie,
    status: WatchStatus.Completed,
    seasons: "Movie",
    image: "https://cdn.myanimelist.net/images/anime/1768/93291l.jpg",
    description:
      "An emotional story about a high school boy who discovers his classmate has a terminal illness.",
    tags: ["Drama", "Romance"],
    year: "2018",
    rating: "8.6/10",
    keyLearnings: [
      "Living each day with no regrets.",
      "To live is to have a bond with others.",
      "I want to become part of you, so that I may live on within you.",
    ],
  },
  {
    title: "Grave of the Fireflies",
    type: AnimeType.Movie,
    status: WatchStatus.Completed,
    seasons: "Movie",
    image: "https://cdn.myanimelist.net/images/anime/1485/141208l.jpg",
    description:
      "Two siblings struggle to survive in Japan during the final months of World War II.",
    tags: ["Drama", "War"],
    year: "1988",
    rating: "8.5/10",
    keyLearnings: [
      "War has no winners, only victims.",
      "Why do fireflies have to die so soon?",
      "Pride can be fatal when survival is at stake.",
    ],
  },
  {
    title: "Spirited Away",
    type: AnimeType.Movie,
    status: WatchStatus.Completed,
    seasons: "Movie",
    image: "https://cdn.myanimelist.net/images/anime/6/79597l.jpg",
    description:
      "A young girl wanders into a world ruled by gods, witches, and spirits.",
    tags: ["Fantasy", "Adventure"],
    year: "2001",
    rating: "8.8/10",
    keyLearnings: [
      "Courage can break any curse.",
      "Don't forget your name.",
      "Greed turns humans into pigs. Generosity and kindness are the only true magic.",
    ],
  },
  {
    title: "Your Name",
    type: AnimeType.Movie,
    status: WatchStatus.Completed,
    seasons: "Movie",
    image: "https://cdn.myanimelist.net/images/anime/5/87048l.jpg",
    description:
      "Two teenagers share a profound connection after discovering they are swapping bodies.",
    tags: ["Romance", "Supernatural"],
    year: "2016",
    rating: "8.9/10",
    keyLearnings: [
      "The thread of fate connects hearts.",
      "I'm always searching for someone.",
      "Twilight is the time when worlds blur, and miracles can happen.",
    ],
  },
  {
    title: "A Silent Voice",
    type: AnimeType.Movie,
    status: WatchStatus.Completed,
    seasons: "Movie",
    image: "https://cdn.myanimelist.net/images/anime/1122/96435l.jpg",
    description:
      "A young man seeks redemption for bullying a deaf girl in elementary school.",
    tags: ["Drama"],
    year: "2016",
    rating: "8.9/10",
    keyLearnings: [
      "Redemption starts with listening.",
      "Forgiveness begins with self-forgiveness.",
      "Look people in the eye. The world is beautiful if you choose to see it.",
    ],
  },
  {
    title: "Frieren: Beyond Journey's End",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1",
    recommended: true,
    image: "https://cdn.myanimelist.net/images/anime/1015/138006l.webp",
    description:
      "An elven mage and her companions defeat the Demon King. After the war, she must face the challenges of time and loss.",
    tags: ["Adventure", "Drama", "Fantasy"],
    year: "2023",
    rating: "9.3/10",
    keyLearnings: [
      "A decade is but a blink in the eyes of eternity.",
      "The weight of a memory is inversely proportional to the time you have left.",
      "Understanding humanity is a quest that requires infinite patience.",
    ],
  },
  {
    title: "Berserk",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1-2",
    image: "https://cdn.myanimelist.net/images/anime/1384/119988l.jpg",
    description:
      "A grimdark masterpiece about a man struggling against a predetermined fate.",
    tags: ["Action", "Adventure", "Drama", "Fantasy", "Horror"],
    year: "1997",
    rating: "8.5/10",
    keyLearnings: [
      "The struggle to survive is what makes us human.",
      "Ambition, unchecked by morality, is a destructive force.",
      "Trauma is a long shadows.",
    ],
  },
  {
    title: "Kaguya-sama: Love Is War",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1-4",
    recommended: true,
    image: "https://cdn.myanimelist.net/images/anime/1295/106551l.jpg",
    description:
      "High school geniuses Kaguya Shinomiya and Miyuki Shirogane try to make the other confess their love first.",
    tags: ["Comedy", "Romance", "Psychological"],
    year: "2019",
    rating: "8.9/10",
    keyLearnings: [
      "Love is war, and the one who falls in love first loses.",
      "True vulnerability requires immense courage.",
      "Masks we wear to protect ourselves eventually become barriers to connection.",
    ],
  },
  {
    title: "Naruto",
    type: AnimeType.Anime,
    status: WatchStatus.Planning,
    seasons: "S1-5 + Shippuden S1-21",
    image: "https://cdn.myanimelist.net/images/anime/13/17405l.jpg",
    description: "A nuanced socio-political commentary on the cycle of hatred.",
    tags: ["Action", "Adventure", "Fantasy"],
    year: "2002",
    rating: "8.0/10",
    keyLearnings: [
      "Persistence is the only counter to ostracization.",
      "Talk-no-jutsu is effective magic.",
      "Bonds are forged in mutual trauma.",
    ],
  },
  {
    title: "Attack on Titan",
    type: AnimeType.Anime,
    status: WatchStatus.Planning,
    seasons: "S1-4",
    image: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
    description: "A grim examination of freedom, nationalism, and conflict.",
    tags: ["Action", "Drama", "Suspense"],
    year: "2013",
    rating: "8.6/10",
    keyLearnings: [
      "Heroism is a matter of perspective.",
      "Walls are temporary solutions.",
      "One man's freedom fighter is another's genocidal titan.",
    ],
  },
  {
    title: "Fullmetal Alchemist Brotherhood",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1 (64 episodes)",
    image: "https://cdn.myanimelist.net/images/anime/1223/96541l.jpg",
    description: "A masterclass in law of equivalent exchange.",
    tags: ["Action", "Adventure", "Fantasy"],
    year: "2009",
    rating: "9.1/10",
    keyLearnings: [
      "Humanity cannot gain without giving.",
      "A heart of steel protects a soul of gold.",
      "Pursuit of godhood ends with meeting Truth.",
    ],
  },
  {
    title: "Hunter x Hunter",
    type: AnimeType.Anime,
    status: WatchStatus.Planning,
    seasons: "S1",
    image: "https://cdn.myanimelist.net/images/anime/1818/126435l.webp",
    description:
      "A deconstruction of the shounen genre with existential dread.",
    tags: ["Action", "Adventure", "Fantasy"],
    year: "2011",
    rating: "9.0/10",
    keyLearnings: [
      "Enjoy the little detours.",
      "Nen is weaponized willpower.",
      "Never underestimate a child with a fishing rod.",
    ],
  },
  {
    title: "The Promised Neverland",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1,2",
    image: "https://cdn.myanimelist.net/images/anime/1125/96929l.jpg",
    description:
      "Orphans at Grace Field House discover they are raised as livestock for demons and plan an escape.",
    tags: ["Sci-Fi", "Mystery", "Horror", "Psychological"],
    year: "2019",
    rating: "8.5/10",
    keyLearnings: [
      "Freedom is worth any price.",
      "Strategic thinking can overcome superior strength.",
      "Family is not just blood, it's those you fight for.",
    ],
  },
  {
    title: "Monster",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1 (74 episodes)",
    image: "https://cdn.myanimelist.net/images/anime/10/18793l.jpg",
    description:
      "Dr. Kenzou Tenma saves a young boy's life, only to find out years later he is a monster.",
    tags: ["Drama", "Mystery", "Suspense", "Psychological"],
    year: "2004",
    rating: "8.9/10",
    keyLearnings: [
      "All life is equal.",
      "The true monster is often the one within.",
      "Doing the right thing can sometimes lead to terrible consequences.",
    ],
  },
  {
    title: "Fruits Basket",
    type: AnimeType.Anime,
    status: WatchStatus.Completed,
    seasons: "S1-3",
    image: "https://cdn.myanimelist.net/images/anime/1447/99827l.jpg",
    description:
      "A heartwarming and heartbreaking story about a girl who lives in a tent and discovers a family curse.",
    tags: ["Drama", "Romance", "Supernatural"],
    year: "2019",
    rating: "9.0/10",
    keyLearnings: [
      "Kindness can break the strongest curses.",
      "We are all protecting something.",
      "The snow melts and becomes spring.",
    ],
  },
];
