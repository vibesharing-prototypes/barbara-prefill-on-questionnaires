# Atlas Landing Page

A modern landing page built with React, Vite, and Diligent's Atlas Design System.

## Features

- **Hero Section**: Eye-catching hero with brand colors
- **About Section**: Three-column grid showcasing key features
- **Contact Section**: Contact information and details
- **Atlas Design System**: Built with Diligent's Atlas React Bundle for consistent, accessible UI

## Tech Stack

- **React 19**: Modern React with hooks
- **Vite 7**: Fast build tool and dev server
- **Atlas Design System**: Diligent's Atlas Design System (MUI-based)
  - @diligentcorp/atlas-react-bundle
  - @mui/material
  - @emotion/react

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx      # Hero section component
│   ├── About.jsx     # About section component
│   └── Contact.jsx   # Contact section component
├── App.jsx           # Main app component
└── main.jsx          # Entry point with AtlasThemeProvider
```

## Code Quality

- ESLint configured with React rules
- Follows Atlas Design System best practices
- Accessible and responsive design
- Material-UI components with Atlas theming

## License

MIT
