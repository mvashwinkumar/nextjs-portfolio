import Link from "next/link";

const HomePage = () => {
  const profile = {
    name: "Ashwin Kumar M V",
    role: "Principal Software Engineer",
    summary: "Crafting elegant solutions through clean code and thoughtful architecture. Over 9 years of experience in designing, developing and scaling web applications with cloud architecture and containerization.",
    coreTech: ["Cloud Architecture", "Full Stack", "DevOps", "Kubernetes", "MongoDB"],
    featuredWork: [
      {
        title: "Smart Lift Inspection Platform",
        description: "Cloud-based monitoring system for 200+ lifts with real-time anomaly detection",
        tech: ["Azure", "Kubernetes", "Event Hub", "MongoDB"],
        link: "/apps"
      },
      {
        title: "AI-Powered Facade Inspector",
        description: "Digital inspection platform with 3D modeling and automated defect detection",
        tech: ["Next.js", "Machine Learning", "3D Models"],
        link: "/apps"
      }
    ],
    recentPosts: [
      {
        title: "Cloud Cost Optimization Strategies",
        date: "March 2024",
        preview: "How we achieved 42% reduction in cloud costs while maintaining system reliability...",
        slug: "cloud-cost-optimization"
      },
      {
        title: "Building Event-Driven Systems at Scale",
        date: "February 2024",
        preview: "Lessons learned from implementing event-driven architecture for real-time monitoring...",
        slug: "event-driven-systems"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6 animate-fade-in">
            <div>
              <h1 className="text-4xl md:text-5xl font-light text-neutral-800 mb-4">
                {profile.name}
                <span className="block text-xl md:text-2xl text-neutral-600 mt-2 font-normal">
                  {profile.role}
                </span>
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed">
                {profile.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {profile.coreTech.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm text-neutral-600 hover:border-neutral-400 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="w-48 h-48 md:w-64 md:h-64 relative animate-fade-in-delayed">
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
              <img
                // src="/images/personal_logo.webp"
                src="/images/personal_logo_2.webp"
                alt="Ashwin Kumar M V"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 border-t border-neutral-200">
        <h2 className="text-2xl font-light text-neutral-800 mb-8">Featured Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.featuredWork.map((project, index) => (
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
                  <span key={tech} className="px-3 py-1 bg-neutral-50 rounded-full text-sm text-neutral-600">
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 border-t border-neutral-200">
        <h2 className="text-2xl font-light text-neutral-800 mb-8">Latest Thoughts</h2>
        <div className="space-y-6">
          {profile.recentPosts.map((post, index) => (
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
