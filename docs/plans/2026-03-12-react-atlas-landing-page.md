# React Atlas Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a brand awareness landing page using React, Vite, and Atlassian Atlas Design System with Hero, About, and Contact sections.

**Architecture:** Single-page React application with component-based architecture. Uses Vite for build tooling, Atlas design tokens for styling consistency, and Atlas components for UI elements. No routing or state management needed—purely presentational with static content.

**Tech Stack:** Vite 5.x, React 18.x, @atlaskit packages (css-reset, tokens, primitives)

---

## Task 1: Initialize Vite React Project

**Files:**
- Create: entire project structure via Vite scaffolding

**Step 1: Create Vite React project**

Run:
```bash
npm create vite@latest . -- --template react
```

Expected: Prompts for project setup, creates package.json, vite.config.js, src/ folder with boilerplate

**Step 2: Install base dependencies**

Run:
```bash
npm install
```

Expected: node_modules/ created, dependencies installed successfully

**Step 3: Verify dev server works**

Run:
```bash
npm run dev
```

Expected: Server starts on localhost:5173, shows default Vite + React page in browser

Stop server: Ctrl+C

**Step 4: Commit initial setup**

```bash
git add .
git commit -m "chore: initialize Vite React project"
```

---

## Task 2: Install Atlas Dependencies

**Files:**
- Modify: `package.json` (via npm install)

**Step 1: Install Atlas core packages**

Run:
```bash
npm install @atlaskit/css-reset @atlaskit/tokens @atlaskit/primitives
```

Expected: Packages added to package.json dependencies, installed in node_modules/

**Step 2: Verify installation**

Run:
```bash
npm list @atlaskit/css-reset @atlaskit/tokens @atlaskit/primitives
```

Expected: Shows installed versions of all three packages

**Step 3: Commit dependencies**

```bash
git add package.json package-lock.json
git commit -m "chore: add Atlas design system dependencies"
```

---

## Task 3: Set Up Base App Structure

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/App.css` (delete)
- Modify: `src/index.css` (replace)
- Modify: `src/main.jsx`

**Step 1: Update main.jsx with CSS reset**

File: `src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import '@atlaskit/css-reset'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Step 2: Remove default Vite styling**

Run:
```bash
rm src/App.css
```

Expected: File deleted

**Step 3: Clear default index.css**

File: `src/index.css`

```css
/* Intentionally empty - using Atlas tokens instead */
```

**Step 4: Create minimal App component**

File: `src/App.jsx`

```jsx
import React from 'react'

function App() {
  return (
    <div>
      <h1>Landing Page</h1>
    </div>
  )
}

export default App
```

**Step 5: Test the changes**

Run:
```bash
npm run dev
```

Expected: Page loads with "Landing Page" heading, no console errors, Atlas CSS reset applied (no default margins)

Stop server: Ctrl+C

**Step 6: Commit base structure**

```bash
git add src/main.jsx src/App.jsx src/index.css
git add -u
git commit -m "feat: set up base App structure with Atlas CSS reset"
```

---

## Task 4: Create Hero Component

**Files:**
- Create: `src/components/Hero.jsx`

**Step 1: Create components directory**

Run:
```bash
mkdir -p src/components
```

Expected: Directory created

**Step 2: Create Hero component**

File: `src/components/Hero.jsx`

```jsx
import React from 'react'
import { Box, Inline, Stack, xcss } from '@atlaskit/primitives'
import { token } from '@atlaskit/tokens'

const heroStyles = xcss({
  minHeight: '400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'color.background.accent.blue.subtlest',
  paddingBlock: 'space.800',
  paddingInline: 'space.400',
})

const titleStyles = xcss({
  font: 'font.heading.xlarge',
  color: 'color.text',
  textAlign: 'center',
})

const subtitleStyles = xcss({
  font: 'font.body.large',
  color: 'color.text.subtlest',
  textAlign: 'center',
})

function Hero() {
  return (
    <Box xcss={heroStyles}>
      <Stack space="space.300" alignInline="center">
        <Box xcss={titleStyles} as="h1">
          Welcome to Our Brand
        </Box>
        <Box xcss={subtitleStyles} as="p">
          Building the future, one step at a time
        </Box>
      </Stack>
    </Box>
  )
}

export default Hero
```

