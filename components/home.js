'use client'
import React from 'react';
import Image from 'next/image'; // ✅ Import Next.js Image component
import { DownloadIcon } from 'lucide-react';

const HomePage = () => {
  return (
    <section data-aos="fade-up"  className="min-h-screen bg-[#222324] text-white pt-10 px-4 md:px-8 lg:px-16 rounded-lg">
      {/* Navigation indicator */}
      <div className="flex items-center gap-2 text-sm mb-16">
        <span className="text-yellow-400">🏠</span>
        <span className="text-gray-400">INTRODUCTION</span>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left side content */}
        <div className="lg:w-1/2">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Hey There,</h1>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            I'm <span className="text-yellow-400">Mohammed Salih</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            I'm a <span className="text-white">Full Stack Developer</span> blending creativity and logic to build digital spaces where every detail counts.
          </p>
          
          {/* Download CV button */}
          <button className="bg-transparent hover:bg-yellow-400 text-yellow-400 hover:text-black 
            font-semibold py-3 px-6 border-2 border-yellow-400 hover:border-transparent 
            rounded-full transition-all duration-300 flex items-center gap-2 group">
            Download CV
            <DownloadIcon size={20} className="transition-transform duration-300 group-hover:translate-y-1" />
          </button>
        </div>

        {/* Right side image */}
        <div className="lg:w-1/2 relative">
          <div className="relative w-full aspect-[3/4] max-w-md mx-auto">
            {/* Yellow frame */}
            <div className="absolute z-10 inset-0 border-[3px] border-yellow-400 transform rotate-6 scale-105 "></div>
            
            {/* Image using Next.js Image component */}
            <Image 
              src="/assets/image.jpg" // ✅ Use relative path
              alt="Professional portrait" 
              width={400} // ✅ Set width & height
              height={500} 
              className="w-full h-full object-cover grayscale"
            />
            
            {/* Yellow triangle decoration */}
            <div className="absolute -right-2 z-10 bottom-4 w-full h-full border-[3px] border-yellow-400 transform -rotate-6"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
