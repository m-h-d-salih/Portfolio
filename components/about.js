import Image from 'next/image';
import { Phone, Mail, Linkedin, Github } from 'lucide-react';

const stats = [
  { value: '2+', label: 'Years of Experience' },
  { value: '15+', label: 'Completed Projects' },
  { value: '4', label: 'Active Projects' },
  { value: '270+', label: 'LeetCode Solved' },
];

const contactItems = [
  { icon: Phone, label: 'Phone', value: '+91 8078355997', href: 'tel:+918078355997' },
  { icon: Mail, label: 'Email', value: 'salihsha656@gmail.com', href: 'mailto:salihsha656@gmail.com' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/mohammed-salih', href: 'https://www.linkedin.com/in/mohammed-salih-7571062b1/' },
  { icon: Github, label: 'Github', value: 'github.com/m-h-d-salih', href: 'https://github.com/m-h-d-salih' },
];

const gallery = ['/assets/dsa 1.jpg', '/assets/dsa 2.jpg', '/assets/dsa 3.jpg'];

export default function AboutMe() {
  return (
    <section
      id="about"
      data-aos="fade-up"
      className="min-h-screen bg-[#222324] text-white pt-16 pb-16 px-4 md:px-8 lg:px-20 mt-2 rounded-lg"
    >
      <p className="text-xs sm:text-sm tracking-[0.3em] text-gray-500 mb-2 font-semibold">
        GET TO KNOW ME
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold mb-12">
        About{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
          Me
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
        {/* Bio + stats */}
        <div className="lg:col-span-3">
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-10">
            I&apos;m a self-taught full stack developer with a strong drive for practical, hands-on
            learning. Though I excel academically, I chose to dive into real-world coding
            experiences rather than sticking solely to theoretical concepts. Building applications
            from scratch, I found that navigating real-world scenarios taught me more than
            textbooks ever could. I thrive on solving real problems and bridging the gap between
            front-end visuals and back-end functionality. This approach has allowed me to develop a
            deep understanding of the tools and technologies needed to create effective,
            user-friendly digital solutions.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-900/60 border border-gray-800 hover:border-yellow-500/50 rounded-xl p-4 text-center shadow-lg hover:shadow-yellow-500/10 transition-all"
              >
                <p className="text-2xl sm:text-3xl font-extrabold text-yellow-400">{stat.value}</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact card */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-5 text-white">Contact Info</h3>
            <div className="space-y-4">
              {contactItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-black/40 border border-gray-800 group-hover:border-yellow-500/50 group-hover:bg-yellow-500/10 transition-colors">
                      <Icon className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-gray-500 uppercase tracking-wide">{item.label}</p>
                      <p className="text-sm text-gray-300 group-hover:text-yellow-400 transition-colors truncate">
                        {item.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Snapshots gallery — fills the empty space at the bottom of the section */}
      <div className="mt-16">
        <p className="text-xs sm:text-sm tracking-[0.3em] text-gray-500 mb-5 font-semibold">
          BEYOND THE SCREEN
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {gallery.map((src, index) => (
            <div
              key={index}
              className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-500/50 shadow-lg transition-colors"
            >
              <Image
                src={src}
                alt={`Snapshot ${index + 1}`}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                sizes="(min-width: 640px) 33vw, 100vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
