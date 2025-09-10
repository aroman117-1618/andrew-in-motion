'use client';

type Props = { src: string; title: string };

export default function FigmaFrame({ src, title }: Props) {
  return (
    <div className="w-full">
      <iframe
        className="w-full aspect-[16/9] rounded-xl border border-white/10"
        src={src}
        title={title}
        allowFullScreen
      />
    </div>
  );
}
