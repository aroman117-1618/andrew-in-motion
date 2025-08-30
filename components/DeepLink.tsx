'use client';

import { useEffect, useRef } from 'react';

type Platform = 'ios' | 'android' | 'other';
const getPlatform = (): Platform => {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent || '';
  if (/Android/i.test(ua)) return 'android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  return 'other';
};

type Props = {
  webUrl: string;
  iosSchemeUrl?: string;
  androidIntentUrl?: string;
  className?: string;
  children?: React.ReactNode;
  timeoutMs?: number;
  target?: '_self' | '_blank';
};

export default function DeepLink({
  webUrl,
  iosSchemeUrl,
  androidIntentUrl,
  className,
  children,
  timeoutMs = 700,
  target = '_self',
}: Props) {
  const t = useRef<number | null>(null);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const p = getPlatform();
    const hasIOS = !!iosSchemeUrl;
    const hasAndroid = !!androidIntentUrl;

    if ((p === 'ios' && hasIOS) || (p === 'android' && hasAndroid)) {
      e.preventDefault();

      t.current = window.setTimeout(() => {
        target === '_blank' ? window.open(webUrl, '_blank') : (window.location.href = webUrl);
      }, timeoutMs);

      const tryUrl = p === 'ios' ? iosSchemeUrl! : androidIntentUrl!;
      window.location.href = tryUrl;
    }
    // else: let the normal href work
  };

  useEffect(() => () => { if (t.current) window.clearTimeout(t.current); }, []);
  return (
    <a href={webUrl} onClick={onClick} className={className} target={target}
       rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
      {children ?? webUrl}
    </a>
  );
}