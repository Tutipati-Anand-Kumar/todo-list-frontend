import React, { useState, useEffect, useRef } from 'react';

const Smoke = () => {
    const [particles, setParticles] = useState([]);
    const mousePos = useRef({ x: 0, y: 0 });
    const lastPos = useRef({ x: 0, y: 0 });
    const spawningPos = useRef({ x: 0, y: 0 }); 
    const isMoving = useRef(false); 
    const animationFrameId = useRef(null);

    // --- Responsive Configuration ---
    const [config, setConfig] = useState({ 
        baseSize: 3,
        distanceThreshold: 2,
        maxParticles: 400,
        particleMultiplier: 4,
        initialVelocity: 1.0, 
        decayRate: 0.007,
        smoothingFactor: 0.85, 
    });

    useEffect(() => {
        const updateConfig = () => {
            const isMobile = window.innerWidth < 640; 
            setConfig({
                baseSize: isMobile ? 1.5 : 3,
                distanceThreshold: isMobile ? 4 : 2,
                maxParticles: isMobile ? 250 : 400,
                particleMultiplier: isMobile ? 3 : 5,
                initialVelocity: isMobile ? 1.5 : 1.0,
                decayRate: 0.007,
                smoothingFactor: isMobile ? 0.7 : 0.85, 
            });
        };

        updateConfig();
        window.addEventListener('resize', updateConfig);
        return () => window.removeEventListener('resize', updateConfig);
    }, []);

    useEffect(() => {
        let particleId = 0;
        let movementTimer;

        const updateMousePosition = (x, y) => {
            mousePos.current = { x, y };
            isMoving.current = true;
            
            clearTimeout(movementTimer);
            movementTimer = setTimeout(() => {
                isMoving.current = false;
            }, 100);
        };

        const handleMouseMove = (e) => updateMousePosition(e.clientX, e.clientY);
        const handleTouchMove = (e) => {
            e.preventDefault();
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                updateMousePosition(touch.clientX, touch.clientY);
            }
        };

        const createParticles = () => {
            spawningPos.current.x += (mousePos.current.x - spawningPos.current.x) * config.smoothingFactor;
            spawningPos.current.y += (mousePos.current.y - spawningPos.current.y) * config.smoothingFactor;

            const dx = spawningPos.current.x - lastPos.current.x;
            const dy = spawningPos.current.y - lastPos.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const speedFactor = Math.min(distance / 15, 2.0); 

            if (isMoving.current || distance > config.distanceThreshold) {
                const particleCount = Math.min(Math.floor(distance / 3), 8);
                
                for (let i = 0; i < particleCount; i++) {
                    const t = i / particleCount;
                    const x = lastPos.current.x + dx * t;
                    const y = lastPos.current.y + dy * t;
                    
                    const hue = (Date.now() / 20 + particleId * 10) % 360;
                    
                    for (let j = 0; j < config.particleMultiplier; j++) {
                        const newParticle = {
                            id: particleId++,
                            x: x + (Math.random() - 0.5) * 6,
                            y: y + (Math.random() - 0.5) * 6,
                            size: Math.random() * config.baseSize * 0.5 + 0.5,
                            hue: hue + Math.random() * 20 - 10,
                            // *** FIX 2: Velocity scales with movement speed ***
                            velocityX: (Math.random() - 0.5) * config.initialVelocity * speedFactor, 
                            velocityY: (Math.random() - 0.5) * config.initialVelocity * speedFactor,
                            life: 1,
                            decay: config.decayRate + Math.random() * 0.005,
                            blur: Math.random() * 1.5 + 0.5
                        };
                        
                        setParticles(prev => [...prev, newParticle].slice(-config.maxParticles));
                    }
                }
                
                lastPos.current = { ...spawningPos.current };
            }

            animationFrameId.current = requestAnimationFrame(createParticles);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        createParticles();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            clearTimeout(movementTimer);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [config]);

    useEffect(() => {
        const interval = setInterval(() => {
            setParticles(prev => 
                prev
                    .map(p => ({
                        ...p,
                        x: p.x + p.velocityX,
                        y: p.y + p.velocityY,
                        velocityY: p.velocityY + 0.02,
                        life: p.life - p.decay,
                        size: p.size + 0.2 
                    }))
                    .filter(p => p.life > 0)
            );
        }, 16);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {particles.map((particle) => {
                const opacity = particle.life * 0.95; 
                const scale = 1; 
                
                return (
                    <div
                        key={particle.id}
                        className="absolute rounded-full"
                        style={{
                            left: particle.x - particle.size / 2,
                            top: particle.y - particle.size / 2,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            background: `radial-gradient(circle, 
                                hsla(${particle.hue}, 100%, 70%, ${opacity}) 0%, 
                                hsla(${particle.hue + 30}, 100%, 65%, ${opacity * 0.8}) 50%, 
                                hsla(${particle.hue + 60}, 100%, 55%, ${opacity * 0.5}) 100%)`,
                            opacity: opacity,
                            transform: `scale(${scale})`,
                            filter: `blur(${particle.blur * 2}px)`,
                            boxShadow: `0 0 ${particle.size}px hsla(${particle.hue}, 100%, 75%, ${opacity * 0.8})`,
                        }}
                    />
                );
            })}
        </div>
    );
};

export default Smoke;