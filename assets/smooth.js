/* NextLevel Dev — défilement fluide (inertie) avec Lenis, auto-hébergé. Désactivé si reduced-motion. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof Lenis === 'undefined') return;
  document.documentElement.classList.add('lenis', 'lenis-smooth');
  window.NLD_LENIS = new Lenis({ autoRaf: true, lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95, anchors: { offset: -76 } });
})();
