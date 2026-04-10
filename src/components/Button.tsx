import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function Button({ variant = 'primary', children, onClick, href, className = '' }: ButtonProps) {
  const baseStyles = "px-7 py-3 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2 hover:scale-105";

  const variantStyles = {
    primary: "bg-[#051A24] text-white hover:bg-[#0D212C] shadow-[0_1px_2px_0_rgba(5,26,36,0.1),0_4px_4px_0_rgba(5,26,36,0.09),0_9px_6px_0_rgba(5,26,36,0.05),0_17px_7px_0_rgba(5,26,36,0.01),0_26px_7px_0_rgba(5,26,36,0),inset_0_2px_8px_0_rgba(255,255,255,0.5)]",
    secondary: "bg-white text-[#051A24] border-0 hover:border-gray-300 shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_30px_rgba(0,0,0,0.08)]",
    tertiary: "bg-white text-[#051A24] border-0 hover:border-gray-300 shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_30px_rgba(0,0,0,0.08),inset_0_2px_8px_0_rgba(255,255,255,0.5)]"
  };

  if (href) {
    return (
      <a
        href={href}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
