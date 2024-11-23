import React from 'react';
// import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8">
          {/* Text Content */}
          <div className="flex-1 space-y-6 animate-fade-in">
            <div>
              <h1 className="text-4xl md:text-5xl font-light text-neutral-800 mb-4">
                Ashwin Kumar M V
                <span className="block text-xl md:text-2xl text-neutral-600 mt-2 font-normal">
                  Software Engineer
                </span>
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Crafting elegant solutions through clean code and thoughtful architecture. 
                Focused on building scalable web applications with modern technologies.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-3 pt-4">
              {['TypeScript', 'React', 'Node.js', 'Next.js', 'MongoDB'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm text-neutral-600 hover:border-neutral-400 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="w-48 h-48 md:w-64 md:h-64 relative animate-fade-in-delayed">
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
              <img
                src="/api/placeholder/400/400"
                alt="Ashwin Kumar M V"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 border-t border-neutral-200">
        <h2 className="text-2xl font-light text-neutral-800 mb-8">Featured Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Project Alpha',
              description: 'A scalable microservices architecture powering enterprise solutions',
              tech: ['Next.js', 'TypeScript', 'MongoDB'],
              link: '/apps'
            },
            {
              title: 'Project Beta',
              description: 'Real-time data visualization platform for analytics',
              tech: ['React', 'Node.js', 'WebSocket'],
              link: '/apps'
            }
          ].map((project, index) => (
            <Link
              href={project.link}
              key={index}
              className="group p-6 bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-xl text-neutral-800 mb-2 group-hover:text-neutral-600 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-neutral-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-neutral-50 rounded-full text-sm text-neutral-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Blog Posts Preview */}
      <section className="max-w-4xl mx-auto px-4 py-16 border-t border-neutral-200">
        <h2 className="text-2xl font-light text-neutral-800 mb-8">Latest Thoughts</h2>
        <div className="space-y-6">
          {[
            {
              title: 'Building Scalable Applications with Next.js 14',
              date: 'March 2024',
              preview: 'Exploring the latest features and best practices...',
              slug: 'building-scalable-applications'
            },
            {
              title: 'The Art of Clean Code: Principles and Patterns',
              date: 'February 2024',
              preview: 'Understanding the fundamentals of writing maintainable code...',
              slug: 'art-of-clean-code'
            }
          ].map((post, index) => (
            <Link
              href={`/blog/${post.slug}`}
              key={index}
              className="block group"
            >
              <div className="text-sm text-neutral-500 mb-1">{post.date}</div>
              <h3 className="text-lg text-neutral-800 group-hover:text-neutral-600 transition-colors duration-300">
                {post.title}
              </h3>
              <p className="text-neutral-600">{post.preview}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
