export default function AboutMe() {
    return (
        <section data-aos="fade-up"  className="min-h-screen bg-[#222324] text-white pt-16 px-4 md:px-8 lg:px-20 mt-2 rounded-lg">
      {/* <div className=" p-6 sm:p-8 rounded-lg shadow-2xl max-w-2xl mx-auto border border-gray-200 "> */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-6  text-white">About <span className="text-yellow-300">Me</span></h1>
        <p className="mb-6 text-gray-300 leading-relaxed text-sm sm:text-base">
          I'm a self-taught full stack developer with a strong drive for practical, hands-on learning. Though I excel academically,<br/> I chose to dive into real-world coding experiences rather than sticking solely to theoretical concepts.<br/>  Building applications from scratch,<br/>  I found that navigating real-world scenarios taught me more than textbooks ever could.<br/>  I thrive on solving real problems and bridging the gap between front-end visuals and back-end functionality.<br/>  This approach has allowed me to develop a deep understanding of the tools and technologies needed to create effective, user-friendly digital solutions.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-24 mt-20 text-[#9ca3af]">
          <div>
            <p className="font-semibold ">Phone:</p>
            <p className="">+91 8078355997</p>
          </div>
          <div>
            <p className="font-semibold ">Email:</p>
            <p className="">salihsha656@gmail.com</p>
          </div>
          <div>
            <p className="font-semibold ">LinkedIn:</p>
            <a href="https://linkedin.com/in/alflyvazad" className="text-blue-400 hover:text-blue-600">linkedin.com/in/salih</a>
          </div>
          <div>
            <p className="font-semibold ">Github:</p>
            <a href="https://github.com/m-h-d-salih" className="text-blue-400 hover:text-blue-600">github.com/m-h-d-salih</a>
          </div>
        </div>
        <div data-aos="fade-up" className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">1+</p>
            <p className="text-gray-600 text-sm sm:text-base">Years of Experience</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">5+</p>
            <p className="text-gray-600 text-sm sm:text-base">Completed Projects</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">2</p>
            <p className="text-gray-600 text-sm sm:text-base">Active Projects</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">150+</p>
            <p className="text-gray-600 text-sm sm:text-base">LeetCode Solved</p>
          </div>
        </div>
      {/* </div> */}
      </section>
    );
  }