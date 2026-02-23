export function LogoPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium text-white/70 ring-1 ring-white/10 bg-white/5">
      {label}
    </span>
  );
}

export function MetricBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-lg md:text-xl font-bold text-white">{value}</div>
      <div className="text-[10px] md:text-xs text-white/50 mt-0.5">{label}</div>
    </div>
  );
}

export function QuoteLine({ quote, attribution }: { quote: string; attribution: string }) {
  return (
    <div className="absolute top-2 right-2 md:top-4 md:right-4 max-w-[240px] md:max-w-[280px] text-right z-10">
      <p className="text-[10px] md:text-xs text-emerald-400 font-bold italic leading-relaxed drop-shadow-sm">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="text-[9px] md:text-[10px] text-white/70 mt-1.5 not-italic font-medium">
        &mdash; {attribution}
      </p>
    </div>
  );
}
