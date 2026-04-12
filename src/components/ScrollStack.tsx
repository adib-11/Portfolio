import React, { useLayoutEffect, useRef, useCallback, useEffect } from 'react';
import Lenis from 'lenis';

interface ScrollStackItemProps {
  children: React.ReactNode;
  itemClassName?: string;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const lenisRef = useRef(null);
  const rafRef = useRef(null);
  // Cached offsets to avoid layout thrashing
  const cachedOffsetsRef = useRef([]);
  const cachedEndOffsetRef = useRef(0);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  // Cache all card and end-element positions (called once + on resize)
  const cacheOffsets = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    if (useWindowScroll) {
      const scrollY = window.scrollY;
      cachedOffsetsRef.current = cards.map(card => {
        if (!card) return 0;
        const rect = card.getBoundingClientRect();
        return rect.top + scrollY;
      });
      const endEl = document.querySelector('.scroll-stack-end');
      cachedEndOffsetRef.current = endEl
        ? endEl.getBoundingClientRect().top + scrollY
        : 0;
    } else {
      const scroller = scrollerRef.current;
      cachedOffsetsRef.current = cards.map(card =>
        card ? card.offsetTop : 0
      );
      const endEl = scroller?.querySelector('.scroll-stack-end');
      cachedEndOffsetRef.current = endEl ? endEl.offsetTop : 0;
    }
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const lenis = lenisRef.current;
    
    // Always use the smooth Lenis scroll value to prevent native vs smooth sync jitter
    const scrollTop = useWindowScroll
      ? (lenis ? lenis.scroll : window.scrollY)
      : (scrollerRef.current?.scrollTop || 0);
    const containerHeight = useWindowScroll
      ? window.innerHeight
      : (scrollerRef.current?.clientHeight || 0);

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElementTop = cachedEndOffsetRef.current;

    cards.forEach((card, i) => {
      if (!card) return;

      const cardTop = cachedOffsetsRef.current[i] ?? 0;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cards.length; j++) {
          const jCardTop = cachedOffsetsRef.current[j] ?? 0;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }
        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY,
        scale,
        rotation,
        blur
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.05 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.0005 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.05 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.05;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY.toFixed(3)}px, 0) scale(${newTransform.scale.toFixed(4)}) rotate(${newTransform.rotation.toFixed(3)}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur.toFixed(2)}px)` : '';

        card.style.transform = transform;
        if (blurAmount > 0) {
          card.style.filter = filter;
        }

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cards.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage
  ]);

  // Main setup: init cards, Lenis, resize listener
  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller && !useWindowScroll) return;

    // Gather card elements
    const cards: HTMLElement[] = Array.from(
      useWindowScroll
        ? document.querySelectorAll<HTMLElement>('.scroll-stack-card')
        : scroller.querySelectorAll<HTMLElement>('.scroll-stack-card')
    );
    cardsRef.current = cards;

    // Initial card styles
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
    });

    // Cache positions before first render
    cacheOffsets();
    updateCardTransforms();

    // Set up Lenis for smooth scrolling
    const lenisOptions = {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
      ...(useWindowScroll
        ? {}
        : {
            wrapper: scroller,
            content: scroller.querySelector('.scroll-stack-inner'),
          }),
    };

    const lenis = new Lenis(lenisOptions);
    lenisRef.current = lenis;

    // Expose globally so other components (e.g. PillNav) can use lenis.scrollTo()
    (window as any).__lenis = lenis;

    // Drive animations from Lenis's interpolated scroll
    lenis.on('scroll', () => {
      updateCardTransforms();
    });

    // Lenis RAF loop
    const raf = (time) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    // Recache offsets on resize
    const onResize = () => {
      cacheOffsets();
      updateCardTransforms();
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      (window as any).__lenis = null;
      stackCompletedRef.current = false;
      cardsRef.current = [];
      cachedOffsetsRef.current = [];
      lastTransformsRef.current.clear();
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    cacheOffsets,
    updateCardTransforms
  ]);

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim();

  return (
    <div className={containerClassName} ref={scrollerRef}>
      <div className="scroll-stack-inner pt-10 pb-[20rem]">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
