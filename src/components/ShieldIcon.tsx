import React from 'react';

interface ShieldIconProps {
  className?: string;
  animated?: boolean;
}

const ShieldIcon: React.FC<ShieldIconProps> = ({ className = "", animated = false }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Outer glow ring */}
      <div className={`absolute inset-0 rounded-full bg-primary/20 blur-3xl ${animated ? 'animate-pulse-glow' : ''}`} />
      
      {/* Main shield */}
      <svg
        viewBox="0 0 100 100"
        className={`relative z-10 w-full h-full drop-shadow-2xl ${animated ? 'animate-float' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shield background */}
        <defs>
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(187 100% 50%)" />
            <stop offset="100%" stopColor="hsl(200 100% 60%)" />
          </linearGradient>
          <linearGradient id="shieldInner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(222 47% 12%)" />
            <stop offset="100%" stopColor="hsl(222 47% 8%)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Shield shape */}
        <path
          d="M50 5 L85 20 L85 45 C85 70 65 90 50 95 C35 90 15 70 15 45 L15 20 Z"
          fill="url(#shieldGradient)"
          filter="url(#glow)"
        />
        
        {/* Inner shield */}
        <path
          d="M50 12 L78 24 L78 45 C78 65 62 82 50 87 C38 82 22 65 22 45 L22 24 Z"
          fill="url(#shieldInner)"
        />
        
        {/* Block symbol - stylized "K" */}
        <path
          d="M38 35 L38 65 M38 50 L55 35 M45 50 L55 65"
          stroke="url(#shieldGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Accent lines */}
        <path
          d="M60 35 L65 35 M60 50 L68 50 M60 65 L65 65"
          stroke="hsl(187 100% 50%)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
      
      {/* Orbiting particle */}
      {animated && (
        <div className="absolute inset-0 animate-shield-rotate">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-lg shadow-primary/50" />
        </div>
      )}
    </div>
  );
};

export default ShieldIcon;
