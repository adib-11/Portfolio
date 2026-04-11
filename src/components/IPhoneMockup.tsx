import React from 'react';

interface IPhoneMockupProps {
  screenImage: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  rotate?: number;
  animate?: boolean;
}

const sizeMap = {
  sm: { width: 200, height: 420, radius: 32, border: 6, notchW: 60, notchH: 18, notchTop: 8 },
  md: { width: 280, height: 580, radius: 48, border: 8, notchW: 80, notchH: 24, notchTop: 10 },
  lg: { width: 320, height: 660, radius: 52, border: 9, notchW: 96, notchH: 28, notchTop: 12 },
};

export default function IPhoneMockup({
  screenImage,
  size = 'md',
  className = '',
  rotate = 0,
  animate = false,
}: IPhoneMockupProps) {
  const s = sizeMap[size];

  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{
        width: s.width,
        height: s.height,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
    >
      {/* Outer iPhone frame */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius: s.radius,
          border: `${s.border}px solid #2a2a2a`,
          background: '#0a0a0a',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05)',
        }}
      >
        {/* Side buttons - left */}
        <div
          className="absolute bg-[#2a2a2a] rounded-r-sm"
          style={{
            left: -s.border - 2,
            top: '18%',
            width: 3,
            height: s.height * 0.06,
          }}
        />
        <div
          className="absolute bg-[#2a2a2a] rounded-r-sm"
          style={{
            left: -s.border - 2,
            top: '26%',
            width: 3,
            height: s.height * 0.09,
          }}
        />
        <div
          className="absolute bg-[#2a2a2a] rounded-r-sm"
          style={{
            left: -s.border - 2,
            top: '37%',
            width: 3,
            height: s.height * 0.09,
          }}
        />

        {/* Side button - right (power) */}
        <div
          className="absolute bg-[#2a2a2a] rounded-l-sm"
          style={{
            right: -s.border - 2,
            top: '28%',
            width: 3,
            height: s.height * 0.12,
          }}
        />

        {/* Dynamic Island */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bg-black z-20 rounded-full"
          style={{
            top: s.notchTop,
            width: s.notchW,
            height: s.notchH,
          }}
        />

        {/* Screen content */}
        <img
          src={screenImage}
          alt="App screenshot"
          className={`w-full h-full object-cover ${animate ? 'transition-opacity duration-700' : ''}`}
          draggable={false}
        />

        {/* Inner screen bezel highlight */}
        <div
          className="absolute inset-0 pointer-events-none rounded-inherit"
          style={{
            borderRadius: s.radius - s.border,
            boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.08)',
          }}
        />
      </div>
    </div>
  );
}
