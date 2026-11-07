/* NextLevel Dev — les lettres des titres et textes d'accroche arrivent de partout et se replacent en phrase. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var SEL = 'h1, h2, h3, .hero-lede, .section-head p';
  var root = document.documentElement;
  var targets = [], runs = [];
  var COLORS = ['var(--violet-2)', 'var(--cyan)', '#c4b5fd', 'var(--cyan)'];
  var BAD = 'input,textarea,select,button,img,svg,iframe,a';

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function norm(s) { return s.replace(/[\s ]+/g, ' ').trim(); }

  function collect() {
    var docH = document.documentElement.scrollHeight, vh = window.innerHeight;
    Array.prototype.forEach.call(document.querySelectorAll(SEL), function (el) {
      if (el.closest('[data-i18n-skip]') || el.closest('nav,.nav') || el.querySelector(BAD)) return;
      var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null), nodes = [], t;
      while ((t = w.nextNode())) { if (t.nodeValue.trim()) nodes.push(t); }
      if (!nodes.length) return;
      var top = el.getBoundingClientRect().top + window.scrollY;
      var entry = { el: el, runs: [], done: false, down: top + vh * 0.8 < docH };
      nodes.forEach(function (n) {
        var run = document.createElement('span');
        run.className = 'lt-run';
        run.setAttribute('aria-hidden', 'true');
        run.setAttribute('data-fr', n.nodeValue);
        n.parentNode.replaceChild(run, n);
        entry.runs.push(run);
        runs.push({ run: run, entry: entry, grad: !!run.closest('.grad') });
      });
      el.setAttribute('data-i18n-skip', '');
      targets.push(entry);
    });
  }

  function build(r, text) {
    var run = r.run, entry = r.entry;
    run.textContent = '';
    var parts = text.split(/(\s+)/), letters = [], inGrad = r.grad;
    var frag = document.createDocumentFragment();
    parts.forEach(function (p) {
      if (!p) return;
      if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
      var w = document.createElement('span'); w.className = 'lt-w';
      Array.prototype.forEach.call(p, function (ch) {
        var s = document.createElement('span'); s.className = 'lt'; s.textContent = ch;
        var close = Math.random() < 0.18;          // quelques lettres arrivent de face, en gros plan
        s.style.setProperty('--lx', (close ? rnd(-30, 30) : rnd(-80, 80)).toFixed(0) + 'vw');
        s.style.setProperty('--ly', (close ? rnd(-20, 20) : (entry.down ? rnd(-60, 55) : rnd(-65, -8))).toFixed(0) + 'vh');
        s.style.setProperty('--lz', (close ? rnd(330, 560) : rnd(-520, 120)).toFixed(0) + 'px');
        s.style.setProperty('--lr', rnd(-220, 220).toFixed(0) + 'deg');
        s.style.setProperty('--lax', rnd(-0.6, 0.6).toFixed(2) + ' ' + rnd(0.4, 1).toFixed(2) + ' ' + rnd(-0.5, 0.5).toFixed(2));
        s.style.setProperty('--ls', (close ? 1 : rnd(0.45, 0.9)).toFixed(2));
        s.style.setProperty('--lb', (close ? rnd(7, 15) : 0).toFixed(0) + 'px');
        s.style.setProperty('--lc', COLORS[Math.floor(Math.random() * COLORS.length)]);
        w.appendChild(s); letters.push(s);
      });
      frag.appendChild(w);
    });
    run._t = text;
    run.appendChild(frag);
    var n = letters.length;
    letters.forEach(function (s, i) {
      if (inGrad) { s.style.setProperty('--gi', i); s.style.setProperty('--gn', Math.max(n, 2)); }
    });
  }

  // recolle les fragments sans espace entre eux (ex. « rapides » + « , sur mesure ») pour éviter une coupure de ligne
  function glue(entry) {
    for (var i = 1; i < entry.runs.length; i++) {
      var prev = entry.runs[i - 1], cur = entry.runs[i];
      if (/\s$/.test(prev._t || ' ') || /^\s/.test(cur._t || ' ')) continue;
      var pw = prev.querySelectorAll('.lt-w'), lw = pw[pw.length - 1], fw = cur.querySelector('.lt-w');
      if (!lw || !fw) continue;
      while (fw.firstChild) lw.appendChild(fw.firstChild);
      fw.parentNode.removeChild(fw);
    }
  }

  // dernier mot des titres h1/h2 : dégradé aux couleurs du site
  function accent(e) {
    if (!/^H[12]$/.test(e.el.tagName) || e.el.querySelector('.grad')) return;
    var vis = e.runs.filter(function (r) { return r.offsetParent !== null; });
    var last = (vis.length ? vis : e.runs).slice(-1)[0];
    if (!last) return;
    var ws = last.querySelectorAll('.lt-w'), w = ws[ws.length - 1];
    if (!w) return;
    var ls = w.querySelectorAll('.lt');
    Array.prototype.forEach.call(ls, function (l, i) {
      l.classList.add('lt-acc'); l.style.setProperty('--gi', i); l.style.setProperty('--gn', Math.max(ls.length, 2));
    });
  }

  function layoutDelays() {
    targets.forEach(function (e) {
      var ls = e.el.querySelectorAll('.lt'), step = Math.min(0.03, 0.7 / Math.max(ls.length, 1));
      Array.prototype.forEach.call(ls, function (s, i) { s.style.setProperty('--ld', (i * step + Math.random() * 0.18).toFixed(3) + 's'); });
      var vis = e.runs.filter(function (r) { return r.offsetParent !== null; });
      e.el.setAttribute('aria-label', norm((vis.length ? vis : e.runs).map(function (r) { return r.textContent; }).join('')));
    });
  }

  function render() {
    var I = window.NLD_I18N, en = I && I.lang() === 'en';
    runs.forEach(function (r) {
      var fr = r.run.getAttribute('data-fr'), text = fr;
      if (en && I) {
        var lead = fr.match(/^\s*/)[0], trail = fr.match(/\s*$/)[0];
        text = lead + I.t(fr) + trail;
      }
      build(r, text);
      if (r.entry.done) r.entry.el.classList.add('lt-in');
    });
    targets.forEach(function (e) { glue(e); accent(e); });
    layoutDelays();
  }

  var ticking = false;
  function check() {
    ticking = false;
    var vh = window.innerHeight;
    targets.forEach(function (e) {
      if (e.done) return;
      var rc = e.el.getBoundingClientRect();
      if (!e.warm && rc.top < vh * 1.5) { e.warm = true; e.el.classList.add('lt-warm'); }
      if (rc.top < vh * 0.9) {
        e.done = true; e.el.classList.add('lt-in');
        setTimeout(function () { e.el.classList.remove('lt-warm'); }, 3400);
      }
    });
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(check); } }

  function start() {
    if (!targets.length) return;
    root.classList.add('lt-on');
    render();
    if (window.NLD_I18N) window.NLD_I18N.onChange(render);
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    check();
    setInterval(req, 700);
  }
  // collecte immédiate (le script est placé avant l'i18n : on lit donc le texte français d'origine)
  collect();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
