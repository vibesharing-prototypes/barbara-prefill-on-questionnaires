# React Landing Page with Atlas Design System

**Date:** 2026-03-12
**Purpose:** Brand awareness and information landing page
**Status:** Design approved

## Overview

A single-page React application built with Vite and Atlassian's Atlas Design System, focused on brand awareness and information delivery.

## Architecture

### Tech Stack
- **Build Tool:** Vite 5.x
- **Framework:** React 18.x
- **UI Library:** Atlassian Atlas Design System (@atlaskit)
- **Styling:** Atlas design tokens + component styles

### Project Structure
```
project/
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── vite.config.js
```

### Setup Strategy
1. Initialize Vite React project
2. Install Atlas core packages (@atlaskit/css-reset, @atlaskit/tokens, component packages)
3. Create component-based architecture (no routing needed)
4. Use Atlas components for consistent design

## Components & Content Structure

### Hero Component
- Full-width section with centered content
- Atlas Heading component for main title
- Atlas Text component for subtitle/tagline
- Optional Atlas Button for primary CTA
- Uses Atlas spacing and color tokens

### About Component
- Content section with Atlas Section wrapper
- Heading + descriptive text
- Uses Atlas typography scale and spacing tokens

### Contact Component
- Simple contact information display
- Atlas Button or links
- Atlas spacing for consistent layout

### App Component (Main Layout)
- Renders Hero → About → Contact in sequence
- Wraps with @atlaskit/css-reset for baseline styles
- No complex state management (static content)

### Styling Approach
- Use Atlas design tokens (token() from @atlaskit/tokens)
- Minimal custom CSS (Atlas components handle styling)
- Responsive by default

## Data Flow & State Management

### Content Management
- Static content defined in components
- Props passed from App to children for customization
- No global state management needed

### Future Extensibility
- Content can be extracted to config files later
- Component structure allows easy section additions

## Error Handling & Testing

### Error Handling
- Minimal needed (static content, no API calls)
- Atlas components handle internal error states

### Testing Strategy
- Manual browser testing during development
- Visual verification of Atlas components
- Responsive testing at different screen sizes
- No automated tests initially

### Development Workflow
- `npm run dev` for local development with HMR
- Browser testing at localhost
- `npm run build` for production builds

## Key Design Decisions

1. **Vite over CRA:** Modern, fast, React team recommended
2. **Single page, no routing:** Simplifies architecture for landing page
3. **Atlas components:** Consistent design, accessibility built-in
4. **Static content:** No API calls or state management complexity
5. **Component composition:** Easy to extend with new sections

## Success Criteria

- Landing page renders with Hero, About, and Contact sections
- Uses Atlas components and design tokens throughout
- Responsive across mobile/tablet/desktop
- Fast load times (Vite optimization)
- Clean, maintainable component structure
