'use client'
import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Lightbulb, Monitor, MessageCircle, Phone, Share2, Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = windowWidth < 1024;

  const navItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: User, label: 'Profile', id: 'about' },
    { icon: Briefcase, label: 'Experience', id: 'experience' },
    { icon: Lightbulb, label: 'Skills', id: 'skills' },
    { icon: Monitor, label: 'Projects', id: 'projects' },
    { icon: MessageCircle, label: 'Messages', id: 'contact' },
    { icon: Phone, label: 'Contact', id: 'contact' },
    { icon: Share2, label: 'Share', id: 'contact' }
  ];

  // Dynamically update activeSection based on scroll position
  useEffect(() => {
    const sectionIds = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (!id) return;
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isSmallScreen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button - Only show below 1024px */}
      {isSmallScreen && (
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-black/90 text-white 
            hover:bg-black/70 transition-all duration-300 ease-in-out"
        >
          {isMobileOpen ? (
            <X size={24} className="transition-transform duration-300 rotate-90 hover:rotate-180" />
          ) : (
            <Menu size={24} className="transition-transform duration-300 hover:rotate-180" />
          )}
        </button>
      )}

      {/* Backdrop - Only show on mobile/tablet when menu is open */}
      {isSmallScreen && isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-screen bg-black/95 text-white z-40
          transition-all duration-300 ease-in-out
          ${isSmallScreen ? (isMobileOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
          ${isExpanded ? 'w-56' : 'w-16'}
          flex flex-col items-center py-32`}
        onMouseEnter={() => !isSmallScreen && setIsExpanded(true)}
        onMouseLeave={() => !isSmallScreen && setIsExpanded(false)}
      >
        <nav className="flex-1 w-full px-2">
          <ul className="space-y-3">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <li key={index} className="relative">
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full p-3 flex items-center gap-3
                      hover:bg-white/10 rounded-lg transition-all duration-200
                      ${isActive ? 'bg-white/10' : ''}
                      group`}
                  >
                    <div className={`min-w-[24px] flex justify-center items-center
                      ${isActive ? 'animate-pulse' : ''}`}
                    >
                      <Icon 
                        size={20} 
                        className={`transition-transform duration-300 
                          ${isActive ? 'text-yellow-400 scale-110' : 'text-white group-hover:scale-110'}
                          ${isExpanded ? 'group-hover:rotate-0' : 'group-hover:rotate-12'}`}
                      />
                    </div>
                    
                    <span 
                      className={`whitespace-nowrap transition-all duration-300
                        ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                        ${isActive ? 'text-yellow-400' : 'text-white'}`}
                    >
                      {item.label}
                    </span>

                    {/* Tooltip - only show on non-expanded state and non-mobile */}
                    {!isExpanded && !isSmallScreen && (
                      <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-sm
                        rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible
                        transition-all duration-200 pointer-events-none whitespace-nowrap">
                        {item.label}
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;