# Prefill on Questionnaires

## What this is

A React-based questionnaire builder and prefill system that allows users to intelligently populate form fields using data from previous questionnaires or uploaded sources. The system includes smart field matching with confidence scoring, multiple prefill layout options (by person, by question, or default view), and side-by-side comparison of questionnaire responses. It's designed for workflows where users need to reuse and compare data across multiple questionnaire instances.

## Key pages and components

- **Landing page** (`/`) — Hero section, feature overview, and contact information
- **Questionnaire Builder** (`/questionnaire/:id`) — Main interface with four tabs:
  - Building Tab — Create and edit questions
  - Prefill Tab — Configure prefill sources and select layout (default, by person, by question)
  - Logic Tab — Set up conditional logic
  - Publishing Tab — Publish questionnaire
- **Questionnaire Comparison** (`/questionnaire/:id/compare/:compareId`) — Side-by-side redline view of two questionnaires with answer differences highlighted
- **Smart Matcher** — Automatic field matching component with confidence badges
- **Source Selector** — Choose prefill data from participants or uploaded files
- **Shared components** — Question cards, answer fields, participant chips, confidence badges

## Tech stack

- **React** with React Router for navigation
- **Material-UI (MUI)** for component library and styling
- **Vite** as build tool
- **ESLint** for code quality
- Custom hooks for state management (useQuestionnaire, usePrefillSource, useSmartMatcher, useComparison)

## Current state

The core prefill and comparison features are implemented with mock data; the builder, logic, and publishing tabs appear to be structural placeholders. The smart matching algorithm, layout switching, and comparison redline views are functional.