**Step 3: Import and use Hero in App**

File: `src/App.jsx`

```jsx
import React from 'react'
import Hero from './components/Hero'

function App() {
  return (
    <div>
      <Hero />
    </div>
  )
}

export default App
```

**Step 4: Test Hero component**

Run:
```bash
npm run dev
```

Expected: Hero section displays with blue background, centered title "Welcome to Our Brand" and subtitle, uses Atlas spacing and typography

Visual check: Responsive on browser resize

Stop server: Ctrl+C

**Step 5: Commit Hero component**

```bash
git add src/components/Hero.jsx src/App.jsx
git commit -m "feat: create Hero component with Atlas primitives"
```

---

## Task 5: Create About Component

**Files:**
- Create: `src/components/About.jsx`

**Step 1: Create About component**

File: `src/components/About.jsx`

```jsx
import React from 'react'
import { Box, Stack, xcss } from '@atlaskit/primitives'

const aboutStyles = xcss({
  paddingBlock: 'space.800',
  paddingInline: 'space.400',
  backgroundColor: 'color.background.neutral',
})

const containerStyles = xcss({
  maxWidth: '800px',
  marginInline: 'auto',
})

const headingStyles = xcss({
  font: 'font.heading.large',
  color: 'color.text',
  marginBottom: 'space.300',
})

const textStyles = xcss({
  font: 'font.body.large',
  color: 'color.text',
  lineHeight: '1.6',
})

function About() {
  return (
    <Box xcss={aboutStyles}>
      <Box xcss={containerStyles}>
        <Stack space="space.300">
          <Box xcss={headingStyles} as="h2">
            About Us
          </Box>
          <Box xcss={textStyles} as="p">
            We are dedicated to creating exceptional experiences through innovation
            and thoughtful design. Our mission is to deliver products and services
            that make a meaningful impact in people's lives.
          </Box>
          <Box xcss={textStyles} as="p">
            With a focus on quality, sustainability, and customer satisfaction,
            we strive to be a trusted partner in your journey toward success.
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default About
```

**Step 2: Import and use About in App**

File: `src/App.jsx`

```jsx
import React from 'react'
import Hero from './components/Hero'
import About from './components/About'

function App() {
  return (
    <div>
      <Hero />
      <About />
    </div>
  )
}

export default App
```

**Step 3: Test About component**

Run:
```bash
npm run dev
```

Expected: About section displays below Hero with neutral background, centered content (max-width 800px), heading and paragraphs with proper spacing

Visual check: Text is readable, proper contrast, responsive on resize

Stop server: Ctrl+C

**Step 4: Commit About component**

```bash
git add src/components/About.jsx src/App.jsx
git commit -m "feat: create About component with Atlas design tokens"
```

---

## Task 6: Create Contact Component

**Files:**
- Create: `src/components/Contact.jsx`

**Step 1: Create Contact component**

File: `src/components/Contact.jsx`

```jsx
import React from 'react'
import { Box, Stack, Inline, xcss } from '@atlaskit/primitives'

const contactStyles = xcss({
  paddingBlock: 'space.800',
  paddingInline: 'space.400',
  backgroundColor: 'color.background.accent.blue.subtlest',
})

const containerStyles = xcss({
  maxWidth: '800px',
  marginInline: 'auto',
})

const headingStyles = xcss({
  font: 'font.heading.large',
  color: 'color.text',
  marginBottom: 'space.300',
})

const textStyles = xcss({
  font: 'font.body.large',
  color: 'color.text',
})

const linkStyles = xcss({
  color: 'color.link',
  textDecoration: 'underline',
})

function Contact() {
  return (
    <Box xcss={contactStyles}>
      <Box xcss={containerStyles}>
        <Stack space="space.300">
          <Box xcss={headingStyles} as="h2">
            Get In Touch
          </Box>
          <Box xcss={textStyles} as="p">
            We'd love to hear from you. Reach out to us through any of the following channels:
          </Box>
          <Stack space="space.200">
            <Box xcss={textStyles} as="p">
              Email: <Box as="a" href="mailto:hello@example.com" xcss={linkStyles}>hello@example.com</Box>
            </Box>
            <Box xcss={textStyles} as="p">
              Phone: <Box as="span" xcss={textStyles}>+1 (555) 123-4567</Box>
            </Box>
            <Box xcss={textStyles} as="p">
              Address: <Box as="span" xcss={textStyles}>123 Main Street, City, State 12345</Box>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}

export default Contact
```

