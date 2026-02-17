# Portfolio Website 🌐

![image](https://github.com/user-attachments/assets/1ff84c05-8e91-4c47-b7db-e71f2a927809)

Welcome to my personal portfolio website repository!

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Live Demo](#live-demo)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Cloning the Repository](#cloning-the-repository)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Contributing](#contributing)
- [License](#license)
- [Connect With Me](#connect-with-me)
- [Acknowledgements](#acknowledgements)

## Introduction

This project showcases my skills, projects, and experience through an interactive and visually engaging web application. Built with modern web technologies and packed with micro-animations, 3D elements, and thoughtful UI details, it's designed to leave a lasting impression.

## Features

- **Resizable Navbar**: A sleek, responsive navigation bar with desktop nav items, a "Book a Call" CTA, and a fully animated mobile hamburger menu.
- **Animated Hero Section**: Eye-catching introduction featuring a rotating role badge (Software Developer, Full-Stack Engineer, Open Source Contributor, Industry Evangelist), a gradient name reveal, and a shimmer tagline — all powered by Framer Motion.
- **Bento Grid**: Modern layout presenting personal information with cutting-edge CSS design techniques for a clean and professional look.
- **Experience Timeline**: Professional background displayed as an interactive vertical timeline with hover-activated link previews that show company logos and details.
- **3D Project Cards**: Projects showcased using interactive 3D tilt cards with tech-stack icon lists and live-site links, plus a moving-border "Check my GitHub" button.
- **Coding Profiles**: A compare-slider section for platforms like GitHub, LeetCode, CodeChef, and Coding Ninjas — slide to reveal platform stats behind each logo, with direct profile links.
- **Articles (Draggable Cards)**: Published articles presented as draggable, physics-based cards scattered across a canvas. Drag to explore, click to read.
- **Interview Playbooks**: Curated interview prep guides rendered as an interactive book-flip component with a subtle background glow effect.
- **Canvas Effect**: Innovative use of HTML5 canvas to create visually striking effects in the "Approach" section, adding a unique touch to the presentation.
- **MemeCat (Mini Anon)**: An interactive cat mascot that falls onto the page, roams the screen edges, and mumbles random thoughts. Click to open a Q&A modal where "Mini Anon" answers questions about me — complete with a "Buy me pet food" link.
- **Footer with Floating Dock & Text Flip**: A contact-focused footer featuring animated text flipping ("digital presence", "business goals", "tech stack", "user experience"), a floating social-media dock (GitHub, Twitter, LinkedIn, YouTube, Medium), and a magic "Let's get in touch" button.
- **Responsiveness**: Fully mobile-optimized — compact cards, touch-friendly interactions, and adaptive layouts across all screen sizes.

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) | React framework for SSR, SSG, and optimized web apps |
| [Three.js](https://threejs.org/) | 3D graphics and interactive globe rendering |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | Declarative Three.js via React components |
| [@react-three/drei](https://github.com/pmndrs/drei) | Ready-made helpers for React Three Fiber |
| [Framer Motion](https://www.framer.com/motion/) | Animations, transitions, and gesture handling |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework for responsive design |
| [React Icons](https://react-icons.github.io/react-icons/) | Popular icon packs as React components |
| [Tabler Icons](https://tabler.io/icons) | Premium SVG icons via `@tabler/icons-react` |
| [Sentry](https://sentry.io/) | Error monitoring and performance tracking |

## Live Demo

You can view the live version of my portfolio website at:  
[Visit my Portfolio 🌐↗](https://tushar-bhardwaj.vercel.app/)

**Portfolio & Code Walkthrough (Loom):**  
[Watch the Full Walkthrough ↗](https://www.loom.com/share/382db90115bd48a9ac9c4c2e4d5bf5ff)

## Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:

- **Git**
- **Node.js** (v18+)
- **npm** (Node Package Manager)

### Cloning the Repository

```bash
git clone https://github.com/TuShArBhArDwA/Latest-Portfolio.git
cd Latest-Portfolio
```

### Installation

Install the project dependencies:

```bash
npm install
```

### Running the Project

Start the development server:

```bash
npm run dev
```

Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the project.

## Project Structure

```
├── app/                  # Next.js app directory (pages, layout, global styles)
├── components/           # All React components
│   ├── ui/               # Reusable UI primitives (28 components)
│   │   ├── 3d-card.tsx           # 3D tilt card effect
│   │   ├── book-flip.tsx         # Book flip component
│   │   ├── compare.tsx           # Image compare slider
│   │   ├── draggable-card.tsx    # Physics-based draggable cards
│   │   ├── floating-dock.tsx     # Animated floating icon dock
│   │   ├── layout-text-flip.tsx  # Text flip animation
│   │   ├── link-preview.tsx      # Hover link preview popup
│   │   ├── moving-border.tsx     # Animated border button
│   │   ├── resizable-navbar.tsx  # Responsive navbar
│   │   ├── Spotlight.tsx         # Spotlight gradient effect
│   │   ├── Timeline.tsx          # Vertical timeline
│   │   └── ...                   # And more
│   ├── Hero.tsx              # Animated hero section
│   ├── Experience.tsx        # Work experience timeline
│   ├── RecentProjects.tsx    # 3D project cards
│   ├── CodingProfiles.tsx    # Coding platform profiles
│   ├── Articles.tsx          # Draggable article cards
│   ├── InterviewPlaybooks.tsx# Interview prep book-flip
│   ├── Approach.tsx          # Canvas-based approach section
│   ├── MemeCat.tsx           # Interactive cat mascot
│   ├── NavbarWrapper.tsx     # Navbar with mobile support
│   ├── Footer.tsx            # Footer with floating dock
│   └── Grid.tsx              # Bento grid layout
├── data/                 # Static data (projects, experience, profiles, etc.)
├── hooks/                # Custom React hooks
├── public/               # Static assets (images, icons, GIFs)
├── utils/                # Utility functions
└── tailwind.config.ts    # Extended Tailwind configuration
```

## Contributing

Feel free to fork this repository and submit pull requests if you have suggestions or improvements. For bug reports or feature requests, please open an issue.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Connect with Me

If you'd like to connect, feel free to reach out — [Click here](https://minianonlink.vercel.app/tusharbhardwaj)

### Acknowledgements

Thank you to all the open-source projects and tools that made this portfolio possible. Special thanks to the developers of Next.js, Three.js, React Three Fiber, Framer Motion, and Tailwind CSS.
