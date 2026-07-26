import { useEffect, useRef } from 'react';

function createHandShape(numParticles) {
  const points = [];
  const numPalm = Math.floor(numParticles * 0.45);
  const numFingers = numParticles - numPalm;
  
  // Weights for fingers (thumb, index, middle, ring, pinky) based on roughly their area/length
  const fingerWeights = [1.2, 1.5, 1.6, 1.4, 1.0];
  const totalWeight = fingerWeights.reduce((a,b)=>a+b, 0);
  
  // Palm
  while (points.length < numPalm) {
    let px = (Math.random() - 0.5) * 80; // -40 to 40
    let py = (Math.random() - 0.5) * 70 + 15; // -20 to 50
    
    let t = (py - (-20)) / 70; // 0 at top, 1 at bottom
    let halfWidth = 38 - t * 12; // 38 at top, 26 at bottom
    
    // round the bottom wrist slightly
    if (t > 0.8) {
      halfWidth -= (t - 0.8) * 20; 
    }
    
    if (Math.abs(px) < halfWidth) {
      points.push({ x: px, y: py });
    }
  }

  const fingers = [
    { x0: -30, y0: 20, x1: -65, y1: -10, w: 12, weight: fingerWeights[0] }, // Thumb
    { x0: -24, y0: -18, x1: -30, y1: -85, w: 11, weight: fingerWeights[1] }, // Index
    { x0: -5, y0: -20, x1: -6, y1: -95, w: 11, weight: fingerWeights[2] },   // Middle
    { x0: 14, y0: -18, x1: 18, y1: -85, w: 10, weight: fingerWeights[3] },   // Ring
    { x0: 32, y0: -5, x1: 40, y1: -65, w: 9, weight: fingerWeights[4] }     // Pinky
  ];

  fingers.forEach(f => {
    const numThisFinger = Math.floor(numFingers * (f.weight / totalWeight));
    const dx = f.x1 - f.x0;
    const dy = f.y1 - f.y0;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = dx / len;
    const ny = dy / len;
    const px = -ny;
    const py = nx;
    
    for (let i = 0; i < numThisFinger; i++) {
      const t = Math.random();
      const cx = f.x0 + t * dx;
      const cy = f.y0 + t * dy;
      const wt = (Math.random() - 0.5) * f.w;
      
      let endOffset = 0;
      // Soften the tip
      if (t > 0.85) endOffset = (Math.random()) * f.w * 0.5;
      
      points.push({
        x: cx + px * wt + nx * endOffset,
        y: cy + py * wt + ny * endOffset
      });
    }
  });

  while (points.length < numParticles) {
     points.push({ x: (Math.random() - 0.5) * 20, y: (Math.random() - 0.5) * 20 });
  }

  for (let i = points.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [points[i], points[j]] = [points[j], points[i]];
  }

  return points;
}

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const numParticles = 500;
    let particles = [];
    
    const colors = ['rgba(255, 94, 58, 0.8)', 'rgba(255, 94, 58, 0.5)', 'rgba(255, 94, 58, 0.3)'];

    let mouse = {
      x: width / 2,
      y: height / 2,
      isActive: false
    };

    let isIdle = false;
    let idleTimer = null;
    let idleStartTime = 0;
    let activeStartTime = Date.now();

    const resetIdleTimer = () => {
      if (isIdle) {
        activeStartTime = Date.now();
      }
      isIdle = false;
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (window.scrollY < window.innerHeight / 2) {
          isIdle = true;
          idleStartTime = Date.now();
        }
      }, 3000);
    };

    const mouseMoveHandler = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isActive = true;
      resetIdleTimer();
    };
    
    const mouseLeaveHandler = () => {
      mouse.isActive = false;
    };

    const scrollHandler = () => {
      resetIdleTimer();
    };

    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseleave', mouseLeaveHandler);
    window.addEventListener('scroll', scrollHandler);

    resetIdleTimer(); // Start the timer initially

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

    const handPoints = createHandShape(numParticles);

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        targetRadius: 180 + (Math.random() * 80), 
        targetAngle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.005,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        springFactor: 0.001 + Math.random() * 0.003,
        friction: 0.94 + Math.random() * 0.04,
        handPoint: handPoints[i]
      });
    }

    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);

      if (!mouse.isActive && !isIdle) {
        mouse.x += (width / 2 - mouse.x) * 0.01;
        mouse.y += (height / 2 - mouse.y) * 0.01;
      }

      // Calculate waving motion
      const waveTime = Date.now() / 400;
      const waveAngle = Math.sin(waveTime) * 0.25; // Waving angle
      const cosWave = Math.cos(waveAngle);
      const sinWave = Math.sin(waveAngle);

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        
        // Stagger the transition to create a tail effect
        // 2000ms total stagger time across all particles
        const staggerDelay = (i / particles.length) * 2000;
        let progress = 0;
        
        if (isIdle) {
          const timeSinceStart = Date.now() - idleStartTime;
          // Particle takes 1500ms to fully transition once its delay is met
          progress = Math.min(1, Math.max(0, (timeSinceStart - staggerDelay) / 1500));
        } else {
          const timeSinceActive = Date.now() - activeStartTime;
          progress = 1 - Math.min(1, Math.max(0, (timeSinceActive - staggerDelay) / 1500));
        }

        // Easing for smoother movement
        const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const pEased = easeInOutCubic(progress);

        // Hand shape target
        const scale = 1.34;
        const hx = p.handPoint.x * scale;
        const hy = p.handPoint.y * scale;
        const rotatedX = hx * cosWave - hy * sinWave;
        const rotatedY = hx * sinWave + hy * cosWave;
        const handTargetX = mouse.x + rotatedX;
        const handTargetY = mouse.y + rotatedY;

        // Normal orbital logic
        p.targetAngle += p.angularSpeed;
        const orbitTargetX = mouse.x + Math.cos(p.targetAngle) * p.targetRadius;
        const orbitTargetY = mouse.y + Math.sin(p.targetAngle) * p.targetRadius;

        // Interpolate target smoothly
        const targetX = orbitTargetX + (handTargetX - orbitTargetX) * pEased;
        const targetY = orbitTargetY + (handTargetY - orbitTargetY) * pEased;

        const dx = targetX - p.x;
        const dy = targetY - p.y;
        
        // Transition to a UNIFORM, stronger spring factor when in hand shape 
        // This ensures all particles track the waving motion identically, preserving the hand geometry!
        const uniformSpring = 0.08;
        const currentSpring = p.springFactor * (1 - pEased) + uniformSpring * pEased;
        
        p.vx += dx * currentSpring;
        p.vy += dy * currentSpring;
        
        // Reduce noise to exactly 0 when fully in hand shape
        const noise = (1 - pEased) * 0.2;
        p.vx += (Math.random() - 0.5) * noise;
        p.vy += (Math.random() - 0.5) * noise;

        p.vx *= p.friction;
        p.vy *= p.friction;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const alpha = Math.max(0.1, 0.8 - speed * 0.02);
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    }

    animate();

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseleave', mouseLeaveHandler);
      window.removeEventListener('scroll', scrollHandler);
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
