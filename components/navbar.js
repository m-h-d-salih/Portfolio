'use client'
import React, { useState } from 'react'
import Button from './button'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { title: 'Home', href: '#' },
    { title: 'About', href: '#' },
    { title: 'Education', href: '#' },
    { title: 'Skill', href: '#' }
  ]

  return (
    <nav className="mx-4 my-4">
      <div className="w-full sm:w-[600px] lg:w-[1500px] bg-[#D9D9D9] rounded-lg p-4 relative transition-all duration-300 ease-in-out mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <h1 className="text-2xl sm:text-2xl lg:text-3xl font-medium font-alkatra hover:scale-105 transition-transform duration-300">
            Portfolio
          </h1>

          {/* Desktop/Tablet Menu */}
          <div className="hidden sm:block">
            <ul className="flex gap-3 lg:gap-5 font-alkatra text-sm lg:text-base">
              {menuItems.map((item) => (
                <li 
                  key={item.title}
                  className="hover:text-gray-600 cursor-pointer transition-colors duration-300 hover:-translate-y-1"
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Button (Desktop/Tablet) */}
          <div className="hidden sm:block">
            <Button />
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`
            sm:hidden 
            absolute 
            right-0
            mt-2
            w-48
            bg-[#D9D9D9] 
            rounded-lg 
            shadow-lg 
            transition-all 
            duration-300 
            ease-in-out
            ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
          `}
        >
          <ul className="p-4 space-y-3 font-alkatra">
            {menuItems.map((item) => (
              <li 
                key={item.title}
                className="hover:text-gray-600 cursor-pointer transition-colors duration-300 hover:translate-x-2"
              >
                {item.title}
              </li>
            ))}
          </ul>
          <div className="p-4">
            <Button />
          </div>
        </div>     
      </div>
    </nav>
  )
}

export default Navbar