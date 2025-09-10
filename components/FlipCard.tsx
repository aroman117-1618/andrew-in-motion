// components/FlipCard.tsx
'use client';

import { ReactNode, useLayoutEffect, useRef, useState } from 'react';

type Props = {
  front: ReactNode;
  back: ReactNode;
  isFlipped: boolean;
  onToggle: () => void;
  className?: string;
  /** If true, container height is locked to the FRONT face (About) height.
   *  If false, container height adapts to the ACTIVE face (About/Track Record). */
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
  const backRef  = useRef<HTMLDivElement>(null);

  const [frontH, setFrontH] = useState<number>(minHeight);
  const [backH,  setBackH]  = useState<number>(minHeight);
  const activeH = Math.max(minHeight, isFlipped ? backH : frontH);
  const lockedH = Math.max(minHeight, frontH);
  const containerH = lockToFrontHeight ? lockedH : activeH;

  // Measure FRONT
  useLayoutEffect(() => {
    if (!frontRef.current) return;
    const el = frontRef.current;
    const set = () => setFrontH(Math.max(minHeight, el.offsetHeight));
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minHeight]);

  // Measure BACK
  useLayoutEffect(() => {
    if (!backRef.current) return;
    const el = backRef.current;
    const set = () => setBackH(Math.max(minHeight, el.offsetHeight));
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minHeight]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Smoothly animate to the desired height */}
      <div className="mx-auto transition-[height] duration-300" style={{ height: containerH }}>
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
              ref={backRef}
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

      {/* Optional SR flip button; AboutImpactCard provides the visible toggle */}
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
