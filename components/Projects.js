
import Image from 'next/image';

const projects = [
  {
    title: 'E-commerce',
    description: 'From printed pages to portable screens',
    imageUrl: '/assets/ecommerce.png',
    projectUrl: '#',
  },
  {
    title: 'Pickme',
    description: 'From printed pages to portable screens',
    imageUrl: '/assets/pickme.png',
    projectUrl: '#',
  },
//   {
//     title: 'Portfolio',
//     description: 'Classic design meets modern functionality',
//     imageUrl: '/path-to-your-image/portfolio.png',
//     projectUrl: '#',
//   },
];

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen bg-[#222324] text-white pt-16 mt-10 px-4 md:px-8 lg:px-20 rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-center mb-12">
          Featured Projects
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="max-w-sm bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-gray-300">{project.description}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
