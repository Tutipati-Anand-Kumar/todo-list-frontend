import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Flowers() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, w, 0, h, -10, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    const maxParticles = 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(maxParticles * 3);
    const colors = new Float32Array(maxParticles * 3);
    const sizes = new Float32Array(maxParticles);
    const alphas = new Float32Array(maxParticles);

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        attribute float alpha;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = color;
          vAlpha = alpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);
          float angle = atan(center.y, center.x);
          float starShape = 0.5 + 0.5 * cos(5.0 * angle);
          float star = smoothstep(0.5, 0.3, dist / starShape);
          float glow = exp(-dist * 4.0);
          float final = max(star, glow * 0.3);
          gl_FragColor = vec4(vColor, final * vAlpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    const particles = [];
    let lastX = 0,
      lastY = 0;
    let lastMove = performance.now();

    const rand = (min, max) => Math.random() * (max - min) + min;

    const spawnParticle = (x, y) => {
      if (particles.length >= maxParticles) particles.shift();

      const hue = Math.random();
      particles.push({
        x,
        y,
        vx: rand(-1.5, 1.5),
        vy: rand(-1.5, 1.5),
        life: rand(35, 50),
        age: 0,
        size: rand(15, 30),
        hue,
      });
    };

    const pointerMove = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      lastMove = performance.now();

      if (lastX === 0 && lastY === 0) {
        lastX = x;
        lastY = y;
        spawnParticle(x, y);
        return;
      }

      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.floor(dist / 8));

      for (let i = 0; i <= steps; i++) {
        const px = lastX + (dx * i) / steps;
        const py = lastY + (dy * i) / steps;
        spawnParticle(px, py);
      }

      lastX = x;
      lastY = y;
    };

    const initPointer = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      lastX = x;
      lastY = y;
    };

    window.addEventListener("mouseenter", initPointer, { passive: true, once: true });
    window.addEventListener("mousemove", pointerMove, { passive: true });
    window.addEventListener("touchstart", initPointer, { passive: true, once: true });
    window.addEventListener("touchmove", pointerMove, { passive: true });

    const animate = () => {
      const now = performance.now();
      const idle = now - lastMove > 1000;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.age++;

        const t = p.age / p.life;
        const alpha = idle ? 0.3 * (1 - t) : 1 - t;

        const idx = i * 3;
        positions[idx] = p.x;
        positions[idx + 1] = p.y;
        positions[idx + 2] = 0;

        const h = p.hue * 6;
        const s = 1;
        const l = 0.7;
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h % 2) - 1));
        const m = l - c / 2;
        let r, g, b;
        if (h < 1) [r, g, b] = [c, x, 0];
        else if (h < 2) [r, g, b] = [x, c, 0];
        else if (h < 3) [r, g, b] = [0, c, x];
        else if (h < 4) [r, g, b] = [0, x, c];
        else if (h < 5) [r, g, b] = [x, 0, c];
        else [r, g, b] = [c, 0, x];

        colors[idx] = r + m;
        colors[idx + 1] = g + m;
        colors[idx + 2] = b + m;

        sizes[i] = p.size * (1 + 0.2 * (1 - t));
        alphas[i] = alpha;

        if (p.age > p.life) particles.splice(i, 1);
      }

      for (let i = particles.length; i < maxParticles; i++) {
        const idx = i * 3;
        positions[idx] = positions[idx + 1] = positions[idx + 2] = 0;
        colors[idx] = colors[idx + 1] = colors[idx + 2] = 0;
        sizes[i] = 0;
        alphas[i] = 0;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;
      geometry.attributes.size.needsUpdate = true;
      geometry.attributes.alpha.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      camera.right = w;
      camera.bottom = h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mouseenter", initPointer);
      window.removeEventListener("mousemove", pointerMove);
      window.removeEventListener("touchstart", initPointer);
      window.removeEventListener("touchmove", pointerMove);
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-[9999] pointer-events-none bg-transparent"
    />
  );
}
