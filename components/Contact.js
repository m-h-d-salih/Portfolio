'use client'
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Contact = () => {
  const earthContainerRef = useRef(null);

  useEffect(() => {
    if (!earthContainerRef.current) return;

    // Get container dimensions for responsive sizing
    const containerWidth = earthContainerRef.current.clientWidth;
    const containerHeight = earthContainerRef.current.clientHeight;

    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, containerWidth / containerHeight, 0.1, 1000);
    camera.position.z = 2.2; // Moved camera back slightly to accommodate larger Earth

    // Setup renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Clear container and append renderer
    while (earthContainerRef.current.firstChild) {
      earthContainerRef.current.removeChild(earthContainerRef.current.firstChild);
    }
    earthContainerRef.current.appendChild(renderer.domElement);

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

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate Earth
      earth.rotation.y += 0.002;
      clouds.rotation.y += 0.0025;
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!earthContainerRef.current) return;
      
      const width = earthContainerRef.current.clientWidth;
      const height = earthContainerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Handle cleanup
    return () => {
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
  }, []);

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
    <section className="min-h-screen bg-[#222324] mt-3 text-white pt-10 px-4 md:px-8 lg:px-16 rounded-lg">
      <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
        {/* Earth Container - Increased size */}
        <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
          <div 
            ref={earthContainerRef} 
            className="w-full h-96"
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center'
            }}
          />
        </div>
        
        {/* Contact Form */}
        <div className="w-full md:w-1/2">
          <form className="bg-[#2d2e30] p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full bg-[#1e1f20] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full bg-[#1e1f20] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
              <textarea 
                id="subject" 
                rows="5" 
                className="w-full bg-[#1e1f20] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;