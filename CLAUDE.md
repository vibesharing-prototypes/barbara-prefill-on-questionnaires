# Prefill on Questionnaires

## What this is

A React-based questionnaire builder and prefill system that allows users to intelligently populate form fields from previous questionnaires or uploaded data sources. The prototype includes smart field matching with confidence scoring, multiple prefill layout options (by person or by question), and side-by-side comparison views to validate data accuracy before submission.

## Key pages and components

- **Landing page** (`/`) – Hero section with feature overview and contact information
- **Questionnaire Builder** (`/questionnaire/:id`) – Main interface with tabs for building questions, configuring logic, managing prefill sources, and publishing
- **Prefill Tab** – Multiple layout options including smart matcher, source selector, individual-by-person view, individual-by-question view, and default prefill view
- **Comparison View** (`/questionnaire/:id/compare/:compareId`) – Side-by-side redline comparison of questionnaire responses with answer highlighting
- **Shared components** – Question cards, answer fields, confidence badges, participant chips for consistent UI across views

## Tech stack

- **React** with Vite (build tool)
- **Material-UI (MUI)** for component library and styling
- **React Router** for navigation
- **Context API** for state management (QuestionnaireContext)
- **Custom hooks** for questionnaire, prefill, comparison, and smart matching logic

## Current state

The prototype has a functional landing page, questionnaire builder with multiple tabs, prefill layout selector with various view modes, and a comparison interface with redline visualization. Mock data generators and sample participants/sources are in place. Documentation files outline features like smart matching, default values, and comparison improvements, though some advanced features may still be in planning stages.