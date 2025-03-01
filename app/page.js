'use client'
import About from '@/components/about'
import Contact from '@/components/Contact'
import HomePage from '@/components/home'
import Projects from '@/components/Projects'
import Skills from '@/components/skills'
import React from 'react'

const Page = () => {
  return (
    <div>
      <HomePage/>
      <About/>
      <Skills/>
      <Projects/>
      <Contact/>
    </div>
  )
}

export default Page
