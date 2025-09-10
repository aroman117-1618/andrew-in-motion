'use client';

export type Props = {
  leftLabel: string;   // e.g., "About Me"
  rightLabel: string;  // e.g., "Track Record"
  isRight: boolean;    // true = right selected, false = left selected
  onChange: () => void;
  className?: string;
};

export default function FlipToggle({
  leftLabel,
  rightLabel,
  isRight,
  onChange,
  className = '',
}: Props) {
  // Click left tab -> flip only when we're currently on the right
  const flipToLeft = () => {
    if (isRight) onChange();
  };

  // Click right tab -> flip only when we're currently on the left
  const flipToRight = () => {
    if (!isRight) onChange();
  };

  return (
    <div
      className={
        `inline-flex items-center gap-1 rounded-full border border-white/15 ` +
        `bg-black/60 px-1 py-1 text-xs md:text-sm shadow-md ` +
        `backdrop-blur supports-[backdrop-filter]:backdrop-blur-md ` +
        `${className}`
      }
      role="tablist"
      aria-label={`${leftLabel} / ${rightLabel} toggle`}
    >
      <button
        type="button"
        role="tab"
        aria-selected={!isRight}
        onClick={flipToLeft}
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
        onClick={flipToRight}
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
