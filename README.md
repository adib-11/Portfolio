# Md. Adib Hasan Portfolio

A modern, animation-rich developer portfolio built with React, TypeScript, and Vite.

## Live Demo

- Website: [https://adib-11.github.io/Portfolio/](https://adib-11.github.io/Portfolio/)
- Repository: [https://github.com/adib-11/Portfolio](https://github.com/adib-11/Portfolio)

## Overview

This project is a single-page portfolio focused on strong visual hierarchy, smooth interaction design, and polished presentation of selected work, milestones, and technical background.

It combines custom UI components with motion systems (GSAP + Framer Motion), smooth-scrolling behavior (Lenis), and responsive layouts optimized for both desktop and mobile experiences.

## Key Features

- Animated hero section with dynamic typography and background media.
- Smooth section navigation with a custom pill-style navbar.
- Project showcase with iPhone mockups and detail modals.
- Milestone timeline with modal-based deep dives.
- Explorations gallery with scroll-based parallax effects.
- GitHub activity section and education carousel.
- Reusable design primitives and custom interaction components.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- GSAP + ScrollTrigger
- Lenis
- Lucide React + React Icons

## Project Structure

```text
.
├── public/                  # Static assets (projects, milestones, logos, explorations)
├── src/
│   ├── components/          # UI sections and reusable interactive components
│   ├── utils/               # Utility helpers
│   ├── App.tsx              # Page composition and lazy loading
│   ├── index.css            # Theme tokens and global styles
│   └── main.tsx             # Application entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
git clone https://github.com/adib-11/Portfolio.git
cd Portfolio
npm install
```

### Run Development Server

```bash
npm run dev
```

The app runs on:

- Local: `http://localhost:3000`
- Network: `http://0.0.0.0:3000`

## Available Scripts

- `npm run dev` - Start Vite development server.
- `npm run build` - Create production build.
- `npm run preview` - Preview production build locally.
- `npm run lint` - Type-check with TypeScript (`tsc --noEmit`).
- `npm run clean` - Remove build artifacts from `dist`.
- `npm run predeploy` - Build with GitHub Pages base path.
- `npm run deploy` - Publish `dist` to GitHub Pages.

## Deployment

Deployment targets GitHub Pages. The deploy flow is:

1. Build with base path: `npm run predeploy`
2. Publish build output: `npm run deploy`

## Screenshots

Project screenshots and demo visuals can be added here.

## Contact

- GitHub: [@adib-11](https://github.com/adib-11)
- LinkedIn: [Md. Adib Hasan](https://linkedin.com/in/adibhasan11)
- Email: iamadib120775@gmail.com
