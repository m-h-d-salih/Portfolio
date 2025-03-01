'use client'
import React, { useState, useEffect } from 'react';
import { Home, User, RefreshCcw,Lightbulb, Monitor, MessageCircle, Phone, Share2, Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
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

  // Define breakpoint for tablet/mobile
  const isSmallScreen = windowWidth < 1024;

  const navItems = [
    { icon: Home, label: 'Home', isActive: true },
    { icon: User, label: 'Profile' },
    { icon: Lightbulb, label: 'Skills' },
    { icon: Monitor, label: 'Projects' },
    { icon: MessageCircle, label: 'Messages' },
    { icon: Phone, label: 'Contact' },
    { icon: Share2, label: 'Share' }
  ];

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
              return (
                <li key={index} className="relative">
                  <button
                    className={`w-full  p-3 flex items-center gap-3
                      hover:bg-white/10 rounded-lg transition-all duration-200
                      ${item.isActive ? 'bg-white/10' : ''}
                      group`}
                  >
                    <div className={`min-w-[24px] flex justify-center items-center
                      ${item.isActive ? 'animate-pulse' : ''}`}
                    >
                      <Icon 
                        size={20} 
                        className={`transition-transform duration-300 
                          ${item.isActive ? 'text-yellow-400 scale-110' : 'text-white group-hover:scale-110'}
                          ${isExpanded ? 'group-hover:rotate-0' : 'group-hover:rotate-12'}`}
                      />
                    </div>
                    
                    <span 
                      className={`whitespace-nowrap transition-all duration-300
                        ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                        ${item.isActive ? 'text-yellow-400' : 'text-white'}`}
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