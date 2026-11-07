/* NextLevel Dev — landing « vivante », version fluide : aucune lecture de layout par image (positions mises en cache),
   valeurs lissées (lerp), boucle d'animation active seulement quand quelque chose bouge. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var root = document.documentElement;
  root.classList.add('fx-on');

  var GROUPS = [
    ['.value-grid .value-card', [0.09, -0.07, 0.12]],
    ['.svc-grid .svc-card', [0.1, -0.08, 0.14]],
    ['.process .process-step', [0.08, -0.06, 0.1, -0.08]],
    ['.work-grid .work-card', [0.12, -0.09, 0.15]],
    ['.rate-grid .rate-item', [0.08, -0.06, 0.1]],
    ['.cta-banner', [0.03]],
    ['.form-card', [0.03]]
  ];
  Array.prototype.forEach.call(document.querySelectorAll('.rate-grid'), function (g) { g.classList.remove('reveal', 'will-animate'); });

  var items = [], heads = [], vh = window.innerHeight, ticking = false, lastSy = -1;
  var narrow = function () { return window.innerWidth < 860; };
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function docTop(el) { var y = 0; while (el) { y += el.offsetTop; el = el.offsetParent; } return y; }

  GROUPS.forEach(function (g) {
    Array.prototype.forEach.call(document.querySelectorAll(g[0]), function (el, i) {
      el.classList.remove('reveal', 'will-animate');
      el.classList.add('fx-card');
      var n = g[1].length, col = i % n;
      el.style.setProperty('--ex', n > 1 ? (col === 0 ? '-46px' : col === n - 1 ? '46px' : '0px') : '0px');
      el.style.setProperty('--fx-delay', (col * 0.09) + 's');
      el.style.setProperty('--fx-dur', (6 + (i % 4)) + 's');
      el.style.setProperty('--fx-off', (-i * 1.3) + 's');
      items.push({ el: el, speed: g[1][col], alt: i % 2 ? -1 : 1, py: 0, tgt: { rx: 0, ry: 0 }, cur: { rx: 0, ry: 0 }, paused: false, in: false, live: false, base: 0, h: 0, hover: false });
    });
  });
  var heroFrame = document.querySelector('.hero-art-frame');
  if (heroFrame) {
    heroFrame.classList.add('fx-card', 'fx-in', 'fx-live');
    items.push({ el: heroFrame, speed: -0.08, alt: 1, py: 0, tgt: { rx: 0, ry: 0 }, cur: { rx: 0, ry: 0 }, paused: false, in: true, live: true, base: 0, h: 0, hero: true });
  }
  Array.prototype.forEach.call(document.querySelectorAll('.section-head'), function (h) {
    heads.push({ el: h, h2: h.querySelector('h2'), p: h.querySelector('p'), base: 0, hs: 1, ho: 1 });
  });
  var heroH1 = document.querySelector('.hero h1');
  var heroCopy = document.querySelector('.hero-grid > div');
  if (heroCopy) heroCopy.classList.add('hero-copy-fx');
  var bar = document.createElement('div'); bar.className = 'fx-progress'; document.body.appendChild(bar);

  function measure() {
    vh = window.innerHeight;
    items.forEach(function (it) { it.h = it.el.offsetHeight; it.base = docTop(it.el) + it.h / 2; });
    heads.forEach(function (h) { h.base = docTop(h.el) + h.el.offsetHeight / 2; });
    req();
  }

  function frame() {
    ticking = false;
    var sy = window.scrollY, moving = false, k = narrow() ? 0.45 : 1;
    var max = document.documentElement.scrollHeight - vh;
    if (sy !== lastSy) { root.style.setProperty('--fx-p', max > 0 ? (sy / max).toFixed(4) : 0); moving = true; }
    lastSy = sy;

    items.forEach(function (it) {
      var top = it.base - it.h / 2 - sy;
      var vis = top < vh + 220 && top + it.h > -220;
      if (!it.in && top < vh * 0.92) {
        it.in = true; it.el.classList.add('fx-in');
        setTimeout(function () { it.el.classList.add('fx-live'); it.live = true; }, 1400);
      }
      if (vis === it.paused) { it.paused = !vis; it.el.classList.toggle('fx-paused', !vis); }
      if (!vis) return;
      var speed = narrow() ? 0.05 * it.alt : it.speed;
      var target = clamp((it.base - sy - vh / 2) * speed * k, -70, 70);
      if (Math.abs(target - it.py) > 0.04) {
        it.py += (target - it.py) * 0.16; moving = true;
        it.el.style.setProperty('--py', it.py.toFixed(2) + 'px');
      }
      var c = it.cur, t = it.tgt;
      if (Math.abs(t.rx - c.rx) > 0.02 || Math.abs(t.ry - c.ry) > 0.02) {
        c.rx += (t.rx - c.rx) * 0.16; c.ry += (t.ry - c.ry) * 0.16; moving = true;
        it.el.style.setProperty('--rx', c.rx.toFixed(2));
        it.el.style.setProperty('--ry', c.ry.toFixed(2));
      }
    });

    heads.forEach(function (h) {
      var top = h.base - sy;
      if (top < -vh || top > vh * 2) return;
      var p = clamp(Math.abs((top - vh / 2) / (vh * 0.6)), 0, 1);
      var hs = 1.04 - p * 0.14, ho = 1 - p * 0.6;
      if (Math.abs(hs - h.hs) > 0.0004) {
        h.hs += (hs - h.hs) * 0.2; h.ho += (ho - h.ho) * 0.2; moving = true;
        if (h.h2) h.h2.style.setProperty('--hs', h.hs.toFixed(4));
        if (h.p) h.p.style.setProperty('--ho', h.ho.toFixed(3));
      }
    });

    if (heroH1 && heroCopy && sy < vh * 1.2) {
      var t = clamp(sy / (vh * 0.8), 0, 1);
      heroH1.style.scale = (1 - t * 0.12).toFixed(3);
      heroCopy.style.setProperty('--hy', (-t * 50).toFixed(1) + 'px');
      heroCopy.style.opacity = (1 - t * 0.7).toFixed(2);
    }
    if (moving) req();
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }

  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(document.body);
  if (window.NLD_I18N) window.NLD_I18N.onChange(function () { setTimeout(measure, 60); });
  measure();
  setInterval(function () { measure(); }, 2500); // filet : contenus qui changent de hauteur

  // inclinaison 3D + reflet au survol (souris uniquement)
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    items.forEach(function (it) {
      var el = it.el, max = it.hero ? 10 : 6;
      el.addEventListener('pointermove', function (e) {
        if (!it.live) return;
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        it.tgt.rx = (x - 0.5) * 2 * max; it.tgt.ry = (0.5 - y) * 2 * max;
        el.style.setProperty('--tx', ((x - 0.5) * 2).toFixed(2));
        el.style.setProperty('--ty', ((y - 0.5) * 2).toFixed(2));
        el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
        req();
      });
      el.addEventListener('pointerleave', function () { it.tgt.rx = 0; it.tgt.ry = 0; req(); });
    });
  }
})();
