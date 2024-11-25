type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  highlights: string[];
  metrics?: string[];
};

type BiographyData = {
  name: string;
  role: string;
  summary: string;
  linkedin: string;
  skills: {
    [key: string]: string[];
  };
  experience: ExperienceItem[];
  education: Array<{
    institution: string;
    degree: string;
    achievement?: string;
  }>;
};

const bioData: BiographyData = {
  name: "Ashwin Kumar M V",
  role: "Principal Software Engineer",
  summary: "Full-stack engineer with over 9 years of experience in designing, developing, and scaling web applications. Specializing in cloud architecture and containerization.",
  linkedin: "mvashwinkumar",
  skills: {
    "Core": ["Cloud Architecture", "Full-stack Development", "DevOps", "System Design"],
    "Technologies": ["React/Next.js", "Node.js", "MongoDB", "Kubernetes", "Azure"]
  },
  experience: [
    {
      company: "TÜV SÜD Asia Pacific Pte Ltd",
      role: "Principal Engineer",
      period: "2021 - Present",
      highlights: [
        "Led development of smart lift inspection platform monitoring 200+ lifts",
        "Developed AI-powered facade inspection system",
        "Supporting Gates Foundation funded projects with Sanitation Services dept",
        "Guiding junior developers and standardizing CI/CD processes"
      ],
      metrics: [
        "Achieved 42% reduction in cloud costs",
        "Maintained near-zero downtime for critical systems",
        "Streamlined development processes across project teams"
      ]
    },
    {
      company: "AXA Insurance Pte Ltd",
      role: "Assistant Manager",
      period: "2018 - 2021",
      highlights: [
        "Led New Retail Platform development",
        "Enhanced platform to scalable async architecture",
        "Optimized core pricing compiler reducing turnaround time from weeks to days",
        "Integrated platform with external commercial partners"
      ]
    },
    {
      company: "Eatigo Singapore Pte Ltd",
      role: "Frontend Engineer",
      period: "2017 - 2018",
      highlights: [
        "Developed Admin Portal for back-office operations",
        "Reviewed and optimized consumer website"
      ]
    },
    {
      company: "Fuji Xerox Asia Pacific Pte Ltd",
      role: "Senior Software Engineer",
      period: "2014 - 2017",
      highlights: [
        "Implemented core features in native Address book",
        "Optimized question answering application with ML models"
      ]
    }
  ],
  education: [
    {
      institution: "National University of Singapore",
      degree: "Graduate Diploma in IT Systems Analysis",
      achievement: "Second best in class, ISS Booker Prize recipient"
    },
    {
      institution: "National Institute of Technology, Rourkela",
      degree: "B.Tech in Electrical Engineering",
      achievement: "Graduated with honors"
    }
  ]
};

export default function BioPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 py-8 space-y-8">
      {/* Hero Section */}
      <section className="space-y-4">
        <div className="flex items-baseline gap-3">
          <h1 className="text-4xl font-light text-neutral-800">{bioData.name}</h1>
          <a href={`https://linkedin.com/in/${bioData.linkedin}`} 
             className="text-neutral-600 hover:text-neutral-900"
             aria-label="LinkedIn Profile">
            {/* load linkedin image from images folder */}
            <img src="/images/linkedin.svg" alt="LinkedIn Profile" width="20" height="20" />
          </a>
        </div>
        <span className="block text-xl text-neutral-600">{bioData.role}</span>
        <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl">
          {bioData.summary}
        </p>
      </section>

      {/* Skills Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-light text-neutral-800">Technical Expertise</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(bioData.skills).map(([category, skills]) => (
            <div key={category} className="bg-white p-4 rounded-lg border border-neutral-200">
              <h3 className="text-sm font-medium text-neutral-800 mb-2">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="text-sm text-neutral-600">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-light text-neutral-800">Experience</h2>
        <div className="space-y-6">
          {bioData.experience.map((exp, index) => (
            <div 
              key={exp.company} 
              className={`space-y-2 ${index > 0 ? `opacity-${Math.max(85 - index * 10, 60)}` : ''}`}
            >
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-medium text-neutral-800">
                  {exp.company}
                </h3>
                <span className="text-neutral-600">{exp.period}</span>
              </div>
              <p className="text-neutral-600 font-medium">{exp.role}</p>
              <ul className="space-y-1">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="text-neutral-600">{highlight}</li>
                ))}
                {exp.metrics?.map((metric, i) => (
                  <li key={i} className="text-neutral-600 font-medium">{metric}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-light text-neutral-800">Education</h2>
        <div className="space-y-4">
          {bioData.education.map((edu) => (
            <div key={edu.institution} className="space-y-1">
              <h3 className="text-lg font-medium text-neutral-800">
                {edu.institution}
              </h3>
              <p className="text-neutral-600">{edu.degree}</p>
              {edu.achievement && (
                <p className="text-neutral-600 text-sm">{edu.achievement}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
