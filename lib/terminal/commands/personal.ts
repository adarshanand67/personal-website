import { Command } from '../types';
import { createCommand, addLines } from '../helpers';
import { siteConfig } from '@/config';
import { TERMINAL_MESSAGES } from '../messages';

/**
 * Personal branding commands: resume
 */

export const resume: Command = createCommand(
    'resume',
    'Display interactive resume',
    (_, { setLines }) => {
        const output = [
            '',
            `📄 \x1b[1m${siteConfig.author.name.toUpperCase()} - RESUME\x1b[0m`,
            '──────────────────────────────────────────────────',
            '',
            `\x1b[1;36m${TERMINAL_MESSAGES.RESUME.SUMMARY}\x1b[0m`,
            `  ${siteConfig.description}`,
            '',
            `\x1b[1;36m${TERMINAL_MESSAGES.RESUME.EXPERIENCE}\x1b[0m`,
            '  \x1b[1mSoftware Engineer @ Trellix\x1b[0m',
            '  \x1b[3mJuly 2022 - Present\x1b[0m',
            '  • Developed secure DLP solutions using C++ and Rust.',
            '  • Optimized scanning engines for high-throughput environments.',
            '',
            `\x1b[1;36m${TERMINAL_MESSAGES.RESUME.EDUCATION}\x1b[0m`,
            '  \x1b[1mBachelor of Engineering\x1b[0m',
            '  \x1b[3m2018 - 2022\x1b[0m',
            '  • Major in Computer Science',
            '',
            `\x1b[1;36m${TERMINAL_MESSAGES.RESUME.SKILLS}\x1b[0m`,
            '  • \x1b[1mLanguages:\x1b[0m C++, Rust, Python, TypeScript',
            '  • \x1b[1mTools:\x1b[0m Docker, Kubernetes, Git, AWS',
            '',
            '──────────────────────────────────────────────────',
            TERMINAL_MESSAGES.RESUME.FOOTER,
            ''
        ];
        addLines(setLines, output);
    },
    {
        category: 'utility',
        usage: 'resume',
        examples: ['resume']
    }
);

export const personalCommands = {
    resume
};
