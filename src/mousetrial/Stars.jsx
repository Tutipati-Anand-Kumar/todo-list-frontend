import { useEffect, useRef } from "react";

export default function Stars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w, h, DPR = Math.max(1, window.devicePixelRatio || 1);
    let baseStarSize = 3;
    let particles = [];
    const maxParticles = 350;
    const cursor = { x: 0, y: 0 };
    let lastX = 0, lastY = 0;
    let lastMove = performance.now();

    // ✅ Responsive star size
    const updateStarSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) baseStarSize = 3.5; // desktop
      else if (width >= 768) baseStarSize = 2.8; // tablet
      else baseStarSize = 2.0; // mobile
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      updateStarSize();
    };
    resize();
    window.addEventListener("resize", resize);

    const rand = (min, max) => Math.random() * (max - min) + min;

    const drawStar = (x, y, radius, spikes = 5) => {
      let rot = Math.PI / 2 * 3;
      const step = Math.PI / spikes;
      const outer = radius;
      const inner = radius * 0.45;
      ctx.beginPath();
      ctx.moveTo(x, y - outer);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(x + Math.cos(rot) * outer, y + Math.sin(rot) * outer);
        rot += step;
        ctx.lineTo(x + Math.cos(rot) * inner, y + Math.sin(rot) * inner);
        rot += step;
      }
      ctx.closePath();
    };

    const spawnParticle = (x, y) => {
      if (particles.length >= maxParticles) particles.shift();
      particles.push({
        x,
        y,
        vx: rand(-1.8, 1.8),
        vy: rand(-1.8, 1.8),
        life: rand(25, 45),
        age: 0,
        size: rand(baseStarSize * 0.8, baseStarSize * 1.5),
        hue: Math.random() * 360,
      });
    };

    // ✅ Smooth line of stars between positions
    const pointerMove = (e) => {
      cursor.x = e.touches ? e.touches[0].clientX : e.clientX;
      cursor.y = e.touches ? e.touches[0].clientY : e.clientY;
      lastMove = performance.now();

      const dx = cursor.x - lastX;
      const dy = cursor.y - lastY;
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.floor(dist / 5));

      for (let i = 0; i < steps; i++) {
        const x = lastX + (dx * i) / steps;
        const y = lastY + (dy * i) / steps;
        spawnParticle(x, y);
      }

      lastX = cursor.x;
      lastY = cursor.y;
    };

    window.addEventListener("mousemove", pointerMove, { passive: true });
    window.addEventListener(
      "touchmove",
      (e) => {
        pointerMove(e);
        e.preventDefault();
      },
      { passive: false }
    );

    // 🌀 Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.age++;
        const t = p.age / p.life;
        const alpha = 1 - t;
        const size = p.size * (1 + 0.4 * (1 - t));

        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${p.hue},100%,70%,${alpha})`;
        ctx.fillStyle = `hsla(${p.hue},100%,70%,${alpha})`;

        drawStar(p.x, p.y, size, 5);
        ctx.fill();

        if (p.age > p.life) particles.splice(i, 1);
      }

      ctx.restore();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", pointerMove);
      window.removeEventListener("touchmove", pointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[9999] pointer-events-none bg-transparent"
    />
  );
}
