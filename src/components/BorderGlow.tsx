import { useRef, useCallback, useEffect } from 'react';

function parseHSL(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildBoxShadow(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const layers = [
    [0, 0, 0, 1, 100, true], [0, 0, 1, 0, 60, true], [0, 0, 3, 0, 50, true],
    [0, 0, 6, 0, 40, true], [0, 0, 15, 0, 30, true], [0, 0, 25, 2, 20, true],
    [0, 0, 50, 2, 10, true],
    [0, 0, 1, 0, 60, false], [0, 0, 3, 0, 50, false], [0, 0, 6, 0, 40, false],
    [0, 0, 15, 0, 30, false], [0, 0, 25, 2, 20, false], [0, 0, 50, 2, 10, false],
  ];
  return layers.map(([x, y, blur, spread, alpha, inset]) => {
    const a = Math.min((alpha as number) * intensity, 100);
    return `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`;
  }).join(', ');
}

function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
function easeInCubic(x) { return x * x * x; }

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd = () => {} }: any) {
  const t0 = performance.now() + delay;
  function tick() {
    const elapsed = performance.now() - t0;
    if (elapsed < 0) {
      requestAnimationFrame(tick);
      return;
    }
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }
  requestAnimationFrame(tick);
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildMeshGradients(colors) {
  const gradients = [];
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    gradients.push(`radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`);
  }
  gradients.push(`linear-gradient(${colors[0]} 0 100%)`);
  return gradients;
}

