'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;       // your cleaned prototype link
  title: string;
  minHeight?: number; // fallback height
};

export default function FigmaFrame({ src, title, minHeight = 720 }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(minHeight);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (typeof e.data === 'object' && e.data?.type === 'embed:resize') {
        // Figma sends { type: "embed:resize", height: number }
        if (e.data.height) {
          setHeight(e.data.height);
        }
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title={title}
      src={`https://www.figma.com/embed?embed_host=andrewinmotion&url=${encodeURIComponent(src)}`}
      className="w-full rounded-xl border border-white/10"
      style={{ height }}
      allowFullScreen
    />
  );
}
