'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const experiences = [
  {
    type: 'work',
    title: 'Software Engineer',
    place: 'Ergon Technologies (Oil & Gas)',
    duration: 'Apr 2025 - Present',
    icon: Briefcase,
    points: [
      'Leading full-stack development across multiple internal platforms in a 3-person dev team using React, Next.js, Express.js, and MySQL',
      'Initiating and building the CRM module from scratch and contributing across all core modules — HRMS, LMS, Finance, Purchase, and offshore/onshore project management within Jupiter ERP',
      'Designing database schemas and optimizing SQL queries across modules to improve data retrieval and backend performance',
      'Implementing role-based access control, audit logging, rate limiting, and session management to meet enterprise security standards',
      'Building the Inventory Utilization PWA as a solo developer for real-time resource tracking across operational sites',
      'Developing the admin panel for the company website and contributing to the user-facing side using Next.js',
    ],
  },
  {
    type: 'work',
    title: 'MERN Stack Developer Intern',
    place: 'Bridgeon Solutions',
    duration: 'Mar 2024 - Mar 2025',
    icon: Briefcase,
    points: [
      'Built scalable web applications using React.js, Node.js, Express.js, and MongoDB, improving performance and engagement by 20%',
      'Optimized MongoDB schemas and integrated RESTful APIs, enhancing data flow efficiency by 25%',
      'Created responsive UIs with Tailwind CSS and participated in code reviews to reduce production bugs',
    ],
  },
  {
    type: 'education',
    title: 'Bachelor of Computer Application',
    place: 'LBS Model Degree College',
    duration: 'Oct 2021 - Mar 2024',
    icon: GraduationCap,
    points: [],
  },
];

function ExperienceCard({ item, index }) {
  const Icon = item.icon;
  const isLeft = index % 2 === 0;
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 95%', 'start 45%'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <div
      ref={cardRef}
      className="relative flex items-start md:items-center pl-12 md:pl-0"
    >
      {/* Dot on the line */}
      <motion.div
        style={{ opacity }}
        className="absolute left-4 md:left-1/2 top-1 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-yellow-400 border-4 border-[#222324] shadow-[0_0_10px_rgba(234,179,8,0.8)] z-10"
      />

      {/* Card */}
      <motion.div
        style={{ y, opacity, scale }}
        className={`w-full md:w-1/2 ${
          isLeft ? 'md:pr-14 md:text-right md:ml-0' : 'md:pl-14 md:ml-auto'
        }`}
      >
        <div className="inline-block w-full md:w-auto md:min-w-[420px] md:max-w-xl bg-gray-900/60 border border-gray-800 hover:border-yellow-500/50 rounded-xl p-6 shadow-lg hover:shadow-yellow-500/10 transition-colors">
          <div
            className={`flex items-center gap-2 text-yellow-400 text-xs font-semibold mb-2 ${
              isLeft ? 'md:justify-end' : ''
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{item.duration}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">{item.title}</h3>
          <p className="text-sm text-yellow-500/80 mb-3">{item.place}</p>

          {item.points.length > 0 && (
            <ul
              className={`space-y-2 text-sm text-gray-400 leading-relaxed ${
                isLeft ? 'md:text-right' : 'text-left'
              }`}
            >
              {item.points.map((point, i) => (
                <li key={i} className={isLeft ? 'md:flex md:flex-row-reverse md:gap-2' : 'flex gap-2'}>
                  <span className="text-yellow-500 shrink-0">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.75', 'end 0.55'],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      data-aos="fade-up"
      className="min-h-screen bg-[#222324] text-white pt-16 pb-24 px-4 md:px-8 lg:px-20 mt-2 rounded-lg"
    >
      <h1 className="text-3xl sm:text-4xl font-bold mb-16 text-white">
        Experience <span className="text-yellow-300">&amp; Education</span>
      </h1>

      <div ref={sectionRef} className="relative max-w-6xl mx-auto">
        {/* Center scroll-driven yellow line */}
        <motion.div
          style={{ scaleY: lineScale, transformOrigin: 'top' }}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[4px] md:-translate-x-1/2 bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-600 shadow-[0_0_14px_rgba(234,179,8,0.7)] rounded-full"
        />
        {/* Faint track behind the animated line so full height is visible */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[4px] md:-translate-x-1/2 bg-gray-800/60 rounded-full -z-10" />

        <div className="flex flex-col gap-20 md:gap-28">
          {experiences.map((item, index) => (
            <ExperienceCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
