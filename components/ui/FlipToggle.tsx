'use client';

export type Props = {
  /** Text for the left option (e.g., "About Me") */
  leftLabel: string;
  /** Text for the right option (e.g., "Track Record") */
  rightLabel: string;
  /** If true, right option is selected; if false, left option is selected */
  isRight: boolean;
  /** Toggle handler (flip left/right) */
  onChange: () => void;
  /** Optional extra classes on the wrapper */
  className?: string;
};

export default function FlipToggle({
  leftLabel,
  rightLabel,
  isRight,
  onChange,
  className = '',
}: Props) {
  return (
    <div
      className={
        `inline-flex items-center gap-1 rounded-full border border-white/15 ` +
        `bg-black/60 px-1 py-1 text-xs md:text-sm shadow-md ` +
        `backdrop-blur supports-[backdrop-filter]:backdrop-blur-md ` +
        `${className}`
      }
      role="tablist"
      aria-label="About / Track Record toggle"
    >
      <button
        type="button"
        role="tab"
        aria-selected={!isRight}
        onClick={() => !isRight && onChange()}
        className={
          `rounded-full px-3 py-1 font-medium transition ` +
          `${!isRight ? 'bg-white text-black' : 'text-white/80 hover:text-white'}`
        }
      >
        {leftLabel}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={isRight}
        onClick={() => isRight && onChange()}
        className={
          `rounded-full px-3 py-1 font-medium transition ` +
          `${isRight ? 'bg-white text-black' : 'text-white/80 hover:text-white'}`
        }
      >
        {rightLabel}
      </button>
    </div>
  );
}
