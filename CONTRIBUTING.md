# Contributing to Personal Portfolio Template

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- Git

### Setup
```bash
git clone https://github.com/adarshanand67/personal-website.git
cd personal-website
pnpm install
pnpm dev
```

## 📁 Project Structure

```
personal-website/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── common/            # Shared components
│   ├── home/              # Homepage components
│   ├── seo/               # SEO components
│   ├── ui/                # UI primitives
│   └── widgets/           # Interactive widgets
├── config/                # Configuration files
├── data/                  # JSON data files
├── lib/                   # Utilities and helpers
└── types/                 # TypeScript types
```

## 🎯 Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow existing code patterns
- Use functional components with hooks
- Prefer `const` over `let`
- Use meaningful variable names

### Naming Conventions
- **Components:** PascalCase (`MyComponent.tsx`)
- **Utilities:** camelCase (`myUtility.ts`)
- **Constants:** UPPER_SNAKE_CASE (`MY_CONSTANT`)
- **Types:** PascalCase (`MyType`)

### Component Guidelines
```tsx
// ✅ Good
export function MyComponent({ prop }: MyComponentProps) {
  const [state, setState] = useState<string>('');
  
  return <div>{prop}</div>;
}

// ❌ Avoid
export default ({ prop }) => {
  return <div>{prop}</div>;
}
```

## 🧪 Testing

### Running Tests
```bash
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Coverage report
```

### Writing Tests
- Place tests next to the file: `Component.test.tsx`
- Test user behavior, not implementation
- Use descriptive test names

```tsx
describe('MyComponent', () => {
  it('should render correctly', () => {
    // Test implementation
  });
});
```

## 📝 Commit Guidelines

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

### Examples
```bash
feat(seo): add structured data for blog posts
fix(terminal): resolve command parsing issue
docs(readme): update installation instructions
```

## 🔄 Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### PR Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Build passes (`pnpm build`)
- [ ] No TypeScript errors
- [ ] Meaningful commit messages

## 🐛 Reporting Bugs

### Before Submitting
- Check existing issues
- Verify it's reproducible
- Test on latest version

### Bug Report Template
```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. macOS]
- Browser: [e.g. Chrome]
- Version: [e.g. 1.0.0]
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution**
What you want to happen.

**Describe alternatives**
Alternative solutions considered.

**Additional context**
Any other context or screenshots.
```

## 📚 Documentation

### Updating Documentation
- Keep README.md up to date
- Add JSDoc comments to functions
- Update CHANGELOG.md
- Document breaking changes

### JSDoc Example
```typescript
/**
 * Generate Person schema for structured data
 * @returns {object} JSON-LD Person schema
 */
export function generatePersonSchema() {
  // Implementation
}
```

## 🎨 Design Guidelines

### UI/UX Principles
- Mobile-first design
- Accessibility (WCAG AA)
- Dark mode support
- Consistent spacing
- Semantic HTML

### Color Palette
- Primary: `#00bf40` (green)
- Accent: `#15803d`
- Background: System preference

## 🔒 Security

### Reporting Security Issues
**Do not** open public issues for security vulnerabilities.

Email: adarshan20302@gmail.com

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions make this project better for everyone!

---

**Questions?** Open an issue or reach out on [LinkedIn](https://linkedin.com/in/adarshanand67)
