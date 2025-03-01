"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const projects = [
  {
    title: "Pickme",
    description: "From printed pages to portable screens",
    imageUrl: "/assets/pickme.png",
    projectUrl: "https://github.com/m-h-d-salih",
    tags: ["Node.js", "Express", "PostgreSQL","Next.js"],
  },
  {
    title: "E-commerce",
    description: "From printed pages to portable screens",
    imageUrl: "/assets/ecommerce.png",
    projectUrl: "https://github.com/m-h-d-salih/furniture-E-commerce",
    tags: ["React", "Node.js", "MongoDB","Express.js"],
  },
  {
    title: "AI Skin Expert",
    description: "From printed pages to portable screens",
    imageUrl: "/assets/ai skin.png",
    projectUrl: "https://github.com/m-h-d-salih",
    tags: ["React.js", "Django", "MySQL","Python"],
  },
  // {
  //   title: "LinkedIn UI",
  //   description: "From printed pages to portable screens",
  //   imageUrl: "/assets/linkedin.png",
  //   projectUrl: "https://github.com/m-h-d-salih",
  //   tags: ["HTML", "CSS"],
  // },
]

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section 
    // data-aos="fade-up" 
      id="projects"
      className="min-h-screen bg-gradient-to-b mt-3 from-[#1a1b1d] to-[#222324] text-white py-20 px-4 md:px-8 lg:px-20"
    >
      <div className="container mx-auto">
        <motion.h2
          className="text-5xl font-extrabold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
            Featured Projects
          </span>
        </motion.h2>
        <div 
        // data-aos="fade-up"
         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative overflow-hidden group">
                <Image
                  src={project.imageUrl || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded-full hover:bg-yellow-400 transition-colors duration-300"
                  >
                    View Project
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gray-700 text-gray-200 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

