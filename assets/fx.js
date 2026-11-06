/* NextLevel Dev — « site vivant » : entrées en cascade, parallaxe croisée, inclinaison 3D, titres dynamiques. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var root = document.documentElement;
  root.classList.add('fx-on');

  var GROUPS = [
    ['.value-grid .value-card', [0.09, -0.07, 0.12]],
    ['.svc-grid .svc-card', [0.1, -0.08, 0.14]],
    ['.process .process-step', [0.08, -0.06, 0.1, -0.08]],
    ['.work-grid .work-card', [0.12, -0.09, 0.15]],
    ['.rate-grid', [0.04]],
    ['.cta-banner', [0.03]],
    ['.form-card', [0.03]]
  ];
  var items = [];
  var narrow = function () { return window.innerWidth < 860; };

  GROUPS.forEach(function (g) {
    var els = document.querySelectorAll(g[0]);
    Array.prototype.forEach.call(els, function (el, i) {
      el.classList.remove('reveal', 'will-animate');
      el.classList.add('fx-card');
      var n = g[1].length, col = i % n;
      el.style.setProperty('--ex', n > 1 ? (col === 0 ? '-46px' : col === n - 1 ? '46px' : '0px') : '0px');
      el.style.setProperty('--fx-delay', (col * 0.09) + 's');
      el.style.setProperty('--fx-dur', (6 + (i % 4)) + 's');
      el.style.setProperty('--fx-off', (-i * 1.3) + 's');
      items.push({ el: el, speed: g[1][col], alt: i % 2 ? -1 : 1, py: 0, live: false });
    });
  });

  // hero : visuel qui flotte et réagit à la souris
  var heroFrame = document.querySelector('.hero-art-frame');
  if (heroFrame) {
    heroFrame.classList.add('fx-card', 'fx-in', 'fx-live');
    items.push({ el: heroFrame, speed: -0.08, alt: 1, py: 0, live: true, hero: true });
  }
  var heads = Array.prototype.slice.call(document.querySelectorAll('.section-head'));
  var heroH1 = document.querySelector('.hero h1');
  var heroCopy = document.querySelector('.hero-grid > div');
  if (heroCopy) heroCopy.classList.add('hero-copy-fx');

  var bar = document.createElement('div');
  bar.className = 'fx-progress';
  document.body.appendChild(bar);

  var vh = window.innerHeight, ticking = false;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function frame() {
    ticking = false;
    vh = window.innerHeight;
    var sy = window.scrollY, max = document.documentElement.scrollHeight - vh;
    root.style.setProperty('--fx-p', max > 0 ? (sy / max).toFixed(4) : 0);
    var k = narrow() ? 0.45 : 1;

    items.forEach(function (it) {
      var r = it.el.getBoundingClientRect();
      var center = r.top + r.height / 2 - it.py;
      var d = center - vh / 2;
      var speed = narrow() ? 0.05 * it.alt : it.speed;
      it.py = clamp(d * speed * k, -70, 70);
      it.el.style.setProperty('--py', it.py.toFixed(1) + 'px');
      var inView = r.bottom > -100 && r.top < vh + 100;
      it.el.classList.toggle('fx-paused', !inView);
      if (!it.live && !it.el.classList.contains('fx-in') && r.top < vh * 0.92) {
        it.el.classList.add('fx-in');
        setTimeout(function () { it.el.classList.add('fx-live'); it.live = true; }, 1300);
      }
    });

    heads.forEach(function (h) {
      var h2 = h.querySelector('h2'); if (!h2) return;
      var r = h.getBoundingClientRect();
      var p = clamp(Math.abs((r.top + r.height / 2 - vh / 2) / (vh * 0.6)), 0, 1);
      h.style.setProperty('--hs', (1.04 - p * 0.14).toFixed(3));
      h.style.setProperty('--ho', (1 - p * 0.6).toFixed(2));
      h2.style.setProperty('--hs', (1.04 - p * 0.14).toFixed(3));
      var pe = h.querySelector('p'); if (pe) pe.style.setProperty('--ho', (1 - p * 0.6).toFixed(2));
    });

    if (heroH1 && heroCopy) {
      var t = clamp(sy / (vh * 0.8), 0, 1);
      heroH1.style.scale = (1 - t * 0.12).toFixed(3);
      heroCopy.style.setProperty('--hy', (-t * 50).toFixed(1) + 'px');
      heroCopy.style.opacity = (1 - t * 0.7).toFixed(2);
    }
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', req);
  frame();
  setInterval(req, 700); // filet : aperçus intégrés / captures sans évènement scroll

  // inclinaison 3D + reflet au survol (souris uniquement)
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    items.forEach(function (it) {
      var el = it.el, max = it.hero ? 10 : 6;
      el.addEventListener('pointermove', function (e) {
        if (!it.live) return;
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--rx', ((x - 0.5) * 2 * max).toFixed(2));
        el.style.setProperty('--ry', ((0.5 - y) * 2 * max).toFixed(2));
        el.style.setProperty('--tx', ((x - 0.5) * 2).toFixed(2));
        el.style.setProperty('--ty', ((y - 0.5) * 2).toFixed(2));
        el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      });
      el.addEventListener('pointerleave', function () {
        ['--rx', '--ry', '--tx', '--ty'].forEach(function (p) { el.style.setProperty(p, 0); });
      });
    });
  }
})();
