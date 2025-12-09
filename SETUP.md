# 🚀 Setup Guide - Personal Portfolio Template

Welcome! This is a **fully customizable portfolio template** built with Next.js 16, React 19, and TypeScript. You can make it yours by simply updating configuration and data files—no code changes needed!

## ⚡ Quick Start (5 minutes)

### 1. Clone & Install

```bash
git clone https://github.com/adarshanand67/personal-website.git my-portfolio
cd my-portfolio
pnpm install
```

### 2. Update Configuration

Edit these files with your information:

#### **`config/site.config.ts`** - Your Personal Info
```typescript
export const siteConfig = {
  name: "Your Name",
  title: "Your Name - Your Title",
  description: "Your portfolio description",
  url: "https://yourwebsite.com",
  
  author: {
    name: "Your Name",
    email: "your.email@example.com",
    role: "Your Role @ Company",
    location: "Your Location",
    github: "yourgithub",
    linkedin: "yourlinkedin",
  },
  
  seo: {
    keywords: ["Your", "Keywords", "Here"],
    ogImage: "/og-image.png",
    twitterHandle: "@yourhandle",
  },
  
  // ... rest of config
};
```

#### **`config/features.config.ts`** - Enable/Disable Features
```typescript
export const featuresConfig = {
  enableBlog: true,              // Show blog section
  enableProjects: true,          // Show projects
  enableMusicPlayer: true,       // Background music
  enableTerminal: true,          // Interactive terminal
  enableMatrixRain: true,        // Matrix background
  // ... toggle any feature on/off
};
```

#### **`config/theme.config.ts`** - Customize Colors (Optional)
```typescript
export const themeConfig = {
  colors: {
    primary: "#00bf40",          // Your brand color
    accent: "#15803d",
  },
  // ... more theme options
};
```

### 3. Update Your Data

Edit JSON files in the `data/` folder:

- **`data/profile.json`** - Bio, education, socials
- **`data/experiences.json`** - Work history
- **`data/projects.json`** - Your projects
- **`data/blogs/`** - Blog posts (markdown files)
- **`data/books.json`** - Reading list
- **`data/entertainment.json`** - Anime/movies
- **`data/hobbies.json`** - Your hobbies

### 4. Run Locally

```bash
pnpm dev
```

Visit `http://localhost:3000` to see your portfolio!

### 5. Deploy

```bash
pnpm build
```

Deploy to Vercel, Netlify, or GitHub Pages.

---

## 📁 File Structure

```
my-portfolio/
├── config/                    # 🎯 EDIT THESE
│   ├── site.config.ts        # Your personal info
│   ├── theme.config.ts       # Visual customization
│   └── features.config.ts    # Feature toggles
│
├── data/                      # 🎯 EDIT THESE
│   ├── profile.json          # Bio, education
│   ├── experiences.json      # Work history
│   ├── projects.json         # Portfolio projects
│   ├── blogs/                # Blog posts (.md)
│   ├── books.json            # Reading list
│   ├── entertainment.json    # Anime/movies
│   └── hobbies.json          # Hobbies
│
├── components/                # ✅ DON'T EDIT (UI code)
├── app/                       # ✅ DON'T EDIT (Pages)
└── lib/                       # ✅ DON'T EDIT (Utils)
```

---

## 🎨 Customization

### Change Colors

Edit `config/theme.config.ts`:

```typescript
export const themeConfig = {
  colors: {
    primary: "#your-color",     // Main brand color
    accent: "#your-accent",     // Accent color
  },
};
```

### Toggle Features

Edit `config/features.config.ts`:

```typescript
export const featuresConfig = {
  enableMusicPlayer: false,     // Disable music player
  enableTerminal: false,        // Disable terminal
  enableMatrixRain: false,      // Disable matrix effect
  // ... toggle any feature
};
```

### Update SEO

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

### Add a Blog Post

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

### Add a Project

Edit `data/projects.json`:

```json
{
  "title": "My Project",
  "description": "Project description",
  "tech": ["React", "TypeScript"],
  "link": "https://github.com/you/project"
}
```

### Add Work Experience

Edit `data/experiences.json`:

```json
{
  "company": "Company Name",
  "role": "Your Role",
  "duration": "Jan 2024 - Present",
  "location": "Location",
  "logo": "/logos/company.png",
  "highlights": [
    "Achievement 1",
    "Achievement 2"
  ]
}
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import on [Vercel](https://vercel.com)
3. Deploy!

### GitHub Pages

```bash
pnpm build
pnpm export
# Push to gh-pages branch
```

### Netlify

1. Push to GitHub
2. Import on [Netlify](https://netlify.com)
3. Build command: `pnpm build`
4. Publish directory: `.next`

---

## ❓ FAQ

**Q: Do I need to know React/Next.js?**  
A: No! Just edit the config and data files.

**Q: Can I change the design?**  
A: Yes! Edit `config/theme.config.ts` for colors and effects.

**Q: How do I add my own logo?**  
A: Add your logo to `public/` and reference it in `data/profile.json`.

**Q: Can I remove sections I don't need?**  
A: Yes! Set features to `false` in `config/features.config.ts`.

---

## 🆘 Need Help?

- Check [CUSTOMIZATION.md](./CUSTOMIZATION.md) for detailed theming
- See example data in `data/examples/`
- Open an issue on GitHub

---

## 📄 License

MIT License - feel free to use this template for your portfolio!

---

**Made with ❤️ by [Adarsh Anand](https://github.com/adarshanand67)**
