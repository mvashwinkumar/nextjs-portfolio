
# Personal Website

A performance-optimized personal branding website built with Next.js 14 and MongoDB.

## Features
- Dynamic content management
- Performance optimization
- Responsive design
- Blog system
- Portfolio showcase

## Tech Stack
- Next.js 14+
- TypeScript
- MongoDB
- TailwindCSS

## Setup
1. Clone repository
2. Copy `.env.example` to `.env`
3. Install dependencies: `npm install`
4. Run development server: `npm run dev`

## Performance Optimizations
- Static generation
- Image optimization
- MongoDB connection pooling
- Caching layers

#Apps file structure
```bash
src/
├── app/
│   ├── apps/
│   │   ├── page.tsx                     # Main apps listing page
│   │   ├── layout.tsx                   # Apps section layout with auth handling
│   │   ├── auth/                        # Authenticated apps
│   │   │   ├── schema-generator/
│   │   │   │   ├── page.tsx
│   │   │   │   └── components/
│   │   │   ├── markdown-converter/
│   │   │   │   ├── page.tsx
│   │   │   │   └── components/
│   │   │   ├── document-qa/
│   │   │   │   ├── page.tsx
│   │   │   │   └── components/
│   │   │   └── travel-planner/
│   │   │       ├── page.tsx
│   │   │       └── components/
│   │   └── open/                        # Guest access apps
│   │       ├── image-analyzer/
│   │       │   ├── page.tsx
│   │       │   └── components/
│   │       ├── whiteboard/
│   │       │   ├── page.tsx
│   │       │   └── components/
│   │       └── tech-news/
│   │           ├── page.tsx
│   │           └── components/
│   └── api/                             # API routes for the apps
│       └── apps/
│           ├── auth/                    # Authenticated endpoints
│           └── open/                    # Public endpoints
├── components/
│   └── apps/                           # Shared components for apps
└── lib/
    └── apps/                           # Shared utilities for apps
```