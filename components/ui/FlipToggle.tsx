'use client';
type Props = {
  left: string;      // e.g., "About"
  right: string;     // e.g., "Impact"
  on: boolean;       // true = right selected
  onChange: (v: boolean) => void;
};
export default function FlipToggle({ left, right, on, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Flip card"
      className="inline-flex items-center rounded-full bg-white/10 border border-white/15 backdrop-blur px-1 py-1"
    >
      <button
        role="tab"
        aria-selected={!on}
        onClick={() => onChange(false)}
        className={[
          'px-3 py-1.5 text-sm rounded-full transition',
          !on ? 'bg-white text-black shadow' : 'text-white/90 hover:text-white',
        ].join(' ')}
      >
        {left}
      </button>
      <button
        role="tab"
        aria-selected={on}
        onClick={() => onChange(true)}
        className={[
          'px-3 py-1.5 text-sm rounded-full transition',
          on ? 'bg-white text-black shadow' : 'text-white/90 hover:text-white',
        ].join(' ')}
      >
        {right}
      </button>
    </div>
  );
}
