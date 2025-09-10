// components/FlipCard.tsx
'use client';

import { ReactNode, useLayoutEffect, useRef, useState } from 'react';

type Props = {
  front: ReactNode;
  back: ReactNode;
  isFlipped: boolean;
  onToggle: () => void;
  className?: string;
  /** true  -> lock to FRONT (About) height
   *  false -> adapt to ACTIVE face height (About or Track Record) */
  lockToFrontHeight?: boolean;
  /** Fallback min height before we can measure */
  minHeight?: number;
};

export default function FlipCard({
  front,
  back,
  isFlipped,
  onToggle,
  className = '',
  lockToFrontHeight = false, // ← default to adaptive for your use case
  minHeight = 520,
}: Props) {
  // Visible host (we’ll mirror its width for accurate off-screen measuring)
  const hostRef = useRef<HTMLDivElement>(null);

  // Off-screen measurement refs
  const frontMeasureRef = useRef<HTMLDivElement>(null);
  const backMeasureRef  = useRef<HTMLDivElement>(null);

  const [measureW, setMeasureW] = useState<number | null>(null);
  const [frontH, setFrontH] = useState(minHeight);
  const [backH,  setBackH]  = useState(minHeight);

  // Mirror the visible width so the off-screen clones wrap text the same way
  useLayoutEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const set = () => setMeasureW(el.clientWidth);
    set();

    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Measure front/back natural heights from the off-screen clones
  useLayoutEffect(() => {
    const f = frontMeasureRef.current;
    const b = backMeasureRef.current;
    if (!f || !b) return;

    const setF = () => setFrontH(Math.max(minHeight, f.scrollHeight));
    const setB = () => setBackH (Math.max(minHeight, b.scrollHeight));

    setF(); setB();

    const roF = new ResizeObserver(setF);
    const roB = new ResizeObserver(setB);
    roF.observe(f);
    roB.observe(b);
    return () => { roF.disconnect(); roB.disconnect(); };
  }, [minHeight]);

  const activeH = isFlipped ? backH : frontH;
  const lockedH = frontH;
  const containerH = Math.max(minHeight, lockToFrontHeight ? lockedH : activeH);

  return (
    <div ref={hostRef} className={`relative w-full ${className}`}>
      {/* Height we control/animate */}
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
            {/* FRONT (absolute overlay) */}
            <div
              className={[
                'absolute inset-0 p-0',
                '[backface-visibility:hidden]',
                'transition-opacity duration-300',
                isFlipped ? 'opacity-0' : 'opacity-100',
              ].join(' ')}
            >
              {front}
            </div>

            {/* BACK (absolute overlay) */}
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

      {/* Off-screen measurement clones (don’t affect layout) */}
      <div
        aria-hidden
        className="fixed -left-[9999px] top-0 z-[-1] pointer-events-none"
        style={measureW ? { width: `${measureW}px` } : undefined}
      >
        <div ref={frontMeasureRef} className="p-0">{front}</div>
        <div ref={backMeasureRef}  className="p-0">{back}</div>
      </div>

      {/* SR-only button (AboutImpactCard renders the visible toggle) */}
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
