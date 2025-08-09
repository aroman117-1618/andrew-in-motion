import React, { useEffect, useRef } from ‘react’;
import ‘./MorphoOrb.css’;

const MorphoOrb = () => {
const orbRef = useRef(null);

useEffect(() => {
// Add performance optimizations based on device capabilities
const prefersReducedMotion = window.matchMedia(’(prefers-reduced-motion: reduce)’);
const isLowPerformanceDevice = navigator.hardwareConcurrency < 4;

```
if (orbRef.current) {
  if (prefersReducedMotion.matches || isLowPerformanceDevice) {
    orbRef.current.style.animationDuration = '8s'; // Slower for accessibility/performance
  }
}
```

}, []);

return (
<div className="morpho-orb-container">
<div ref={orbRef} className="morpho-orb" />

```
  {/* Your main content goes here */}
  <div className="content-overlay">
    <header className="site-header">
      <h1>Andrew Lonati</h1>
      <p>GTM Systems & Customer Success Automation</p>
    </header>
    
    <main className="main-content">
      <section className="hero-section">
        <h2>Streamline Your Operations</h2>
        <p>Transforming go-to-market strategies through intelligent automation and customer success optimization.</p>
        <button className="cta-button">Get Started</button>
      </section>
    </main>
  </div>
</div>
```

);
};

export default MorphoOrb;