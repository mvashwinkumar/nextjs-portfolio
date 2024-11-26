// src/app/apps/page.tsx
'use client';

import Link from 'next/link';
import { ShieldIcon, UsersIcon, SparklesIcon, LockIcon, UnlockIcon } from '@/components/icons';
import './styles.css';

interface AppCategory {
  title: string;
  icon: typeof ShieldIcon | typeof UsersIcon | typeof SparklesIcon;
  description: string;
  apps: {
    title: string;
    description: string;
    slug: string;
    tech: string[];
    status: 'live' | 'beta' | 'coming-soon';
    requiresAuth: boolean;
  }[];
}

const apps: AppCategory[] = [
  {
    title: "AI-Powered Tools",
    icon: SparklesIcon,
    description: "Leverage artificial intelligence to enhance your workflow",
    apps: [
      {
        title: "Schema Generator",
        description: "Generate Mongoose schemas with AI assistance and visual documentation",
        slug: "schema-generator",
        tech: ["OpenAI", "MongoDB", "Mermaid"],
        status: "coming-soon",
        requiresAuth: true
      },
      {
        title: "Document Q&A",
        description: "Upload documents and get instant answers using RAG technology",
        slug: "document-qa",
        tech: ["Vector DB", "LangChain", "PDF Processing"],
        status: "coming-soon",
        requiresAuth: true
      },
      {
        title: "Travel Itinerary Generator",
        description: "Create personalized travel plans with AI recommendations",
        slug: "travel-planner",
        tech: ["OpenAI", "Maps API", "RAG"],
        status: "coming-soon",
        requiresAuth: true
      }
    ]
  },
  {
    title: "Developer Tools",
    icon: ShieldIcon,
    description: "Tools for developers to streamline their workflow",
    apps: [
      {
        title: "Markdown Converter",
        description: "Convert Markdown to optimized static HTML with preview",
        slug: "markdown-converter",
        tech: ["Markdown", "HTML", "JavaScript"],
        status: "coming-soon",
        requiresAuth: true
      }
    ]
  },
  {
    title: "Community Tools",
    icon: UsersIcon,
    description: "Collaborative tools open for everyone",
    apps: [
      {
        title: "Image Analyzer",
        description: "Analyze images instantly with AI-powered insights",
        slug: "image-analyzer",
        tech: ["PWA", "Vision AI", "IndexedDB"],
        status: "coming-soon",
        requiresAuth: false
      },
      {
        title: "Collaborative Whiteboard",
        description: "Real-time collaborative drawing and brainstorming",
        slug: "whiteboard",
        tech: ["WebSocket", "Canvas API", "Real-time"],
        status: "coming-soon",
        requiresAuth: false
      },
      {
        title: "Tech News Aggregator",
        description: "Curated AI and tech news with personalized feeds",
        slug: "tech-news",
        tech: ["CrewAI", "Web Crawling", "RSS"],
        status: "coming-soon",
        requiresAuth: false
      }
    ]
  }
];

interface AppCardProps {
  app: {
    title: string;
    description: string;
    slug: string;
    tech: string[];
    status: 'live' | 'beta' | 'coming-soon';
    requiresAuth: boolean;
  };
}

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <Link
      href={`/apps/${ app.requiresAuth ? 'auth/' : 'open/' }${app.slug}`}
      className="group block p-6 bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl text-neutral-800 group-hover:text-neutral-600 transition-colors duration-300">
            {app.title}
          </h3>
          <div className="tooltip-wrapper" title={app.requiresAuth ? "Requires authentication" : "Free to use"}>
            {app.requiresAuth && (
              <LockIcon className="text-neutral-400 group-hover:text-neutral-600" />
            )}
          </div>
        </div>
        <span className={`
          px-2 py-1 text-xs rounded-full
          ${app.status === 'live' ? 'bg-green-100 text-green-800' : 
            app.status === 'beta' ? 'bg-yellow-100 text-yellow-800' :
            'bg-neutral-100 text-neutral-800'}
        `}>
          {app.status}
        </span>
      </div>
      <p className="text-neutral-600 mb-4">{app.description}</p>
      <div className="flex flex-wrap gap-2">
        {app.tech.map((tech: string) => (
          <span
            key={tech}
            className="px-3 py-1 bg-neutral-50 rounded-full text-sm text-neutral-600"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
};

const AppsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-light text-neutral-800 mb-4">
            Apps Portfolio
            <span className="block text-xl md:text-2xl text-neutral-600 mt-2 font-normal">
              A collection of tools and applications built with modern web technologies.
            </span>
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed flex items-center gap-2">
            Look for the 
            <LockIcon className="text-neutral-600" />
            icon to identify apps that require authentication.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-16 animate-fade-in-delayed">
          {apps.map((category, idx) => (
            <section key={idx} className="border-t border-neutral-200 pt-16">
              <div className="flex items-center gap-3 mb-8">
                <category.icon className="w-10 h-10 text-neutral-500" />
                <h2 className="text-2xl font-light text-neutral-800">
                  {category.title}
                </h2>
              </div>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                {category.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.apps.map((app, index) => (
                  <AppCard key={index} app={app} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppsPage;
