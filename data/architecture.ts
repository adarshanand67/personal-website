export interface ArchNode {
    id: string;
    label: string;
    type: 'frontend' | 'backend' | 'database' | 'devops' | 'core';
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
    // Core User
    { id: 'user', label: 'User / Recruiter', type: 'core', x: 50, y: 50, description: 'The end user accessing the portfolio.' },

    // Frontend
    { id: 'nextjs', label: 'Next.js (App Router)', type: 'frontend', x: 25, y: 25, description: 'React framework for performance and SEO.' },
    { id: 'tailwind', label: 'Tailwind CSS', type: 'frontend', x: 25, y: 35, description: 'Utility-first CSS for rapid, custom styling.' },
    { id: 'framer', label: 'Framer Motion', type: 'frontend', x: 25, y: 15, description: 'Animation library for complex transitions.' },
    { id: 'threejs', label: 'Three.js / R3F', type: 'frontend', x: 35, y: 20, description: '3D rendering engine for hero elements.' },
    { id: 'zustand', label: 'Zustand Store', type: 'frontend', x: 40, y: 30, description: 'Lightweight state management.' },

    // Backend / Services
    { id: 'node', label: 'Node.js', type: 'backend', x: 75, y: 25, description: 'Runtime for backend logic.' },
    { id: 'rust', label: 'Rust Services', type: 'backend', x: 80, y: 35, description: 'High-performance microservices.' },

    // Data
    { id: 'postgres', label: 'PostgreSQL', type: 'database', x: 75, y: 45, description: 'Relational database for structured data.' },
    { id: 'redis', label: 'Redis', type: 'database', x: 85, y: 25, description: 'In-memory caching for speed.' },

    // DevOps
    { id: 'docker', label: 'Docker / K8s', type: 'devops', x: 60, y: 60, description: 'Containerization and orchestration.' },
    { id: 'github', label: 'CI/CD (GitHub)', type: 'devops', x: 50, y: 70, description: 'Automated testing and deployment pipelines.' },
];

export const architectureConnections: ArchConnection[] = [
    { source: 'user', target: 'nextjs', description: 'HTTP/HTTPS Request' },
    { source: 'nextjs', target: 'tailwind', description: 'Styled By' },
    { source: 'nextjs', target: 'framer', description: 'Animated By' },
    { source: 'nextjs', target: 'threejs', description: 'Renders 3D' },
    { source: 'nextjs', target: 'zustand', description: 'Manages State' },

    { source: 'nextjs', target: 'node', description: 'API Calls' },
    { source: 'node', target: 'postgres', description: 'Query / Write' },
    { source: 'node', target: 'redis', description: 'Cache Hit/Miss' },
    { source: 'node', target: 'rust', description: 'FFI / Microservices' },

    { source: 'docker', target: 'node', description: 'Runs' },
    { source: 'docker', target: 'rust', description: 'Runs' },
    { source: 'docker', target: 'postgres', description: 'Hosts' },

    { source: 'github', target: 'nextjs', description: 'Deploys' },
];