const BorderGlow = ({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#060010',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  fillOpacity = 0.5,
}) => {
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  
  // Non-React state
  const stateRef = useRef({
    isHovered: false,
    sweepActive: false,
    edgeProximity: 0,
    cursorAngle: 45
  });
  const dimsRef = useRef({ width: 0, height: 0, left: 0, top: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const updateDims = () => {
      const rect = card.getBoundingClientRect();
      dimsRef.current = { width: rect.width, height: rect.height, left: rect.left, top: rect.top };
    };
    const ro = new ResizeObserver(updateDims);
    ro.observe(card);
    window.addEventListener('scroll', updateDims, { passive: true });
    updateDims();
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', updateDims);
    };
  }, []);

  const updateStyles = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    const { isHovered, sweepActive, edgeProximity, cursorAngle } = stateRef.current;
    const visible = isHovered || sweepActive;
    
    const colorSensitivity = edgeSensitivity + 20;
    const borderOp = visible ? Math.max(0, (edgeProximity * 100 - colorSensitivity) / (100 - colorSensitivity)) : 0;
    const glowOp = visible ? Math.max(0, (edgeProximity * 100 - edgeSensitivity) / (100 - edgeSensitivity)) : 0;
    const fillOp = borderOp * fillOpacity;
    
    card.style.setProperty('--border-opacity', String(borderOp));
    card.style.setProperty('--fill-opacity', String(fillOp));
    card.style.setProperty('--glow-opacity', String(glowOp));
    card.style.setProperty('--cursor-angle', `${cursorAngle.toFixed(3)}deg`);
    
    const transition = visible ? 'opacity 0.25s ease-out' : 'opacity 0.75s ease-in-out';
    card.style.setProperty('--glow-transition', transition);
  }, [edgeSensitivity, fillOpacity]);

  const getCenterOfElement = useCallback(() => {
    const { width, height } = dimsRef.current;
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback((x, y) => {
    const [cx, cy] = getCenterOfElement();
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }, [getCenterOfElement]);

  const getCursorAngle = useCallback((x, y) => {
    const [cx, cy] = getCenterOfElement();
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  }, [getCenterOfElement]);

  const handlePointerMove = useCallback((e) => {
    if (rafRef.current) return;
    const { clientX, clientY } = e;
    rafRef.current = requestAnimationFrame(() => {
      const { left, top } = dimsRef.current;
      const x = clientX - left;
      const y = clientY - top;
      stateRef.current.edgeProximity = getEdgeProximity(x, y);
      stateRef.current.cursorAngle = getCursorAngle(x, y);
      updateStyles();
      rafRef.current = null;
    });
  }, [getEdgeProximity, getCursorAngle, updateStyles]);

  const handlePointerEnter = useCallback(() => {
    stateRef.current.isHovered = true;
    updateStyles();
  }, [updateStyles]);

  const handlePointerLeave = useCallback(() => {
    stateRef.current.isHovered = false;
    updateStyles();
  }, [updateStyles]);

  useEffect(() => {
    // Initial property setup
    if (cardRef.current) {
      cardRef.current.style.setProperty('--border-opacity', '0');
      cardRef.current.style.setProperty('--fill-opacity', '0');
      cardRef.current.style.setProperty('--glow-opacity', '0');
      cardRef.current.style.setProperty('--cursor-angle', '45deg');
      cardRef.current.style.setProperty('--glow-transition', 'opacity 0.75s ease-in-out');
    }

    if (!animated) return;
    const angleStart = 110;
    const angleEnd = 465;
    
    stateRef.current.sweepActive = true;
    stateRef.current.cursorAngle = angleStart;
    updateStyles();

    animateValue({ duration: 500, onUpdate: v => {
      stateRef.current.edgeProximity = v / 100;
      updateStyles();
    }});
    animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: v => {
      stateRef.current.cursorAngle = (angleEnd - angleStart) * (v / 100) + angleStart;
      updateStyles();
    }});
    animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: v => {
      stateRef.current.cursorAngle = (angleEnd - angleStart) * (v / 100) + angleStart;
      updateStyles();
    }});
    animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
      onUpdate: v => {
        stateRef.current.edgeProximity = v / 100;
        updateStyles();
      },
      onEnd: () => {
        stateRef.current.sweepActive = false;
        updateStyles();
      },
    });
  }, [animated, updateStyles]);

  const meshGradients = buildMeshGradients(colors);
  const borderBg = meshGradients.map(g => `${g} border-box`);
  const fillBg = meshGradients.map(g => `${g} padding-box`);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative grid isolate border border-white/15 ${className}`}
      style={{
        background: backgroundColor,
        borderRadius: `${borderRadius}px`,
        transform: 'translate3d(0, 0, 0.01px)',
        boxShadow: 'rgba(0,0,0,0.1) 0 1px 2px, rgba(0,0,0,0.1) 0 2px 4px, rgba(0,0,0,0.1) 0 4px 8px, rgba(0,0,0,0.1) 0 8px 16px, rgba(0,0,0,0.1) 0 16px 32px, rgba(0,0,0,0.1) 0 32px 64px',
      }}
    >
      {/* mesh gradient border */}
      <div
        className="absolute inset-0 rounded-[inherit] -z-[1]"
        style={{
          border: '1px solid transparent',
          background: [
            `linear-gradient(${backgroundColor} 0 100%) padding-box`,
            'linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box',
            ...borderBg,
          ].join(', '),
          opacity: 'var(--border-opacity)',
          maskImage: `conic-gradient(from var(--cursor-angle) at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
          WebkitMaskImage: `conic-gradient(from var(--cursor-angle) at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
          transition: 'var(--glow-transition)',
        }}
      />

      {/* mesh gradient fill near edges */}
      <div
        className="absolute inset-0 rounded-[inherit] -z-[1]"
        style={{
          border: '1px solid transparent',
          background: fillBg.join(', '),
          maskImage: [
            'linear-gradient(to bottom, black, black)',
            'radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)',
            'radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)',
            'radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)',
            'radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)',
            'radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)',
            `conic-gradient(from var(--cursor-angle) at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
          ].join(', '),
          WebkitMaskImage: [
            'linear-gradient(to bottom, black, black)',
            'radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)',
            'radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)',
            'radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)',
            'radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)',
            'radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)',
            `conic-gradient(from var(--cursor-angle) at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
          ].join(', '),
          maskComposite: 'subtract, add, add, add, add, add',
          WebkitMaskComposite: 'source-out, source-over, source-over, source-over, source-over, source-over',
          opacity: 'var(--fill-opacity)',
          mixBlendMode: 'soft-light',
          transition: 'var(--glow-transition)',
        }}
      />

      {/* outer glow */}
      <span
        className="absolute pointer-events-none z-[1] rounded-[inherit]"
        style={{
          inset: `${-glowRadius}px`,
          maskImage: `conic-gradient(from var(--cursor-angle) at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
          WebkitMaskImage: `conic-gradient(from var(--cursor-angle) at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
          opacity: 'var(--glow-opacity)',
          mixBlendMode: 'plus-lighter',
          transition: 'var(--glow-transition)',
        }}
      >
        <span
          className="absolute rounded-[inherit]"
          style={{
            inset: `${glowRadius}px`,
            boxShadow: buildBoxShadow(glowColor, glowIntensity),
          }}
        />
      </span>

      <div className="flex flex-col relative overflow-auto z-[1] w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
