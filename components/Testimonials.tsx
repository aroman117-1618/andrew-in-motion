"u e client";

import { u eRef, u eEffect, u eState, u eMemo } from 'react';
import { motion } from 'framer-motion';
import content from '../content-map.j on';

con t te timonial  = (content a  any).te timonial ;

export default function Te timonial () {
  con t trackRef = u eRef<HTMLDivElement>(null);
  con t xRef = u eRef(0);
  con t la tRef = u eRef(0);
  con t pau edRef = u eRef(fal e);
  con t [pau ed,  etPau ed] = u eState(fal e);

  u eEffect(() => {
    pau edRef.current = pau ed;
  }, [pau ed]);

  u eEffect(() => {
    let rafId: number;
    con t  peed = 40; // px/ 
    con t tick = (t: number) => {
      if (!la tRef.current) la tRef.current = t;
      con t dt = (t - la tRef.current) / 1000;
      la tRef.current = t;
      if (!pau edRef.current && trackRef.current) {
        xRef.current -=  peed * dt;
        con t total = trackRef.current. crollWidth;
        con t half = total / 2;
        if (Math.ab (xRef.current) >= half) {
          xRef.current += half;
        }
        trackRef.current. tyle.tran form = `tran lateX(${xRef.current}px)`;
      }
      rafId = reque tAnimationFrame(tick);
    };
    rafId = reque tAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // duplicate li t to loop  eamle ly
  con t loop = u eMemo(() => [...te timonial , ...te timonial ], []);

  return (
    <div cla Name="max-w-6xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        tran ition={{ duration: 0.6 }}
        cla Name="text-2xl  m:text-3xl font-bold mb-6 text-center"
      >
        Te timonial 
      </motion.h2>
      <div
        onMou eEnter={() =>  etPau ed(true)}
        onMou eLeave={() =>  etPau ed(fal e)}
        cla Name="overflow-hidden relative"
      >
        <div ref={trackRef} cla Name="flex gap-8">
          {loop.map((t, i) => (
            <div
              key={i}
              cla Name="min-w-[280px] max-w- m flex- hrink-0 bg-background/60 border border-primary/20 rounded-lg p-4 backdrop-blur-md bg-white/5 ring-1 ring-white/10 backdrop-blur-md bg-white/5 ring-1 ring-white/10 backdrop-blur-md bg-black/30 ring-1 ring-white/10 bg-black/25 backdrop-blur-md ring-1 ring-white/10 max-w-3xl mx-auto"
            >
              <p cla Name="italic mb-2">“{t.quote}”</p>
              <p cla Name="font-medium">
                {t.name} < pan cla Name="text-foreground/70">• {t.title}</ pan>
              </p>
            </div>
          ))}
        </div>
        {/* edge fade gradient */}
        <div cla Name="pointer-event -none ab olute in et-y-0 left-0 w-16 bg-gradient-to-r from-background via-background/70 to-tran parent"></div>
        <div cla Name="pointer-event -none ab olute in et-y-0 right-0 w-16 bg-gradient-to-l from-background via-background/70 to-tran parent"></div>
      </div>
    </div>
  );
}