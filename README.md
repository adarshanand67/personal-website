# 🚀 Personal Portfolio Template

A modern, customizable portfolio website built with **Next.js 16**, **React 19**, and **TypeScript**. Features a terminal-inspired design with Matrix rain effects, interactive widgets, and a fully decoupled data system.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)

![Portfolio Preview](./public/og-image.png)

---

## ✨ Features

- 🎨 **Modern Terminal Design** - Cyberpunk-inspired UI with Matrix rain background
- 🎵 **Music Player** - Background music with playlist support
- 💻 **Interactive Terminal** - Functional command-line interface
- 📝 **Blog System** - Markdown-based blog with syntax highlighting
- 🎯 **Project Showcase** - Portfolio projects with tech stack
- 📚 **Reading List** - Books and research papers
- 🎬 **Entertainment Tracker** - Anime and movies watchlist
- 🌓 **Dark/Light Mode** - Theme toggle with system preference
- ⚡ **Lightning Fast** - Optimized with Next.js 16
- 📱 **Fully Responsive** - Mobile-first design
- 🎛️ **Feature Toggles** - Enable/disable components easily
- 🔧 **Fully Customizable** - No code changes needed!

---

## 🎯 Quick Start (5 Minutes)

### 1. **Clone & Install**

```bash
git clone https://github.com/adarshanand67/personal-website.git my-portfolio
cd my-portfolio
pnpm install
```

### 2. **Customize Your Info**

Edit **`config/site.config.ts`**:

```typescript
export const siteConfig = {
  name: "Your Name",                    // ← Change this
  title: "Your Name - Your Title",      // ← Change this
  description: "Your portfolio description",
  url: "https://yourwebsite.com",
  
  author: {
    name: "Your Name",
    email: "your.email@example.com",
    role: "Your Role @ Company",
    github: "yourgithub",
    linkedin: "yourlinkedin",
  },
  
  seo: {
    keywords: ["Your", "Keywords"],
    ogImage: "/og-image.png",
  },
};
```

### 3. **Update Your Data**

Edit JSON files in `data/` folder:

```bash
data/
├── profile.json          # Your bio, education, socials
├── experiences.json      # Work history
├── projects.json         # Portfolio projects
├── blogs/               # Blog posts (markdown)
├── books.json           # Reading list
├── entertainment.json   # Anime/movies
└── hobbies.json         # Your hobbies
```

### 4. **Run Locally**

```bash
pnpm dev
```

Visit **http://localhost:3000** 🎉

### 5. **Deploy**

```bash
pnpm build
```

