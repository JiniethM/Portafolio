// ── src/components/ParticleBackground.jsx ─────────────────────────────────
import React, { useEffect, useRef } from 'react';
import './ParticleBackground.css';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const autoPointer = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    targetX: Math.random() * window.innerWidth,
    targetY: Math.random() * window.innerHeight,
    speed: 1.2,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 100;
    let isMobile = window.innerWidth <= 768;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      isMobile = window.innerWidth <= 768;
      particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        pulse: Math.random() * Math.PI * 2,
      }));
      autoPointer.current.x = canvas.width / 2;
      autoPointer.current.y = canvas.height / 2;
      autoPointer.current.targetX = Math.random() * canvas.width;
      autoPointer.current.targetY = Math.random() * canvas.height;
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.1;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const glow = (Math.sin(p.pulse) + 1) * 3 + 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.shadowBlur = glow;
        ctx.shadowColor = '#001f3f';             /* azul marino */
        ctx.fill();
      }

      let spiderX, spiderY;
      if (isMobile) {
        const ap = autoPointer.current;
        const dx = ap.targetX - ap.x;
        const dy = ap.targetY - ap.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 10) {
          ap.targetX = Math.random() * canvas.width;
          ap.targetY = Math.random() * canvas.height;
        } else {
          ap.x += (dx / dist) * ap.speed;
          ap.y += (dy / dist) * ap.speed;
        }
        spiderX = ap.x;
        spiderY = ap.y;
      } else {
        spiderX = mouse.current.x;
        spiderY = mouse.current.y;
      }

      particles
        .sort((a, b) => (a.x - spiderX) ** 2 + (a.y - spiderY) ** 2 - ((b.x - spiderX) ** 2 + (b.y - spiderY) ** 2))
        .slice(0, 8)
        .forEach((p) => {
          ctx.beginPath();
          ctx.moveTo(spiderX, spiderY);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = 'rgba(0,31,63,0.3)';   /* azul marino con alfa */
          ctx.lineWidth = 1;
          ctx.stroke();
        });

      ctx.beginPath();
      ctx.arc(spiderX, spiderY, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,31,63,0.9)';         /* azul marino con más alfa */
      ctx.fill();

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
};

export default ParticleBackground;
