'use client'
import About from '@/components/about'
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
    </div>
  )
}

export default Page