Deploy to [Vercel](https://vercel.com), [Netlify](https://netlify.com), or [GitHub Pages](https://pages.github.com).

---

## 📁 Project Structure

```
my-portfolio/
├── config/                    # 🎯 CUSTOMIZE THESE
│   ├── site.config.ts        # Personal info, SEO
│   ├── theme.config.ts       # Colors, fonts, effects
│   ├── features.config.ts    # Toggle features on/off
│   └── shelves.ts            # Shelf configurations
│
├── data/                      # 🎯 YOUR DATA HERE
│   ├── profile.json          # Bio, education, socials
│   ├── experiences.json      # Work experience
│   ├── projects.json         # Portfolio projects
│   ├── blogs/                # Blog posts (.md files)
│   ├── books.json            # Reading list
│   ├── papers.json           # Research papers
│   ├── entertainment.json    # Anime/movies
│   ├── hobbies.json          # Hobbies
│   └── uses.json             # Tech stack
│
├── components/                # ✅ UI Components (don't edit)
├── app/                       # ✅ Pages (don't edit)
├── lib/                       # ✅ Utilities (don't edit)
└── public/                    # 🎯 Images, assets
```

---

## 🎨 Customization

### **Change Colors**

Edit `config/theme.config.ts`:

```typescript
export const themeConfig = {
  colors: {
    primary: "#00bf40",       // Your brand color
    accent: "#15803d",        // Accent color
  },
};
```

### **Toggle Features**

Edit `config/features.config.ts`:

```typescript
export const featuresConfig = {
  enableBlog: true,           // Show/hide blog
  enableProjects: true,       // Show/hide projects
  enableMusicPlayer: true,    // Enable music player
  enableTerminal: true,       // Enable terminal widget
  enableMatrixRain: true,     // Matrix background effect
  enableGitHubStats: true,    // GitHub stats widget
  // ... toggle any feature
};
```

### **Update SEO**

Edit `config/site.config.ts`:

```typescript
seo: {
  keywords: ["Your", "SEO", "Keywords"],
  ogImage: "/your-og-image.png",
  twitterHandle: "@yourhandle",
}
```

---

## 📝 Adding Content

### **Add a Blog Post**

1. Create `data/blogs/my-post.md`
2. Add frontmatter:

```markdown
---
title: "My Blog Post"
date: "2024-01-15"
excerpt: "A short description"
---

Your content here...
```

### **Add a Project**

Edit `data/projects.json`:

```json
{
  "title": "My Project",
  "description": "Project description",
  "tech": ["React", "TypeScript", "Next.js"],
  "link": "https://github.com/you/project"
}
```

### **Add Work Experience**

Edit `data/experiences.json`:

```json
{
  "company": "Company Name",
  "role": "Your Role",
  "duration": "Jan 2024 - Present",
  "location": "Remote",
  "logo": "/logos/company.png",
  "highlights": [
    "Achievement 1",
    "Achievement 2"
  ]
}
```

---

## 🚀 Deployment

### **Vercel (Recommended)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/adarshanand67/personal-website)

1. Push to GitHub
2. Import on [Vercel](https://vercel.com)
3. Deploy! ✨

### **Netlify**

1. Push to GitHub
2. Import on [Netlify](https://netlify.com)
3. Build command: `pnpm build`
4. Publish directory: `.next`

### **GitHub Pages**

```bash
pnpm build
pnpm export
# Push to gh-pages branch
```

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://reactjs.org/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Fonts:** [Google Fonts](https://fonts.google.com/) (Assistant, JetBrains Mono)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Detailed setup guide
- **[BEST_PRACTICES.md](./BEST_PRACTICES.md)** - Code quality standards
- **[config/](./config/)** - Configuration files with inline docs

---

## 🎯 Key Features Explained

### **1. Decoupled Data System**

All personal data is in **config files** and **JSON files**. No hardcoded values in components!

```typescript
// Before: Hardcoded
const name = "Adarsh Anand";

// After: From config
import { siteConfig } from "@/config";
const name = siteConfig.name;
```

### **2. Feature Flags**

Toggle components on/off without deleting code:

```typescript
{featuresConfig.enableMusicPlayer && <MusicPlayer />}
{featuresConfig.enableTerminal && <Terminal />}
```

### **3. Type Safety**

Everything is fully typed with TypeScript:

```typescript
export const siteConfig: SiteConfig = { /* ... */ };
export const themeConfig: ThemeConfig = { /* ... */ };
```

### **4. Modern Best Practices**

- ✅ No `any` types
- ✅ Enums instead of string literals
- ✅ Type guards for runtime validation
- ✅ Barrel exports for clean imports
- ✅ JSDoc comments on all public APIs
- ✅ Memoization with `useCallback`
- ✅ Custom hooks for reusable logic

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Design inspired by terminal/cyberpunk aesthetics
- Matrix rain effect from classic Matrix movies
- Built with modern web technologies

---

## 📧 Contact

**Adarsh Anand**

- Website: [adarshanand.dev](https://adarshanand.dev)
- GitHub: [@adarshanand67](https://github.com/adarshanand67)
- LinkedIn: [adarshanand67](https://linkedin.com/in/adarshanand67)
- Email: adarshan20302@gmail.com

---

## ⭐ Show Your Support

If you found this template helpful, please give it a ⭐ on GitHub!

---

**Made with ❤️ by [Adarsh Anand](https://github.com/adarshanand67)**
