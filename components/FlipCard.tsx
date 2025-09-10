// components/FlipCard.tsx
'use client';

import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';

type Props = {
  front: ReactNode;
  back: ReactNode;
  isFlipped: boolean;
  onToggle: () => void;
  className?: string;
  /** If true, container height is locked to the FRONT face (About) height */
  lockToFrontHeight?: boolean;
  /** Fallback min height if we can’t measure yet */
  minHeight?: number;
};

export default function FlipCard({
  front,
  back,
  isFlipped,
  onToggle,
  className = '',
  lockToFrontHeight = true,
  minHeight = 520,
}: Props) {
  const frontRef = useRef<HTMLDivElement>(null);
  const [containerH, setContainerH] = useState<number>(minHeight);

  // Measure the front (About) face and lock container to that height
  useLayoutEffect(() => {
    if (!lockToFrontHeight || !frontRef.current) return;
    const el = frontRef.current;

    const set = () => setContainerH(Math.max(minHeight, el.offsetHeight));
    set(); // initial

    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lockToFrontHeight, minHeight]);

  return (
    <div className={`relative w-full ${className}`}>
      <div className="mx-auto" style={{ height: containerH }}>
        <div className="[perspective:1200px] h-full w-full">
          <div
            className={[
              'relative h-full w-full',
              '[transform-style:preserve-3d]',
              'transition-transform duration-500 motion-reduce:transition-none',
              isFlipped ? '[transform:rotateY(180deg)]' : '',
            ].join(' ')}
          >
            {/* FRONT */}
            <div
              ref={frontRef}
              className={[
                'absolute inset-0 p-0',
                '[backface-visibility:hidden]',
                'transition-opacity duration-300',
                isFlipped ? 'opacity-0' : 'opacity-100',
              ].join(' ')}
            >
              {front}
            </div>

            {/* BACK */}
            <div
              className={[
                'absolute inset-0 p-0',
                '[transform:rotateY(180deg)]',
                '[backface-visibility:hidden]',
                'transition-opacity duration-300',
                isFlipped ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
            >
              {back}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-center action (optional; AboutImpactCard will supply its own control) */}
      <button
        type="button"
        onClick={onToggle}
        className="sr-only"
        aria-pressed={isFlipped}
        aria-label="Flip card"
      />
    </div>
  );
}
