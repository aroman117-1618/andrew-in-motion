'use client';

import { useEffect, useState } from 'react';

type Props = {
  src: string;      
  title: string;
  minHeight?: number;
};

export default function FigmaFrame({ src, title, minHeight = 720 }: Props) {
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
    <iframe
      title={title}
      src={`https://www.figma.com/embed?embed_host=andrewinmotion&url=${encodeURIComponent(src)}`}
      className="w-full rounded-xl border border-white/10"
      style={{ height }}
      allowFullScreen
    />
  );
}
