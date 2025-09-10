'use client';
import { ReactNode } from 'react';

type Props = {
  front: ReactNode;
  back: ReactNode;
  isFlipped: boolean;
  onToggle: () => void;
  className?: string;
  heightClass?: string; // let you tweak height per use
};

export default function FlipCard({
  front,
  back,
  isFlipped,
  onToggle,
  className = '',
  heightClass = 'min-h-[380px] md:min-h-[460px]',
}: Props) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className={`mx-auto ${heightClass} [perspective:1200px]`}>
        <div
          className={[
            'relative h-full w-full rounded-2xl border border-white/10',
            'bg-black/30 supports-[backdrop-filter]:backdrop-blur-md',
            'transition-transform duration-500 [transform-style:preserve-3d]',
            'motion-reduce:transition-none',
            isFlipped ? '[transform:rotateY(180deg)]' : '',
          ].join(' ')}
        >
          <div className="absolute inset-0 p-4 md:p-6 [backface-visibility:hidden]">
            {front}
          </div>

          <div className="absolute inset-0 p-4 md:p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            {back}
          </div>
        </div>
      </div>

      {/* bottom-center toggle */}
      <button
        type="button"
        onClick={onToggle}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-sm font-medium shadow-md backdrop-blur supports-[backdrop-filter]:backdrop-blur-md hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/40"
        aria-pressed={isFlipped}
        aria-label="Flip card"
      >
        {isFlipped ? 'Show About' : 'Show Impact'}
      </button>
    </div>
  );
}
