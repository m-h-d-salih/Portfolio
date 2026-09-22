'use client'
import About from '@/components/about'
import Contact from '@/components/Contact'
import Experience from '@/components/Experience'
import HomePage from '@/components/home'
import Projects from '@/components/Projects'
import Skills from '@/components/skills'
import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Page = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });

    // Sections below the hero (3D globe, canvas skill map) finish loading
    // after AOS's first pass and shift page layout, which can leave
    // AOS's cached trigger offsets stale and content stuck at opacity 0.
    // Re-measure once everything (images, fonts) has actually loaded.
    const refresh = () => AOS.refresh();
    window.addEventListener('load', refresh);
    const timeout = setTimeout(refresh, 500);

    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      <HomePage/>
      <About/>
      <Experience/>
      <Skills/>
      <Projects/>
      <Contact/>
    </div>
  )
}

export default Page
