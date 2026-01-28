"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Award,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

// --- DATA CERTIFICATES ---
const CERTIFICATES_DATA = [
  {
    id: 1,
    title: "React Developer Certification",
    issuer: "ID Camp, Dicoding",
    date: "March 2023",
    image: "/Images/certifications/Cert5.png",
    description:
      "Advanced React development with hooks, context, and modern patterns",
    skills: ["React", "Hooks", "Context API", "JSX"],
    credentialId: "IDC-REACT-2023-001",
  },
  {
    id: 2,
    title: "AWS Cloud Practitioner",
    issuer: "Dicoding",
    date: "June 2023",
    image: "/Images/certifications/Cert9.png",
    description: "Backend development with AWS services and cloud architecture",
    skills: ["AWS", "Node.js", "Express", "Cloud"],
    credentialId: "DCD-AWS-2023-002",
  },
  {
    id: 3,
    title: "JavaScript Fundamentals",
    issuer: "ID Camp, Dicoding",
    date: "January 2023",
    image: "/Images/certifications/Cert4.png",
    description: "Core JavaScript concepts and modern ES6+ features",
    skills: ["JavaScript", "ES6+", "DOM", "Async"],
    credentialId: "IDC-JS-2023-003",
  },
  {
    id: 4,
    title: "Frontend Web Development",
    issuer: "Dicoding",
    date: "November 2022",
    image: "/Images/certifications/Cert3.png",
    description:
      "Complete frontend development with modern tools and frameworks",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive"],
    credentialId: "DCD-FE-2022-004",
  },
  {
    id: 5,
    title: "Web Programming",
    issuer: "ID Camp, Dicoding",
    date: "October 2022",
    image: "/Images/certifications/Cert6.png",
    description:
      "Foundational web development using HTML, CSS, JavaScript, and best practices",
    skills: ["HTML", "CSS", "Web Fundamentals"],
    credentialId: "IDC-WEB-2022-005",
  },
  {
    id: 6,
    title: "AI for Beginners",
    issuer: "Dicoding",
    date: "July 2023",
    image: "/Images/certifications/Cert2.png",
    description:
      "Introduction to AI, supervised/unsupervised learning, and implementation",
    skills: ["AI", "Machine Learning", "Python"],
    credentialId: "DCD-AI-2023-006",
  },
  {
    id: 7,
    title: "Generative AI Developer",
    issuer: "Alibaba Cloud",
    date: "August 2023",
    image: "/Images/certifications/Cert1.png",
    description:
      "Generative AI development and cloud integration with Alibaba Cloud",
    skills: ["Generative AI", "Alibaba Cloud", "Model Deployment"],
    credentialId: "ALI-GAI-2023-007",
  },
  {
    id: 8,
    title: "Backend with AWS",
    issuer: "AWS Backend Academy",
    date: "September 2023",
    image: "/Images/certifications/Cert10.png",
    description: "Comprehensive backend using Node.js, Express, Hapi, and AWS",
    skills: ["Node.js", "Express", "AWS", "Hapi"],
    credentialId: "AWSJS-BACKEND-2023-008",
  },
  {
    id: 9,
    title: "Java Programming",
    issuer: "Dicoding",
    date: "October 2023",
    image: "/Images/certifications/Cert11.png",
    description:
      "Object-oriented programming in Java, collections, and algorithms",
    skills: ["Java", "OOP", "Data Structures"],
    credentialId: "DCD-JAVA-2023-009",
  },
  {
    id: 10,
    title: "Data Visualization",
    issuer: "Dicoding",
    date: "November 2023",
    image: "/Images/certifications/Cert8.png",
    description: "Visualizing data with Python using matplotlib and seaborn",
    skills: ["Data Viz", "Python", "Matplotlib"],
    credentialId: "DCD-VIZ-2023-010",
  },
  {
    id: 11,
    title: "Data Science Beginners",
    issuer: "Dicoding",
    date: "December 2023",
    image: "/Images/certifications/Cert7.png",
    description:
      "Data science foundations: statistics, data wrangling, and modeling",
    skills: ["Data Science", "Python", "Pandas"],
    credentialId: "DCD-DS-2023-011",
  },
];

export function Certifications() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-full bg-background overflow-hidden"
    >
      {/* --- BACKGROUND (Fixed) --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="absolute inset-0 bg-background/90 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-foreground/5 rounded-full blur-[120px]" />
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      <div className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth">
        <div className="min-h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            {/* Header */}
            <div
              className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="inline-flex items-center justify-center gap-2 mb-4 px-3 py-1 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-foreground" />
                <span className="text-sm font-medium tracking-wide uppercase text-foreground/80">
                  Achievements
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
                Professional{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/80 to-foreground/50">
                  Certifications
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Continuous learning and validation of skills through recognized
                certifications.
              </p>
            </div>

            {/* Certificates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CERTIFICATES_DATA.map((cert, index) => (
                <div
                  key={cert.id}
                  className={`group relative flex flex-col rounded-2xl border border-border/40 bg-background/30 backdrop-blur-sm overflow-hidden hover:border-foreground/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden bg-muted/50">
                    {/* Placeholder Icon jika gambar gagal load */}
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                      <Award className="w-12 h-12" />
                    </div>

                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />

                    {/* Credential ID Badge */}
                    <div className="absolute top-4 right-4 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="px-2 py-1 text-[10px] font-mono font-medium rounded-md bg-background/80 backdrop-blur border border-foreground/10 text-foreground/70">
                        {cert.credentialId}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow -mt-6 relative z-10">
                    {/* Issuer & Date */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-foreground/10 text-foreground/80">
                        <CheckCircle2 className="w-3 h-3" /> {cert.issuer}
                      </span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {cert.date}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-2 leading-tight group-hover:text-foreground/90 transition-colors">
                      {cert.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow line-clamp-2">
                      {cert.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30">
                      {cert.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold rounded bg-muted/50 text-muted-foreground border border-border/50 group-hover:border-foreground/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Spacer */}
            <div className="h-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
