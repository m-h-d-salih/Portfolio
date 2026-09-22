"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "Treasure Account Portal",
    description: "Freelance project built for a psychiatric clinic to manage patient accounts and records.",
    imageUrl: "/assets/tressureappointmentportal.png",
    projectUrl: "https://treasure-appointment-portal.vercel.app/",
    tags: ["Next.js", "Supabase", "TypeScript", "Ant Design"],
  },
  {
    title: "Pickme",
    description: "From printed pages to portable screens",
    imageUrl: "/assets/pickme.png",
    projectUrl: "https://github.com/m-h-d-salih",
    tags: ["PostgreSQL", "Express.js", "Node.js", "Next.js"],
  },
  {
    title: "Review Tracker",
    description: "Tracks reviews and progress of software engineering learning students, giving mentors a clear view of each student's growth.",
    imageUrl: "/assets/reviewtracker.png",
    projectUrl: "https://review-tracker-nine.vercel.app/",
    tags: ["Next.js", "Supabase", "TypeScript"],
  },
  {
    title: "Wooden",
    description: "From printed pages to portable screens",
    imageUrl: "/assets/wooden.png",
    projectUrl: "https://wooden-mu.vercel.app/",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
  },
  {
    title: "AI Skin Expert",
    description: "From printed pages to portable screens",
    imageUrl: "/assets/ai skin.png",
    projectUrl: "https://github.com/m-h-d-salih",
    tags: ["MySQL", "Django", "React.js", "Python"],
  },
]

const Projects = () => {
  const targetRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)

  useEffect(() => {
    const updateDistance = () => {
      if (trackRef.current) {
        setDistance(trackRef.current.scrollWidth - window.innerWidth)
      }
    }
    updateDistance()
    window.addEventListener("resize", updateDistance)
    return () => window.removeEventListener("resize", updateDistance)
  }, [])

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  // Dwell at the first and last card for a beat before handing scroll
  // off to the neighboring sections, instead of cutting away mid-motion.
  const x = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 0, -distance, -distance])

  return (
    <section
      ref={targetRef}
      id="projects"
      className="relative bg-gradient-to-b mt-3 from-[#1a1b1d] to-[#222324] text-white rounded-lg"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-12 px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
            Featured Projects
          </span>
          <span className="block text-xs md:text-sm font-normal text-gray-400 mt-3 tracking-wide">
            Scroll to explore
          </span>
        </motion.h2>

        <motion.div ref={trackRef} style={{ x }} className="flex gap-8 pl-4 md:pl-20 pr-[10vw] w-max items-start">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative flex flex-col w-[85vw] sm:w-[68vw] md:w-[46vw] lg:w-[38vw] shrink-0 rounded-2xl overflow-hidden border border-gray-800 hover:border-yellow-500/50 bg-[#1a1b1d] shadow-xl transition-colors"
            >
              {/* Screenshot, shown in full without cropping */}
              <div className="relative w-full aspect-video bg-black shrink-0">
                <Image
                  src={project.imageUrl || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 38vw, (min-width: 640px) 68vw, 85vw"
                />

                {/* Giant index number */}
                <span className="absolute top-3 right-4 text-5xl md:text-6xl font-extrabold text-white/10 select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-white/10 border border-white/10 text-gray-200 text-[10px] md:text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white">{project.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">{project.description}</p>

                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-2 self-start bg-yellow-500 text-black text-sm font-semibold py-2 px-4 rounded-full hover:bg-yellow-400 transition-colors"
                >
                  View Project
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
