'use client'
import Image from 'next/image';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

export const skills = [
  { id: 2, name: 'MongoDB', img: '/assets/mongoDB.png', level: 85 },
  { id: 5, name: 'ExpressJS', img: '/assets/expressjs.png', level: 80 },
  { id: 3, name: 'ReactJS', img: 'https://techstack-generator.vercel.app/react-icon.svg', level: 92 },
  { id: 4, name: 'NodeJS', img: '/assets/node.png', level: 88 },
  { id: 3, name: 'NextJS', img: '/assets/nextJs.png', level: 92 },
  { id: 1, name: 'JavaScript', img: '/assets/js.png', level: 90 },
  { id: 6, name: 'TypeScript', img: '/assets/ts.png', level: 75 },
  { id: 7, name: 'Redux', img: 'https://techstack-generator.vercel.app/redux-icon.svg', level: 85 },
  // { id: 8, name: 'HTML & CSS', img: '/assets/htmlcss.png', level: 95 },
  { id: 9, name: 'Tailwind CSS', img: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg', level: 90 },
  { id: 10, name: 'Bootstrap', img: 'https://vetores.org/d/bootstrap.svg', level: 80 },
  { id: 11, name: 'GitHub', img: '/assets/github.png', level: 85 },
  { id: 12, name: 'Git', img: '/assets/git.png', level: 88 },
];

const Skills = () => {
  // Initialize AOS on mount
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-in-out',
    });
  }, []);

  return (
    // <section id="skills" className="w-full lg:h-screen flex flex-col pt-20 items-center justify-center bg-gradient-to-b  from-black via-gray-900 to-black">
    <section id="skills" data-aos="fade-up"  className=" min-h-screen bg-[#222324] mt-3 text-white pt-10 px-4 md:px-8 lg:px-16 rounded-lg">
      <p 
        data-aos="fade-up" 
        className="text-5xl lg:text-5xl tracking-wider font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
      >
        SKILLS
      </p>

      <div className="flex gap-6 flex-wrap justify-center items-center lg:px-20 mt-10">
        {skills.map((skill) => (
          <div 
            key={skill.id} 
            data-aos="fade-up" // AOS effect on scroll
            data-aos-anchor-placement="bottom-bottom"
            className="flex flex-col items-center justify-center h-48 w-56  bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl p-4"
          >
            {/* Skill Image */}
            <Image
              src={skill.img}
              alt={skill.name}
              width={80}
              height={80}
              className="w-20 h-20 object-contain"
            />

            {/* Skill Name */}
            <p className="mt-2 text-white text-lg font-semibold">{skill.name}</p>

            {/* Animated Progress Bar */}
            <div className="w-full bg-gray-800 h-2.5 rounded-full mt-3 overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="bg-yellow-500 h-full rounded-full"
              ></motion.div>
            </div>
           
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
