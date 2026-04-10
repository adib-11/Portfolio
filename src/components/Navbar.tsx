import { useEffect, useState } from 'react';
import PillNav from './PillNav';

// Simple SVG logo for AH
const logoSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23141414"/><text x="50" y="55" font-family="sans-serif" font-size="40" font-style="italic" font-weight="bold" fill="%23f5f5f5" text-anchor="middle" dominant-baseline="middle">AH</text></svg>`;

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [activeHref, setActiveHref] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'work', 'experience', 'contact'];
      let current = '#home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          current = `#${section}`;
        }
      }
      setActiveHref(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <PillNav
      logo={logoSvg}
      logoAlt="AH Logo"
      items={NAV_ITEMS}
      activeHref={activeHref}
      className="border border-white/10 shadow-lg bg-surface/80 p-2"
      baseColor="#ffffff" // White pill background on hover
      pillColor="transparent" // Transparent default background
      hoveredPillTextColor="#0a0a0a" // Dark text on hover
      pillTextColor="#a3a3a3" // Muted text by default
      initialLoadAnimation
    />
  );
}
