'use client'
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import toast from 'react-hot-toast';
import { User, Mail, MessageSquare, Send, MapPin } from 'lucide-react';

const Contact = () => {
  const earthContainerRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to send message.');
      }

      toast.success("Message sent! I'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '' });
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const container = earthContainerRef.current;
    if (!container) return;

    let cleanup = () => {};
    let cancelled = false;

    // The container can still be 0x0 on first paint (layout not settled
    // yet), which makes Three.js throw on camera.aspect / renderer.setSize
    // and crash the whole tree. Wait for a real size before initializing.
    const observer = new ResizeObserver((entries) => {
      if (cancelled) return;
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        observer.disconnect();
        cleanup = initEarth(container, width, height);
      }
    });

    observer.observe(container);

    return () => {
      cancelled = true;
      observer.disconnect();
      cleanup();
    };
  }, []);

  function initEarth(container, containerWidth, containerHeight) {
    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, containerWidth / containerHeight, 0.1, 1000);
    camera.position.z = 2.2; // Moved camera back slightly to accommodate larger Earth

    // Setup renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Clear container and append renderer
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Create Earth sphere - larger size (1.2 instead of 1)
    const geometry = new THREE.SphereGeometry(1.2, 64, 64);
    
    // Create a more realistic Earth appearance
    const material = new THREE.MeshPhongMaterial({
      map: createEarthTexture(),
      bumpScale: 0.05,
      specular: new THREE.Color(0x333333),
      shininess: 5,
    });
    
    const earth = new THREE.Mesh(geometry, material);
    
    // Create cloud layer
    const cloudGeometry = new THREE.SphereGeometry(1.22, 32, 32);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: createCloudTexture(),
      transparent: true,
      opacity: 0.4
    });
    
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    earth.add(clouds);
    
    // Add atmosphere glow
    const glowGeometry = new THREE.SphereGeometry(1.32, 32, 32);
    const glowMaterial = new THREE.MeshPhongMaterial({
      color: 0x93cfef,
      transparent: true,
      opacity: 0.10,
      side: THREE.BackSide
    });
    
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    scene.add(earth);

    // Handle window resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let rafId = null;
    let stopped = false;
    const animate = () => {
      if (stopped) return;
      rafId = requestAnimationFrame(animate);
      earth.rotation.y += 0.002;
      clouds.rotation.y += 0.0025;
      renderer.render(scene, camera);
    };
    animate();

    // Handle cleanup
    return () => {
      stopped = true;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      scene.remove(earth);
      scene.remove(glow);
      geometry.dispose();
      material.dispose();
      cloudGeometry.dispose();
      cloudMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      renderer.dispose();
    };
  }

  // Function to create procedural Earth texture
  function createEarthTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Ocean base
    ctx.fillStyle = '#0077be';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Generate continents
    const continents = [
      // North America
      {x: 220, y: 200, width: 200, height: 160, color: '#228B22'},
      // South America
      {x: 300, y: 350, width: 120, height: 140, color: '#228B22'},
      // Africa
      {x: 500, y: 250, width: 170, height: 200, color: '#A0522D'},
      // Europe
      {x: 500, y: 180, width: 100, height: 80, color: '#228B22'},
      // Asia
      {x: 650, y: 180, width: 250, height: 170, color: '#228B22'},
      // Australia
      {x: 780, y: 370, width: 110, height: 90, color: '#A0522D'},
      // Antarctica
      {x: 400, y: 450, width: 300, height: 50, color: '#F0F8FF'}
    ];
    
    continents.forEach(continent => {
      ctx.fillStyle = continent.color;
      ctx.beginPath();
      // Create irregular shapes for continents
      const points = [];
      const numPoints = 20;
      
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const radius = continent.width / 2 * (0.8 + Math.random() * 0.4);
        const x = continent.x + continent.width / 2 + Math.cos(angle) * radius;
        const y = continent.y + continent.height / 2 + Math.sin(angle) * radius * (continent.height / continent.width);
        points.push({x, y});
      }
      
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();
      ctx.fill();
    });
    
    // Add some noise for texture
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 2;
      ctx.fillStyle = `rgba(0,0,0,0.2)`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }
  
  // Function to create cloud texture
  function createCloudTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Transparent background
    ctx.fillStyle = 'rgba(255,255,255,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Generate cloud patterns
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = 10 + Math.random() * 30;
      const opacity = 0.1 + Math.random() * 0.4;
      
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  return (
    <section
      id="contact"
      data-aos="fade-up"
      className="min-h-screen bg-[#222324] mt-3 text-white pt-16 pb-16 px-4 md:px-8 lg:px-16 rounded-lg relative overflow-hidden"
    >
      {/* Subtle background glow, matching Skills' treatment */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <p className="text-xs sm:text-sm tracking-[0.3em] text-gray-500 mb-2 font-semibold text-center">
          LET&apos;S CONNECT
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
          Get In{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
            Touch
          </span>
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-6">
          {/* Earth Container */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="relative w-full h-96 flex items-center justify-center">
              {/* Glow behind the globe */}
              <div className="absolute w-72 h-72 bg-yellow-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div
                ref={earthContainerRef}
                className="relative w-full h-full flex items-center justify-center"
              />
            </div>

            <div className="mt-4 flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900/60 border border-gray-800 text-xs sm:text-sm text-gray-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
              </span>
              Available for freelance & full-time opportunities
            </div>

            <div className="mt-3 flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
              <MapPin className="w-3.5 h-3.5 text-yellow-400" />
              Malappuram, Kerala, India
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-1/2">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-900/60 border border-gray-800 p-6 sm:p-7 rounded-2xl shadow-lg"
            >
              <div className="mb-4">
                <label htmlFor="name" className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#1e1f20] text-white pl-10 pr-4 py-2.5 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#1e1f20] text-white pl-10 pr-4 py-2.5 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <textarea
                    id="subject"
                    rows="5"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#1e1f20] text-white pl-10 pr-4 py-2.5 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-colors resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;