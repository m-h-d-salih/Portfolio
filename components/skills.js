'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Play, Pause, Grid, Globe, Sparkles } from 'lucide-react';

export const skills = [
  { id: 1, name: 'NestJS', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg', level: 88, color: '#E0234E', desc: 'Enterprise Node.js Framework' },
  { id: 2, name: 'MongoDB', img: '/assets/mongoDB.png', level: 85, color: '#47A248', desc: 'NoSQL Document Database' },
  { id: 3, name: 'ExpressJS', img: '/assets/expressjs.png', level: 80, color: '#909090', desc: 'Fast Minimalist Web Framework' },
  { id: 4, name: 'ReactJS', img: 'https://techstack-generator.vercel.app/react-icon.svg', level: 92, color: '#61DAFB', desc: 'UI Component Library' },
  { id: 5, name: 'NodeJS', img: '/assets/node.png', level: 88, color: '#339933', desc: 'Asynchronous JavaScript Runtime' },
  { id: 6, name: 'NextJS', img: '/assets/nextjs.png', level: 92, color: '#FFFFFF', desc: 'React Production Framework' },
  { id: 7, name: 'JavaScript', img: '/assets/js.png', level: 90, color: '#F7DF1E', desc: 'Modern ES6+ Programming' },
  { id: 8, name: 'TypeScript', img: '/assets/ts.png', level: 85, color: '#3178C6', desc: 'Typed Superset of JavaScript' },
  { id: 9, name: 'PostgreSQL', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', level: 85, color: '#4169E1', desc: 'Advanced Relational SQL Database' },
  { id: 10, name: 'MySQL', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', level: 85, color: '#4479A1', desc: 'Relational Database Management' },
  { id: 11, name: 'Prisma', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg', level: 88, color: '#5A67D8', desc: 'Next-Generation Node.js & TS ORM' },
  { id: 12, name: 'Docker', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', level: 85, color: '#2496ED', desc: 'Containerization & App Delivery' },
  { id: 13, name: 'AWS', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', level: 80, color: '#FF9900', desc: 'Cloud Infrastructure & Services' },
  { id: 14, name: 'Nginx', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg', level: 82, color: '#009639', desc: 'High-Performance Web Server & Reverse Proxy' },
  { id: 15, name: 'Redux', img: 'https://techstack-generator.vercel.app/redux-icon.svg', level: 85, color: '#764ABC', desc: 'Predictable State Container' },
  { id: 16, name: 'Tailwind CSS', img: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg', level: 90, color: '#38BDF8', desc: 'Utility-First CSS Framework' },
  { id: 17, name: 'Bootstrap', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', level: 80, color: '#7952B3', desc: 'Responsive Frontend Framework' },
  { id: 18, name: 'Git', img: '/assets/git.png', level: 88, color: '#F05032', desc: 'Distributed Version Control' },
  { id: 19, name: 'GitHub', img: '/assets/github.png', level: 85, color: '#FFFFFF', desc: 'Code Hosting & CI/CD Pipeline' },
  { id: 20, name: 'HTML & CSS', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', level: 95, color: '#E34F26', desc: 'Core Web Standards' }
];

export default function Skills() {
  const [viewMode, setViewMode] = useState('globe'); // 'globe' | 'grid'
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isAutoSpin, setIsAutoSpin] = useState(true);

  // Globe 3D state refs
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rotationRef = useRef({ x: 0.15, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0.003 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  // Overlay node DOM elements, updated imperatively every frame so the
  // 60fps globe rotation doesn't force a full React re-render (that was
  // causing all 20 skill cards + their <Image>s to recommit every tick).
  const nodeElRefs = useRef({});

  // Fibonacci sphere distribution for a rounded 3D globe
  const baseNodes3D = useMemo(() => {
    const total = skills.length;
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    const goldenAngle = 2 * Math.PI * (1 - 1 / phi);

    return skills.map((skill, i) => {
      const y = 1 - (i / (total - 1 || 1)) * 2; // -1 to 1
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      return { ...skill, x0: x, y0: y, z0: z };
    });
  }, []);

  // Connect nodes to nearest neighbors to create narrow connected mesh edges
  const edges = useMemo(() => {
    const list = [];
    const n = baseNodes3D.length;
    if (n < 2) return list;

    for (let i = 0; i < n; i++) {
      const distances = [];
      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        const dx = baseNodes3D[i].x0 - baseNodes3D[j].x0;
        const dy = baseNodes3D[i].y0 - baseNodes3D[j].y0;
        const dz = baseNodes3D[i].z0 - baseNodes3D[j].z0;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        distances.push({ index: j, dist });
      }
      distances.sort((a, b) => a.dist - b.dist);

      // Connect each node to 2-3 closest neighbors for balanced mesh
      const nearestCount = Math.min(2, distances.length);
      for (let k = 0; k < nearestCount; k++) {
        const j = distances[k].index;
        if (i < j) {
          list.push({ from: i, to: j });
        }
      }
    }
    return list;
  }, [baseNodes3D]);

  // 3D Rendering & Animation Loop
  useEffect(() => {
    if (viewMode !== 'globe') return;

    let mounted = true;

    const render = () => {
      if (!mounted) return;

      const container = containerRef.current;
      const canvas = canvasRef.current;

      if (container && canvas) {
        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const dpr = window.devicePixelRatio || 1;
        if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
          canvas.width = width * dpr;
          canvas.height = height * dpr;
        }

        const ctx = canvas.getContext('2d');
        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, width, height);

        // Auto spin & inertia physics
        if (!isDraggingRef.current) {
          if (isAutoSpin) {
            rotationRef.current.y += 0.0025;
          }
          rotationRef.current.x += velocityRef.current.x;
          rotationRef.current.y += velocityRef.current.y;
          velocityRef.current.x *= 0.94;
          velocityRef.current.y *= 0.94;
        }

        // Clamp pitch angle so globe stays upright and rounded
        rotationRef.current.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, rotationRef.current.x));

        const rotX = rotationRef.current.x;
        const rotY = rotationRef.current.y;

        // Expanded sphere radius for maximum width & visibility
        const sphereRadius = Math.min(width, height) * 0.38;
        const centerX = width / 2;
        const centerY = height / 2;

        const projectedNodes = baseNodes3D.map((node) => {
          // Y rotation
          const x1 = node.x0 * Math.cos(rotY) + node.z0 * Math.sin(rotY);
          const z1 = -node.x0 * Math.sin(rotY) + node.z0 * Math.cos(rotY);
          const y1 = node.y0;

          // X rotation
          const y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
          const z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);
          const x2 = x1;

          const fov = 700;
          const scale = fov / (fov - z2 * sphereRadius);
          const px = centerX + x2 * sphereRadius * scale;
          const py = centerY + y2 * sphereRadius * scale;

          return {
            ...node,
            px,
            py,
            scale,
            normZ: z2,
          };
        });

        // Draw narrow edges on canvas
        edges.forEach(({ from, to }) => {
          const n1 = projectedNodes[from];
          const n2 = projectedNodes[to];

          if (!n1 || !n2) return;

          const avgZ = (n1.normZ + n2.normZ) / 2;
          const isHighlighted =
            hoveredSkill && (hoveredSkill.id === n1.id || hoveredSkill.id === n2.id);

          const depthOpacity = Math.max(0.08, (avgZ + 1) / 2);
          const lineAlpha = isHighlighted ? 0.95 : depthOpacity * 0.4;
          const lineWidth = isHighlighted ? 2.2 : 1.1;

          ctx.beginPath();
          ctx.moveTo(n1.px, n1.py);
          ctx.lineTo(n2.px, n2.py);

          if (isHighlighted) {
            const grad = ctx.createLinearGradient(n1.px, n1.py, n2.px, n2.py);
            grad.addColorStop(0, n1.color || '#EAB308');
            grad.addColorStop(1, n2.color || '#EAB308');
            ctx.strokeStyle = grad;
            ctx.shadowColor = '#EAB308';
            ctx.shadowBlur = 10;
          } else {
            ctx.strokeStyle = `rgba(234, 179, 8, ${lineAlpha})`;
            ctx.shadowBlur = 0;
          }

          ctx.lineWidth = lineWidth;
          ctx.stroke();
        });

        ctx.restore();

        // Update overlay card positions directly on the DOM (no setState)
        projectedNodes.forEach((node) => {
          const el = nodeElRefs.current[node.id];
          if (!el) return;

          const isFront = node.normZ > -0.2;
          const nodeScale = Math.max(0.55, Math.min(1.2, node.scale * (0.75 + (node.normZ + 1) * 0.25)));
          const nodeOpacity = Math.max(0.25, Math.min(1.0, (node.normZ + 1.2) / 2.2));
          const zIndex = Math.round((node.normZ + 1) * 100);

          const isHovered = hoveredSkill?.id === node.id;
          const isConnectedToHovered =
            hoveredSkill &&
            edges.some(
              (e) =>
                (baseNodes3D[e.from]?.id === hoveredSkill.id && baseNodes3D[e.to]?.id === node.id) ||
                (baseNodes3D[e.to]?.id === hoveredSkill.id && baseNodes3D[e.from]?.id === node.id)
            );

          el.style.transform = `translate3d(-50%, -50%, 0) translate(${node.px}px, ${node.py}px) scale(${
            isHovered ? nodeScale * 1.25 : nodeScale
          })`;
          el.style.opacity = isHovered || isConnectedToHovered ? 1 : nodeOpacity;
          el.style.zIndex = isHovered ? 999 : zIndex;
          el.style.pointerEvents = isFront || isHovered ? 'auto' : 'none';
        });
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      mounted = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [viewMode, baseNodes3D, edges, hoveredSkill, isAutoSpin]);

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX || e.touches?.[0]?.clientX || 0,
      y: e.clientY || e.touches?.[0]?.clientY || 0,
    };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
    const clientY = e.clientY || e.touches?.[0]?.clientY || 0;

    const dx = clientX - dragStartRef.current.x;
    const dy = clientY - dragStartRef.current.y;

    const rotSpeed = 0.004;
    rotationRef.current.y += dx * rotSpeed;
    rotationRef.current.x += dy * rotSpeed;

    velocityRef.current = { x: dy * rotSpeed * 0.3, y: dx * rotSpeed * 0.3 };
    dragStartRef.current = { x: clientX, y: clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const resetCamera = () => {
    rotationRef.current = { x: 0.15, y: 0 };
    velocityRef.current = { x: 0, y: 0.003 };
  };

  return (
    <section
      id="skills"
      data-aos="fade-up"
      className="min-h-screen bg-[#222324] text-white pt-10 pb-16 px-4 md:px-8 lg:px-12 rounded-lg my-3 shadow-2xl relative overflow-hidden select-none"
    >
      {/* Subtle Background Glow matching section background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-gray-800 pb-5 relative z-10">
        <div>
          <p className="text-4xl md:text-5xl tracking-wider font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
            SKILLS
          </p>
          <p className="text-gray-400 text-xs md:text-sm mt-1">
            Interactive 3D Skill Network • Drag to orbit the globe
          </p>
        </div>

        {/* View Switcher & Controls */}
        <div className="flex items-center gap-3">
          {viewMode === 'globe' && (
            <>
              <button
                onClick={() => setIsAutoSpin(!isAutoSpin)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                  isAutoSpin
                    ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40 hover:bg-yellow-500/30'
                    : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                }`}
              >
                {isAutoSpin ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isAutoSpin ? 'Spinning' : 'Paused'}
              </button>

              <button
                onClick={resetCamera}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </>
          )}

          <div className="flex bg-[#222324] p-1 rounded-lg border border-gray-800">
            <button
              onClick={() => setViewMode('globe')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                viewMode === 'globe'
                  ? 'bg-yellow-500 text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              3D Globe
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-yellow-500 text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* Main 3D Globe Container (Exact same background #222324 as parent section) */}
      {viewMode === 'globe' ? (
        <div
          ref={containerRef}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          className="relative w-full h-[680px] md:h-[760px] lg:h-[820px] bg-[#222324] rounded-2xl border border-gray-800/80 cursor-grab active:cursor-grabbing overflow-hidden shadow-2xl flex items-center justify-center"
        >
          {/* Canvas for rendering narrow connected network lines */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

          {/* HTML overlay skill node cards */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {baseNodes3D.map((node) => {
              const isHovered = hoveredSkill?.id === node.id;
              const isConnectedToHovered =
                hoveredSkill &&
                edges.some(
                  (e) =>
                    (baseNodes3D[e.from]?.id === hoveredSkill.id && baseNodes3D[e.to]?.id === node.id) ||
                    (baseNodes3D[e.to]?.id === hoveredSkill.id && baseNodes3D[e.from]?.id === node.id)
                );

              return (
                <div
                  key={node.id}
                  ref={(el) => {
                    nodeElRefs.current[node.id] = el;
                  }}
                  onMouseEnter={() => setHoveredSkill(node)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => setHoveredSkill(node)}
                  className="absolute left-0 top-0 transition-transform duration-75 ease-out cursor-pointer group"
                  style={{ pointerEvents: 'none' }}
                >
                  <div
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl backdrop-blur-md transition-all duration-300 border ${
                      isHovered
                        ? 'bg-[#222324] border-yellow-400 shadow-[0_0_25px_rgba(234,179,8,0.5)] ring-2 ring-yellow-400/50'
                        : isConnectedToHovered
                        ? 'bg-[#222324]/95 border-yellow-500/60 shadow-[0_0_15px_rgba(234,179,8,0.25)]'
                        : 'bg-[#222324]/90 border-gray-700/60 shadow-lg hover:border-gray-500'
                    }`}
                  >
                    {/* Icon */}
                    <div className="relative w-7 h-7 md:w-8 md:h-8 flex-shrink-0 flex items-center justify-center bg-black/40 rounded-lg p-1 border border-gray-800">
                      <Image
                        src={node.img}
                        alt={node.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                        unoptimized
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Skill Name & Level Bar */}
                    <div className="flex flex-col">
                      <span className="text-xs md:text-sm font-bold text-white whitespace-nowrap tracking-wide flex items-center gap-1.5">
                        {node.name}
                     
                      </span>
                      <div className="w-16 bg-gray-800 h-1.5 rounded-full overflow-hidden mt-1 border border-gray-700/50">
                        <div
                          style={{
                            width: `${node.level}%`,
                            backgroundColor: node.color || '#EAB308',
                          }}
                          className="h-full rounded-full transition-all duration-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Skill Tooltip Card */}
          <AnimatePresence>
            {hoveredSkill && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 p-4 rounded-xl bg-[#222324]/95 backdrop-blur-xl border border-yellow-500/40 shadow-2xl z-50 pointer-events-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 p-1.5 rounded-lg bg-black/60 border border-gray-800 flex items-center justify-center">
                    <Image
                      src={hoveredSkill.img}
                      alt={hoveredSkill.name}
                      width={36}
                      height={36}
                      className="w-full h-full object-contain"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      {hoveredSkill.name}
                    </h4>
                    <p className="text-xs text-gray-400">{hoveredSkill.desc}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-300">Proficiency Level</span>
                    <span className="text-yellow-400">{hoveredSkill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden p-0.5 border border-gray-700">
                    <div
                      style={{ width: `${hoveredSkill.level}%`, backgroundColor: hoveredSkill.color || '#EAB308' }}
                      className="h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint Overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-gray-800 text-[11px] text-gray-400 pointer-events-none">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
            Drag to orbit 3D globe
          </div>
        </div>
      ) : (
        /* Grid View Fallback */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, translateY: -4 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col justify-between p-5 bg-[#222324] rounded-xl border border-gray-800 hover:border-yellow-500/50 shadow-lg hover:shadow-yellow-500/10 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 p-2 bg-black/60 rounded-lg border border-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Image
                      src={skill.img}
                      alt={skill.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                      unoptimized
                    />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors flex items-center gap-2">
                  {skill.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{skill.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-800">
                <div className="flex justify-between text-xs font-semibold text-gray-300 mb-1.5">
                  <span>Proficiency</span>
                  <span className="text-yellow-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden border border-gray-700/60">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    style={{ backgroundColor: skill.color || '#EAB308' }}
                    className="h-full rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
