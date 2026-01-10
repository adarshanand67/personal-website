# Personal Portfolio Template

A modern, customizable portfolio website built with **Next.js 16**, **React 19**, and **TypeScript**. Features a terminal-inspired design with Matrix rain effects, interactive widgets, and a fully decoupled data system.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)

![Portfolio Preview](./public/images/ogImage.png)

## Features

- **Modern Terminal Design**: Cyberpunk-inspired UI with Matrix rain background
- **Music Player**: Background music with playlist support
- **Interactive Terminal**: Functional command-line interface
- **Blog System**: Markdown-based blog with syntax highlighting
- **Project Showcase**: Portfolio projects with tech stack
- **Collections**: Books, Anime, Research Papers, Hobbies
- **Dark/Light Mode**: Theme toggle with system preference
- **Performance**: Optimized with Next.js 16
- **Feature Toggles**: Enable/disable components easily

## Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/adarshanand67/adarshanand67.github.io.git my-portfolio
   cd my-portfolio
   npm install
   ```
2. **Customize Config**
   Edit **`lib/config.ts`** to update site details, author info, and feature toggles.
3. **Update Data**
   Edit files in **`data/`** directory to update your profile, projects, collections, and experiences.
4. **Run Locally**
   ```bash
   npm run dev
   ```
   Visit **http://localhost:3000**

## Project Structure

```
my-portfolio/
├── data/                      # DATA MODULES
│   ├── blogs/                 # Blog markdown files
│   ├── profile.ts             # Profile information
│   ├── experience.ts          # Work experience
│   └── index.ts               # Data exports
├── lib/                       # CORE CONFIG & UTILS
│   ├── config.ts              # Site, theme, and feature config
│   ├── constants.ts           # Route definitions music tracks
│   ├── api.ts                 # Data fetching utilities
│   ├── hooks.ts               # Custom React hooks
│   ├── utils.ts               # Utility functions
│   └── store.ts               # State management (Zustand)
├── components/                # UI Components
│   ├── features/              # Feature components (Terminal, Music, etc.)
│   ├── layout.tsx             # Root layout & Navigation
│   ├── collections.tsx        # Collection displays (Books, Anime, etc.)
│   └── ui/                    # Reusable UI primitives
├── app/                       # Next.js App Router Pages
├── public/                    # Images, assets
└── types/                     # TypeScript definitions
```

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19, Tailwind CSS 4
- **Language:** TypeScript 5
- **State Management:** Zustand
- **Icons:** Lucide React
- **Fonts:** Google Fonts (Assistant, JetBrains Mono)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Made by [Adarsh Anand](https://github.com/adarshanand67)**
