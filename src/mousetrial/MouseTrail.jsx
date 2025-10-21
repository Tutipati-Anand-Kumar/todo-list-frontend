import React, { useState, useEffect } from 'react';

const MouseTrail = () => {
    const [bubbles, setBubbles] = useState([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [config, setConfig] = useState({ 
        maxBubbles: 30,
        bubbleSizeMax: 30,
        bubbleSizeMin: 20,
        cursorGlowSize: 30
    });

    useEffect(() => {
        const updateConfig = () => {
            const isMobile = window.innerWidth < 640; 
            
            setConfig({
                maxBubbles: isMobile ? 20 : 30,          
                bubbleSizeMax: isMobile ? 15 : 30,        
                bubbleSizeMin: isMobile ? 8 : 20,         
                cursorGlowSize: isMobile ? 20 : 30        
            });
        };

        updateConfig();
        window.addEventListener('resize', updateConfig);
        
        return () => window.removeEventListener('resize', updateConfig);
    }, []);

    const createBubble = (clientX, clientY) => {
        setMousePos({ x: clientX, y: clientY });
        const newBubble = {
            id: Date.now() + Math.random(),
            x: clientX,
            y: clientY,
            size: Math.random() * config.bubbleSizeMax + config.bubbleSizeMin,
            color: Math.floor(Math.random() * 6),
            delay: Math.random() * 0.3
        };

        setBubbles(prev => [...prev, newBubble].slice(-config.maxBubbles));
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            createBubble(e.clientX, e.clientY);
        };

        const handleTouchMove = (e) => {
            e.preventDefault(); 
            
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                createBubble(touch.clientX, touch.clientY);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: false }); 

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [config]);

    useEffect(() => {
        const interval = setInterval(() => {
            setBubbles(prev => prev.slice(-config.maxBubbles)); 
        }, 100);
        return () => clearInterval(interval);
    }, [config]);

    const colors = [
        'bg-gradient-to-br from-pink-400 to-purple-600',
        'bg-gradient-to-br from-blue-400 to-cyan-500',
        'bg-gradient-to-br from-yellow-300 to-orange-500',
        'bg-gradient-to-br from-green-400 to-emerald-600',
        'bg-gradient-to-br from-red-400 to-pink-600',
        'bg-gradient-to-br from-indigo-400 to-purple-700'
    ];

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            <div
                className="absolute rounded-full transition-all duration-100 ease-out"
                style={{
                    left: mousePos.x - config.cursorGlowSize / 2,
                    top: mousePos.y - config.cursorGlowSize / 2,
                    width: `${config.cursorGlowSize}px`,
                    height: `${config.cursorGlowSize}px`,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(147,51,234,0.4) 50%, transparent 100%)',
                    filter: 'blur(8px)',
                }}
            />
            
            {bubbles.map((bubble, index) => {
                const age = bubbles.length - index;
                const opacity = Math.max(0, 1 - age / config.maxBubbles); 
                const scale = 1 - age / (config.maxBubbles + 10); 
                
                return (
                    <div
                        key={bubble.id}
                        className={`absolute rounded-full ${colors[bubble.color]} shadow-lg`}
                        style={{
                            left: bubble.x - bubble.size / 2,
                            top: bubble.y - bubble.size / 2,
                            width: `${bubble.size}px`,
                            height: `${bubble.size}px`,
                            opacity: opacity,
                            transform: `scale(${scale})`,
                            transition: `all ${0.6 + bubble.delay}s cubic-bezier(0.4, 0, 0.2, 1)`,
                            filter: 'blur(1px)', 
                            animation: `float ${2 + bubble.delay}s ease-in-out infinite`,
                            animationDelay: `${bubble.delay}s`
                        }}
                    >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 to-transparent" />
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                    </div>
                );
            })}

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-10px) scale(1.05); }
                }
            `}</style>
        </div>
    );
};

export default MouseTrail;