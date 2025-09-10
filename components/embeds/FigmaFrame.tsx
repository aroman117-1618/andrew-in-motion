// components/embeds/FigmaFrame.tsx
'use client';

import { useEffect, useState } from 'react';

type Props = {
  src: string;        // cleaned /proto link
  title: string;
  minHeight?: number; // fallback before Figma reports
  maxWidthClass?: string; // e.g., "max-w-[980px]"
};

export default function FigmaFrame({
  src,
  title,
  minHeight = 720,
  maxWidthClass = "max-w-[980px]",
}: Props) {
  const [height, setHeight] = useState(minHeight);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (typeof e.data === 'object' && e.data?.type === 'embed:resize' && e.data?.height) {
        setHeight(e.data.height);
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className={`w-full ${maxWidthClass} mx-auto rounded-2xl overflow-hidden`}>
      <iframe
        title={title}
        src={`https://www.figma.com/embed?embed_host=andrewinmotion&url=${encodeURIComponent(src)}`}
        className="w-full border border-white/10"
        style={{ height }}
        allowFullScreen
      />
    </div>
  );
}