**Step 2: Import and use Contact in App**

File: `src/App.jsx`

```jsx
import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Contact from './components/Contact'

function App() {
  return (
    <div>
      <Hero />
      <About />
      <Contact />
    </div>
  )
}

export default App
```

**Step 3: Test Contact component**

Run:
```bash
npm run dev
```

Expected: Contact section displays at bottom with blue background (matching Hero), contact information visible, email link clickable and styled properly

Visual check: All sections flow together, consistent spacing, responsive layout

Stop server: Ctrl+C

**Step 4: Commit Contact component**

```bash
git add src/components/Contact.jsx src/App.jsx
git commit -m "feat: create Contact component with contact information"
```

---

## Task 7: Final Integration and Polish

**Files:**
- Modify: `index.html`
- Create: `README.md`

**Step 1: Update page title**

File: `index.html`

Find line with `<title>` and update:

```html
<title>Brand Awareness Landing Page</title>
```

**Step 2: Create project README**

File: `README.md`

```markdown
# React Atlas Landing Page

A brand awareness landing page built with React, Vite, and Atlassian Atlas Design System.

## Features

- Hero section with brand messaging
- About section with company information
- Contact section with contact details
- Built with Atlas Design System for consistent, accessible UI
- Responsive design

## Development

### Install dependencies
\`\`\`bash
npm install
\`\`\`

### Run development server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production
\`\`\`bash
npm run build
\`\`\`

### Preview production build
\`\`\`bash
npm run preview
\`\`\`

## Tech Stack

- **Vite** - Build tool and dev server
- **React** - UI framework
- **Atlas Design System** - Atlassian's design system
  - @atlaskit/css-reset - Base CSS reset
  - @atlaskit/tokens - Design tokens
  - @atlaskit/primitives - Core components

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx      # Hero section component
│   ├── About.jsx     # About section component
│   └── Contact.jsx   # Contact section component
├── App.jsx           # Main app component
└── main.jsx          # App entry point
```
```

**Step 3: Final verification**

Run:
```bash
npm run dev
```

Expected:
- Page title shows "Brand Awareness Landing Page" in browser tab
- All three sections render correctly
- No console errors
- Responsive at mobile (375px), tablet (768px), desktop (1024px+) widths

Test checklist:
- [ ] Hero displays with title and subtitle
- [ ] About section has readable content with proper spacing
- [ ] Contact section displays all contact information
- [ ] Email link is clickable
- [ ] Page is responsive on resize
- [ ] Atlas design tokens are applied (consistent spacing, colors, typography)
- [ ] No console warnings or errors

Stop server: Ctrl+C

**Step 4: Commit final changes**

```bash
git add index.html README.md
git commit -m "docs: update page title and add project README"
```

---

## Task 8: Build and Verify Production

**Files:**
- Create: `dist/` (via build)

**Step 1: Build for production**

Run:
```bash
npm run build
```

Expected: dist/ folder created with optimized production assets, shows bundle size stats

**Step 2: Preview production build**

Run:
```bash
npm run preview
```

Expected: Server starts (usually on port 4173), production build runs correctly, all sections render

Stop server: Ctrl+C

**Step 3: Final commit**

```bash
git add -A
git commit -m "chore: verify production build"
```

---

## Success Criteria Checklist

- [ ] Vite React project initialized and running
- [ ] Atlas dependencies installed (@atlaskit/css-reset, tokens, primitives)
- [ ] Hero component displays with Atlas styling
- [ ] About component displays with centered content
- [ ] Contact component displays with contact information
- [ ] All sections use Atlas design tokens consistently
- [ ] Responsive layout works on mobile, tablet, desktop
- [ ] No console errors or warnings
- [ ] Production build works correctly
- [ ] README documents how to run the project
- [ ] All changes committed to git

## Next Steps (Future Enhancements)

- Add more Atlas components (Buttons, Cards, etc.)
- Extract content to configuration files
- Add form component for contact
- Implement smooth scrolling between sections
- Add animations/transitions
- Deploy to hosting service (Vercel, Netlify, etc.)
