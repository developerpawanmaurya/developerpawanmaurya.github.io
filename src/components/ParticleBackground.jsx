import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const numParticles = 300; // Reduced amount of particles
    let particles = [];
    
    // Orange colors matching the hero text accent (#ff5e3a)
    const colors = ['rgba(255, 94, 58, 0.8)', 'rgba(255, 94, 58, 0.5)', 'rgba(255, 94, 58, 0.3)'];

    let mouse = {
      x: width / 2,
      y: height / 2,
      isActive: false
    };

    const mouseMoveHandler = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isActive = true;
    };
    
    const mouseLeaveHandler = () => {
      mouse.isActive = false;
    };

    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseleave', mouseLeaveHandler);

    const resizeHandler = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      if (!mouse.isActive) {
        mouse.x = width / 2;
        mouse.y = height / 2;
      }
    };
    window.addEventListener('resize', resizeHandler);

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        // The radius defines how far from the epicenter the particle likes to be.
        // A tighter radius distribution to make it more like a circle
        targetRadius: 180 + (Math.random() * 80), 
        targetAngle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.005, // Slow rotation around epicenter
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        springFactor: 0.001 + Math.random() * 0.003, // varied speed for natural fluid look
        friction: 0.94 + Math.random() * 0.04
      });
    }

    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);

      // If mouse isn't active, slowly drift center back to middle of screen
      if (!mouse.isActive) {
        mouse.x += (width / 2 - mouse.x) * 0.01;
        mouse.y += (height / 2 - mouse.y) * 0.01;
      }

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        
        // Slowly orbit around the epicenter
        p.targetAngle += p.angularSpeed;

        // Calculate where this particle "wants" to be (on the loose circle)
        const targetX = mouse.x + Math.cos(p.targetAngle) * p.targetRadius;
        const targetY = mouse.y + Math.sin(p.targetAngle) * p.targetRadius;

        // Spring physics to move toward target
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        
        p.vx += dx * p.springFactor;
        p.vy += dy * p.springFactor;
        
        // Add a tiny bit of random noise for a more "loose/scattered" feel
        p.vx += (Math.random() - 0.5) * 0.2;
        p.vy += (Math.random() - 0.5) * 0.2;

        p.vx *= p.friction;
        p.vy *= p.friction;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Make them slightly fade out if they are too fast or far, just for a nice effect
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const alpha = Math.max(0.1, 0.8 - speed * 0.02);
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
      
      // Optional: Draw faint connecting lines between very close particles to add to the "fluid/cloud" feel
      // (Uncomment if you want a network effect)
      /*
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i+=2) {
        for (let j = i+1; j < particles.length; j+=2) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx*dx + dy*dy;
          if (distSq < 4000) {
            ctx.beginPath();
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = 1 - (distSq / 4000);
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1.0;
      */
    }

    animate();

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseleave', mouseLeaveHandler);
      window.removeEventListener('resize', resizeHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
