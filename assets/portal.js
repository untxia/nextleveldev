/* NextLevel Dev — portail d'images cliquables, transitions de page, reflets au survol, site d'artisan qui se construit, bouton devis mobile. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function store(v) { try { sessionStorage.setItem('nld-pt', JSON.stringify(v)); return true; } catch (e) { return false; } }
  function clearOverlays() { $$('.pt, .pz').forEach(function (n) { n.parentNode.removeChild(n); }); }
  window.addEventListener('pageshow', function (e) { if (e.persisted) clearOverlays(); });

  /* reflet qui suit le pointeur + légère inclinaison des tuiles */
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('pointermove', function (e) {
      var el = e.target.closest ? e.target.closest('.pt-tile, .svc-card, .value-card, .work-card, .process-step, .rate-item, .tier-card') : null;
      if (!el) return;
      var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', (x * 100).toFixed(1) + '%'); el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      if (el.classList.contains('pt-tile')) { el.style.setProperty('--ry', ((x - .5) * 7).toFixed(2) + 'deg'); el.style.setProperty('--rx', ((.5 - y) * 6).toFixed(2) + 'deg'); }
    }, { passive: true });
    $$('.pt-tile').forEach(function (t) { t.addEventListener('pointerleave', function () { t.style.setProperty('--rx', '0deg'); t.style.setProperty('--ry', '0deg'); }); });
  }

  function plain(e, a) { return !(e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank' || a.hasAttribute('download')); }
  function samePage(a) { return a.pathname.replace(/index\.html$/, '') === location.pathname.replace(/index\.html$/, '') && a.search === location.search; }
  function jump(hash) {
    var t = hash && document.querySelector(hash); if (!t) return;
    var y = t.getBoundingClientRect().top + window.scrollY - 76;
    if (window.NLD_LENIS) window.NLD_LENIS.scrollTo(y, { immediate: true, force: true }); else window.scrollTo(0, y);
    try { history.replaceState(null, '', hash); } catch (e) {}
  }

  /* tuile du portail : l'image s'agrandit plein écran puis emmène à la rubrique */
  $$('.pt-tile').forEach(function (tile) {
    tile.addEventListener('click', function (e) {
      if (reduce || !plain(e, tile)) return;
      e.preventDefault();
      var r = tile.getBoundingClientRect(), v = tile.querySelector('.pt-v'), lab = tile.getAttribute('data-label') || (tile.querySelector('.pt-tx b') || {}).textContent || '';
      var z = document.createElement('div'); z.className = 'pz'; z.setAttribute('aria-hidden', 'true');
      z.style.cssText = 'top:' + r.top + 'px;left:' + r.left + 'px;width:' + r.width + 'px;height:' + r.height + 'px';
      if (v) z.appendChild(v.cloneNode(true));
      var pl = document.createElement('div'); pl.className = 'pl'; pl.innerHTML = '<small>NextLevel Dev</small><b></b>'; pl.querySelector('b').textContent = lab; z.appendChild(pl);
      document.body.appendChild(z); void z.offsetWidth; z.classList.add('full');
      if (samePage(tile) && tile.hash) {
        setTimeout(function () { jump(tile.hash); z.classList.add('bye'); setTimeout(function () { if (z.parentNode) z.parentNode.removeChild(z); }, 450); }, 900);
      } else {
        store({ t: lab });
        setTimeout(function () { location.href = tile.href; }, 780);
      }
    });
  });

  /* autres liens vers une page du site : rideau circulaire depuis le clic */
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || reduce || a.classList.contains('pt-tile') || !plain(e, a)) return;
    if (a.origin !== location.origin || !/\.html$|\/$/.test(a.pathname) || samePage(a)) return;
    if (!store({})) return;
    e.preventDefault();
    var o = document.createElement('div'); o.className = 'pt'; o.setAttribute('aria-hidden', 'true');
    o.style.setProperty('--px', e.clientX + 'px'); o.style.setProperty('--py', e.clientY + 'px');
    o.innerHTML = '<div class="pl"><i></i></div>'; document.body.appendChild(o); void o.offsetWidth; o.classList.add('in');
    setTimeout(function () { location.href = a.href; }, 290);
  });

  /* premier écran : un site d'artisan qui se construit */
  var hb = document.querySelector('.hb');
  if (hb) {
    var en = function () { return root.lang === 'en'; };
    var IC = {
      pain: '<svg viewBox="0 0 64 44"><ellipse cx="32" cy="26" rx="28" ry="15" fill="#c8843c"/><ellipse cx="32" cy="22" rx="26" ry="12" fill="#e2a45a"/><path d="M16,16 q4,8 0,14 M27,13 q4,9 0,18 M38,13 q4,9 0,18 M49,16 q4,8 0,14" stroke="#b06a28" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>',
      cle: '<svg viewBox="0 0 64 44"><path d="M10,34 L34,14" stroke="#e5e7eb" stroke-width="7" stroke-linecap="round"/><path d="M34,14 a10,10 0 1 0 12,-10 l-5,6 5,5 6,-5 a10,10 0 0 1 -18,4z" fill="#e5e7eb"/><path d="M52,24 q5,8 0,11 q-5,-3 0,-11z" fill="#7dd3fc"/></svg>',
      maison: '<svg viewBox="0 0 64 44"><path d="M8,22 L32,4 L56,22Z" fill="#b91c1c"/><rect x="14" y="22" width="36" height="20" fill="#fafaf9"/><rect x="28" y="28" width="8" height="14" fill="#7c2d12"/><rect x="18" y="26" width="7" height="7" fill="#7dd3fc"/><rect x="39" y="26" width="7" height="7" fill="#7dd3fc"/><path d="M14,22 v20 M50,22 v20" stroke="#b91c1c" stroke-width="2"/></svg>'
    };
    var TH = [
      { c: '#d97706', u: 'boulangerie-du-fronton.fr', n: 'Boulangerie du Fronton', h: ['Le pain du jour, cuit sur place', 'Fresh bread, baked on site'], i: 'pain' },
      { c: '#0284c7', u: 'plomberie-des-gaves.fr', n: 'Plomberie des Gaves', h: ['Dépannage rapide, devis clair', 'Fast repairs, clear quotes'], i: 'cle' },
      { c: '#15803d', u: 'gite-les-hortensias.fr', n: 'Gîte Les Hortensias', h: ['Votre séjour au calme', 'Your quiet getaway'], i: 'maison' }
    ];
    var q = function (s) { return hb.querySelector(s); }, k = 0, timers = [];
    function later(f, ms) { timers.push(setTimeout(f, ms)); }
    function labels() { q('.hb-btn').textContent = en() ? 'Call' : 'Appeler'; q('.hb-map b').textContent = en() ? 'Google listing' : 'Fiche Google'; q('.hb-map small').textContent = en() ? 'Found near you' : 'Trouvé près de chez vous'; q('.hb-live').textContent = en() ? '● Live' : '● En ligne'; q('.hb-tag').textContent = en() ? 'Demo example — fictional business' : 'Exemple de démonstration — commerce fictif'; }
    function play() {
      var t = TH[k % TH.length]; k++;
      hb.className = 'hb'; hb.style.setProperty('--hc', t.c);
      q('.hb-url').textContent = t.u; q('.hb-nav em').textContent = t.n; q('.hb-ph').innerHTML = IC[t.i]; q('.hb-h').textContent = ''; labels();
      var txt = t.h[en() ? 1 : 0];
      if (reduce) { q('.hb-h').textContent = txt; hb.className = 'hb s1 s2 s3 s4 s5'; return; }
      later(function () { hb.classList.add('s1'); }, 250);
      later(function () { hb.classList.add('s2'); for (var i = 1; i <= txt.length; i++) (function (n) { later(function () { q('.hb-h').textContent = txt.slice(0, n); }, n * 38); })(i); }, 700);
      later(function () { hb.classList.add('s3'); }, 2100);
      later(function () { hb.classList.add('s4'); }, 2800);
      later(function () { hb.classList.add('s5'); }, 3500);
      later(function () { hb.classList.add('fade'); }, 6600);
      later(function () { timers = []; play(); }, 7000);
    }
    play();
    try { new MutationObserver(function () { labels(); }).observe(root, { attributes: true, attributeFilter: ['lang'] }); } catch (e) {}
  }

  /* bouton devis flottant (mobile) */
  var fab = document.querySelector('.fab'), contact = document.getElementById('contact');
  if (fab && contact) {
    var near = false, upd = function () { var v = document.documentElement.getAttribute('data-v'); fab.classList.toggle('on', v ? (v !== 'contact' && v !== 'home') : (window.scrollY > 520 && !near)); };
    window.addEventListener('nld:view', function () { upd(); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { near = es[0].isIntersecting; upd(); }, { rootMargin: '0px 0px -10% 0px' }).observe(contact);
    window.addEventListener('scroll', upd, { passive: true }); upd();
  }
})();

/* ---------- menu plein écran + animations liées au défilement ---------- */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement, en = function () { return root.lang === 'en'; };
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  var home = !!document.getElementById('explorer'), base = home ? '' : 'index.html';

  /* rubriques du site */
  var ITEMS = [
    ['Accueil', 'Home', 'Retour au début', 'Back to the top', base + '#top'],
    ['Les offres', 'Offers', 'Sites à prix fixe', 'Fixed-price websites', 'boutique.html'],
    ['Services', 'Services', 'Ce que je fais', 'What I do', base + '#services'],
    ['Méthode', 'Process', '4 étapes', '4 steps', base + '#process'],
    ['Projets', 'Projects', 'ChantierBot, CVlink, MoodCast', 'ChantierBot, CVlink, MoodCast', base + '#projets'],
    ['Contact', 'Contact', 'Réponse rapide', 'Quick reply', base + '#contact']
  ];
  function go(a, before) {
    var same = a.pathname.replace(/index\.html$/, '') === location.pathname.replace(/index\.html$/, '');
    if (same && a.hash) {
      var t = document.querySelector(a.hash); if (!t) { if (before) before(); return; }
      var r = a.getBoundingClientRect();
      if (window.NLD_WARP) window.NLD_WARP(r.left + r.width / 2, r.top + r.height / 2, t, a.hash, a.getAttribute('data-t'), before);
    } else {
      try { sessionStorage.setItem('nld-pt', JSON.stringify({ t: a.getAttribute('data-t') })); } catch (er) {}
      if (!reduce) { var o = document.createElement('div'); o.className = 'pt'; o.setAttribute('aria-hidden', 'true'); var r = a.getBoundingClientRect(); o.style.setProperty('--px', (r.left + r.width / 2) + 'px'); o.style.setProperty('--py', (r.top + r.height / 2) + 'px'); o.innerHTML = '<div class="pl"><i></i></div>'; document.body.appendChild(o); void o.offsetWidth; o.classList.add('in'); }
      setTimeout(function () { location.href = a.href; }, reduce ? 0 : 280);
    }
  }

  /* accueil : le menu affiché en large, la main vient pointer puis appuyer sur la rubrique choisie */
  var hs = document.querySelector('.hs');
  if (hs) {
    var PTS = [[11, 36], [22, 36], [44, 37], [58, 48], [78, 50], [92, 52]]; // position du bout du doigt sur chaque image (en %)
    var LY = [19, 5, 19, 5, 21, 7], cur = 2, tgt = 2, stepT = 0, onArrive = null, busy = false;
    var draw = function () {
      var F = '', C = '', B = '';
      ITEMS.forEach(function (it, r) {
        var t = en() ? it[1] : it[0], d = en() ? it[3] : it[2];
        F += '<img src="assets/menu-hand-' + (r + 1) + '.webp" alt="" width="864" height="642" decoding="async"' + (r === cur ? ' class="on"' : '') + '>';
        C += '<a class="mn-chip" href="' + it[4] + '" data-i="' + r + '" data-t="' + t + '" style="--x:' + PTS[r][0] + '%;--y:' + PTS[r][1] + '%;--ly:' + LY[r] + '%;--r:' + r + '"><span class="lb"><b>' + t + '</b><small>' + d + '</small></span><i></i></a>';
        B += '<a class="hs-b" href="' + it[4] + '" data-i="' + r + '" data-t="' + t + '"><b>' + t + '</b><small>' + d + '</small></a>';
      });
      var lab = en() ? 'Sections' : 'Rubriques';
      hs.innerHTML = '<div class="hw"><nav class="hw-chips" aria-label="' + lab + '">' + C + '</nav><div class="hw-stage"><div class="mn-st hw-img"><div class="mn-fr" aria-hidden="true">' + F + '</div><span class="mn-rg" aria-hidden="true"></span></div></div><svg class="hw-lines" aria-hidden="true"></svg></div><nav class="hs-list" aria-label="' + lab + '">' + B + '</nav>';
      setTimeout(lines, 0);
    };
    /* fils qui relient chaque rubrique au point touché par le doigt */
    var lines = function () {
      var hw = hs.querySelector('.hw'), svg = hs.querySelector('.hw-lines'), img = hs.querySelector('.hw-img');
      if (!hw || !svg || !img || !hw.offsetWidth) return;
      var R = hw.getBoundingClientRect(), B = img.getBoundingClientRect(), h = '';
      var ar = 864 / 642, I = { left: B.left, top: B.top, width: B.width, height: B.height };
      if (B.width / B.height > ar) { I.width = B.height * ar; I.left = B.left + (B.width - I.width) / 2; } else { I.height = B.width / ar; I.top = B.top + (B.height - I.height) / 2; }
      svg.setAttribute('viewBox', '0 0 ' + R.width + ' ' + R.height);
      $$('.mn-chip', hs).forEach(function (c) {
        var i = +c.getAttribute('data-i'), C = c.getBoundingClientRect();
        var x1 = C.left + C.width / 2 - R.left, y1 = C.bottom - R.top + 4;
        var x2 = I.left - R.left + I.width * PTS[i][0] / 100, y2 = I.top - R.top + I.height * PTS[i][1] / 100;
        var my = y1 + (y2 - y1) * .55;
        h += '<path data-i="' + i + '" d="M' + x1.toFixed(1) + ',' + y1.toFixed(1) + ' C' + x1.toFixed(1) + ',' + my.toFixed(1) + ' ' + x2.toFixed(1) + ',' + (y2 - (y2 - y1) * .35).toFixed(1) + ' ' + x2.toFixed(1) + ',' + y2.toFixed(1) + '"/><circle data-i="' + i + '" cx="' + x2.toFixed(1) + '" cy="' + y2.toFixed(1) + '" r="5"/>';
      });
      svg.innerHTML = '<defs><linearGradient id="hwg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a78bfa"/><stop offset="1" stop-color="#29d3ee"/></linearGradient></defs>' + h;
    };
    window.addEventListener('resize', function () { lines(); });
    window.addEventListener('load', function () { lines(); setTimeout(lines, 400); });
    hs.addEventListener('load', function () { lines(); }, true);
    if ('ResizeObserver' in window) new ResizeObserver(function () { lines(); }).observe(hs);
    window.addEventListener('nld:view', function (e) { if (e.detail === 'home') setTimeout(lines, 30); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(lines);
    hs.setAttribute('data-i18n-skip', ''); draw();
    try { new MutationObserver(function () { if (!busy) draw(); }).observe(root, { attributes: true, attributeFilter: ['lang'] }); } catch (e) {}
    var frame = function (i) { cur = i; $$('.mn-fr img', hs).forEach(function (im, k) { im.classList.toggle('on', k === i); }); };
    var step = function () { stepT = 0; if (cur === tgt) { if (onArrive) { var f = onArrive; onArrive = null; f(); } return; } frame(cur + (tgt > cur ? 1 : -1)); stepT = setTimeout(step, reduce ? 0 : 40); };
    var point = function (i, cb) { tgt = i; onArrive = cb || null; if (!stepT) step(); };
    var hot = function (i) { $$('.mn-chip, .hs-b, .hw-lines path, .hw-lines circle', hs).forEach(function (c) { c.classList.toggle('hot', +c.getAttribute('data-i') === i); }); };
    hs.addEventListener('pointerover', function (e) { if (busy) return; var a = e.target.closest('.mn-chip, .hs-b'); if (a) { point(+a.getAttribute('data-i')); hot(+a.getAttribute('data-i')); } });
    hs.addEventListener('focusin', function (e) { if (busy) return; var a = e.target.closest('.mn-chip, .hs-b'); if (a) { point(+a.getAttribute('data-i')); hot(+a.getAttribute('data-i')); } });
    hs.addEventListener('pointerleave', function () { if (!busy) hot(-1); });
    hs.addEventListener('click', function (e) {
      var a = e.target.closest('.mn-chip, .hs-b'); if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      e.preventDefault(); if (busy) return; busy = true;
      var i = +a.getAttribute('data-i'); hot(i);
      point(i, function () {
        var rg = hs.querySelector('.mn-rg'), st = hs.querySelector('.mn-st');
        rg.style.setProperty('--x', PTS[i][0] + '%'); rg.style.setProperty('--y', PTS[i][1] + '%'); rg.classList.remove('go'); void rg.offsetWidth; rg.classList.add('go');
        st.classList.remove('press'); void st.offsetWidth; st.classList.add('press');
        setTimeout(function () { busy = false; go(a); }, reduce ? 0 : 200);
      });
    });
    window.addEventListener('pageshow', function (e) { if (e.persisted) { busy = false; hot(-1); } });
  }

  /* mobile : bouton Menu et liste plein écran (sur ordinateur, la barre du haut suffit) */
  var navRight = document.querySelector('.nav .nav-right') || document.querySelector('.nav .nav-inner') || document.querySelector('.nav');
  if (navRight) {
    var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'mn-btn'; btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'nld-menu'); btn.setAttribute('data-i18n-skip', '');
    btn.innerHTML = '<span class="bars" aria-hidden="true"></span><span class="tx">Menu</span>';
    navRight.appendChild(btn);
    var mn = document.createElement('div'); mn.className = 'mn'; mn.id = 'nld-menu'; mn.setAttribute('aria-hidden', 'true'); mn.setAttribute('data-i18n-skip', '');
    var render = function () {
      var L = '';
      ITEMS.forEach(function (it, r) {
        var t = en() ? it[1] : it[0], w = '';
        for (var i = 0; i < t.length; i++) w += '<span style="--i:' + i + '">' + (t[i] === ' ' ? '&nbsp;' : t[i]) + '</span>';
        L += '<a href="' + it[4] + '" data-t="' + t + '" style="--r:' + r + '"><span class="mw" aria-label="' + t + '">' + w + '</span><small>' + (en() ? it[3] : it[2]) + '</small></a>';
      });
      mn.innerHTML = '<div class="mn-bg"></div><button type="button" class="mn-x" aria-label="' + (en() ? 'Close menu' : 'Fermer le menu') + '"></button><div class="mn-in"><nav class="mn-links" aria-label="Menu">' + L + '</nav></div><div class="mn-ft"><span>Pays Basque &amp; Béarn · ' + (en() ? 'fully remote possible' : '100 % à distance possible') + '</span><a href="mailto:chris@nextleveldev.fr">chris@nextleveldev.fr</a></div>';
    };
    render(); document.body.appendChild(mn);
    try { new MutationObserver(function () { if (!mn.classList.contains('open')) render(); }).observe(root, { attributes: true, attributeFilter: ['lang'] }); } catch (e) {}
    var openM = function () {
      var r = btn.getBoundingClientRect(); mn.style.setProperty('--ox', (r.left + r.width / 2) + 'px'); mn.style.setProperty('--oy', (r.top + r.height / 2) + 'px');
      mn.classList.add('open'); mn.setAttribute('aria-hidden', 'false'); btn.setAttribute('aria-expanded', 'true'); root.classList.add('mn-lock');
      if (window.NLD_LENIS) window.NLD_LENIS.stop();
      setTimeout(function () { var x = mn.querySelector('.mn-x'); if (x) x.focus({ preventScroll: true }); }, 350);
    };
    var closeM = function () { mn.classList.remove('open'); mn.setAttribute('aria-hidden', 'true'); btn.setAttribute('aria-expanded', 'false'); root.classList.remove('mn-lock'); if (window.NLD_LENIS) window.NLD_LENIS.start(); };
    btn.addEventListener('click', openM);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mn.classList.contains('open')) { closeM(); btn.focus(); } });
    mn.addEventListener('click', function (e) {
      if (e.target.closest('.mn-x')) { closeM(); btn.focus(); return; }
      var a = e.target.closest('.mn-links a'); if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      e.preventDefault(); go(a, closeM);
    });
    window.addEventListener('pageshow', function (e) { if (e.persisted) closeM(); });
  }

  /* bande de mots qui défile, accélérée par le défilement */
  var mq = document.querySelector('.mq');
  if (mq) {
    var W = [['Sites vitrines', 'Applications web', 'Outils IA', 'Sur mesure', 'Pays Basque', 'Béarn'], ['Showcase sites', 'Web apps', 'AI tools', 'Custom-built', 'Basque Country', 'Béarn']];
    var track = mq.querySelector('.mq-t'), x = 0, half = 0, vel = 0, dir = -1, lastY = window.scrollY, vis = true, raf = 0;
    var fill = function () { var h = ''; W[en() ? 1 : 0].forEach(function (w) { h += '<span>' + w + '<b>✦</b></span>'; }); track.innerHTML = h + h + h + h; half = track.scrollWidth / 4; };
    fill(); try { new MutationObserver(fill).observe(root, { attributes: true, attributeFilter: ['lang'] }); } catch (e) {}
    if (!reduce) {
      var tick = function () {
        var y = window.scrollY, d = y - lastY; lastY = y; if (d) dir = d > 0 ? -1 : 1;
        vel += (Math.min(40, Math.abs(d)) - vel) * .12;
        x += dir * (.6 + vel * .55); if (x <= -half) x += half; if (x > 0) x -= half;
        track.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0)';
        raf = vis ? requestAnimationFrame(tick) : 0;
      };
      if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis && !raf) raf = requestAnimationFrame(tick); }).observe(mq); else raf = requestAnimationFrame(tick);
    }
  }

  /* phrase dont les mots s'allument au fil du défilement */
  var sw = document.querySelector('.sw'), words = [];
  function swFill() { if (!sw) return; var t = sw.getAttribute(en() ? 'data-en' : 'data-fr') || '', h = '', k = false; t.split(/(\*)/).forEach(function (part) { if (part === '*') { k = !k; return; } part.split(/(\s+)/).forEach(function (w) { h += /^\s*$/.test(w) ? w : '<span' + (k ? ' class="k"' : '') + '>' + w + '</span>'; }); }); sw.innerHTML = h; words = $$('span', sw); swUpd(); }
  function swUpd() { if (!sw || !words.length) return; if (document.documentElement.classList.contains('views')) { words.forEach(function (w) { w.classList.add('on'); }); return; } var r = sw.getBoundingClientRect(), vh = window.innerHeight, p = (vh * .88 - r.top) / (r.height + vh * .42), n = Math.round(Math.max(0, Math.min(1, p)) * words.length); if (reduce) n = words.length; for (var i = 0; i < words.length; i++) words[i].classList.toggle('on', i < n); }
  if (sw) { swFill(); try { new MutationObserver(swFill).observe(root, { attributes: true, attributeFilter: ['lang'] }); } catch (e) {} }

  /* méthode : la ligne se remplit et les étapes s'allument */
  var pr = document.querySelector('.process'), steps = pr ? $$('.process-step', pr) : [], line = null;
  if (pr && steps.length && !reduce) { line = document.createElement('div'); line.className = 'pr-line'; line.setAttribute('aria-hidden', 'true'); line.innerHTML = '<i></i>'; pr.insertBefore(line, pr.firstChild); pr.classList.add('pr-on'); }
  var prT0 = 0; window.addEventListener('nld:view', function (e) { if (e.detail === 'process' && line) { prT0 = performance.now(); (function tick() { prUpd(); if (performance.now() - prT0 < 1800) requestAnimationFrame(tick); })(); } if (e.detail === 'services') swUpd(); });
  function prUpd() { if (!line) return; var r = pr.getBoundingClientRect(), vh = window.innerHeight, p = Math.max(0, Math.min(1, (vh * .82 - r.top) / (r.height + vh * .3))); if (prT0) p = Math.min(1, (performance.now() - prT0) / 1600); line.style.setProperty('--pp', p.toFixed(3)); steps.forEach(function (s, i) { s.classList.toggle('lit', p > (i + .35) / steps.length || p >= .98); }); }

  var pend = false;
  function onScroll() { if (pend) return; pend = true; requestAnimationFrame(function () { pend = false; swUpd(); prUpd(); }); }
  if (sw || line) { window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll); onScroll(); }
})();

/* ---------- dématérialiser la page puis la rematérialiser sur la rubrique visée ---------- */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var running = false;
  function label(a, t) {
    var l = a.getAttribute('data-t') || (a.querySelector && a.querySelector('b') ? a.querySelector('b').textContent : a.textContent) || '';
    l = l.replace(/\s+/g, ' ').trim();
    if (!l || l.length > 28) { var h = t.querySelector('h2'); l = h ? h.textContent.trim() : ''; }
    return l.length > 40 ? '' : l;
  }
  function scrollTo(t, hash) {
    if (window.NLD_VIEW && window.NLD_VIEW.show(hash, true)) return;
    var y = hash === '#top' ? 0 : t.getBoundingClientRect().top + window.scrollY - 76;
    if (window.NLD_LENIS) window.NLD_LENIS.scrollTo(y, { immediate: true, force: true }); else window.scrollTo(0, y);
    try { history.replaceState(null, '', hash); } catch (e) {}
  }
  window.NLD_WARP = function (x, y, target, hash, text, before, nopush) {
    if (reduce || running) { if (before) before(); if (nopush && window.NLD_VIEW) window.NLD_VIEW.show(hash, false); else scrollTo(target, hash); return; }
    running = true;
    var W = window.innerWidth, H = window.innerHeight, size = W < 600 ? 46 : 64;
    var cols = Math.ceil(W / size), rows = Math.ceil(H / size), cx = Math.min(cols - 1, Math.floor(x / size)), cy = Math.min(rows - 1, Math.floor(y / size));
    var wp = document.createElement('div'); wp.className = 'wp busy'; wp.setAttribute('aria-hidden', 'true');
    wp.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)'; wp.style.gridTemplateRows = 'repeat(' + rows + ', 1fr)';
    var h = '', maxD = 0, k;
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) { k = Math.hypot(c - cx, r - cy); maxD = Math.max(maxD, k); h += '<i' + (Math.random() < .07 ? ' class="hot"' : '') + ' data-k="' + k.toFixed(2) + '"></i>'; }
    wp.innerHTML = h + '<div class="wl"><small>NextLevel Dev</small><b></b></div>';
    wp.querySelector('.wl b').textContent = text || '';
    if (!text) wp.querySelector('.wl').style.display = 'none';
    document.body.appendChild(wp);
    var cells = wp.querySelectorAll('i'), span = 220, i;
    for (i = 0; i < cells.length; i++) cells[i].style.setProperty('--d', (cells[i].getAttribute('data-k') / maxD * span).toFixed(0) + 'ms');
    void wp.offsetWidth; wp.classList.add('on');
    setTimeout(function () {
      if (before) before();
      if (nopush && window.NLD_VIEW) window.NLD_VIEW.show(hash, false); else scrollTo(target, hash);
      for (i = 0; i < cells.length; i++) cells[i].style.setProperty('--d', (cells[i].getAttribute('data-k') / maxD * span * .9).toFixed(0) + 'ms');
      setTimeout(function () {
        wp.classList.remove('on', 'busy');
        setTimeout(function () { if (wp.parentNode) wp.parentNode.removeChild(wp); running = false; }, span + 240);
      }, text ? 110 : 40);
    }, span + 160);
  };
  /* liens vers une rubrique de la même page (barre du haut, boutons) */
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.closest('#hand-menu, .mn')) return;
    var href = a.getAttribute('href') || '';
    var same = href.charAt(0) === '#' || (a.origin === location.origin && a.pathname.replace(/index\.html$/, '') === location.pathname.replace(/index\.html$/, '') && a.hash);
    if (!same || !a.hash || a.hash.length < 2) return;
    var t = document.querySelector(a.hash); if (!t) return;
    e.preventDefault(); e.stopPropagation();
    window.NLD_WARP(e.clientX || window.innerWidth / 2, e.clientY || 60, t, a.hash, label(a, t));
  }, true);
})();

/* ---------- une rubrique à la fois (accueil) ---------- */
(function () {
  var main = document.querySelector('main'), parts = main ? Array.prototype.slice.call(main.querySelectorAll('[data-view]')) : [];
  if (!parts.length) return;
  var root = document.documentElement, cur = '';
  function viewOf(hash) {
    if (!hash || hash === '#' || hash === '#top') return { v: 'home', el: null };
    var el = null; try { el = document.querySelector(hash); } catch (e) {}
    if (!el) return null;
    var sec = el.closest('[data-view]');
    return sec ? { v: sec.getAttribute('data-view'), el: el.hasAttribute('data-view') ? null : el } : null;
  }
  function apply(v, deep) {
    cur = v; root.setAttribute('data-v', v);
    parts.forEach(function (p) { p.classList.toggle('v-on', p.getAttribute('data-view') === v); });
    document.querySelectorAll('.nav-links a').forEach(function (a) { var r = viewOf(a.getAttribute('href')); a.classList.toggle('on', !!r && r.v === v && v !== 'home'); });
    var y = 0;
    if (deep) y = Math.max(0, deep.getBoundingClientRect().top + window.scrollY - 90);
    if (window.NLD_LENIS) window.NLD_LENIS.scrollTo(y, { immediate: true, force: true }); else window.scrollTo(0, y);
    try { window.dispatchEvent(new CustomEvent('nld:view', { detail: v })); } catch (e) {}
  }
  window.NLD_VIEW = {
    show: function (hash, push) {
      var r = viewOf(hash); if (!r) return false;
      apply(r.v, r.el);
      if (push) { try { history.pushState({ v: r.v }, '', r.v === 'home' ? location.pathname : hash); } catch (e) {} }
      return true;
    },
    current: function () { return cur; }
  };
  root.classList.add('views');
  var start = viewOf(location.hash) || { v: 'home', el: null };
  apply(start.v, start.el);
  window.addEventListener('popstate', function () {
    var r = viewOf(location.hash) || { v: 'home', el: null };
    if (r.v === cur) return;
    if (window.NLD_WARP) window.NLD_WARP(window.innerWidth / 2, window.innerHeight / 2, document.body, location.hash || '#top', '', null, true);
    else apply(r.v, r.el);
  });
})();

/* ---------- précharger les autres pages pour qu'elles s'ouvrent tout de suite ---------- */
(function () {
  var done = {};
  function pre(href) { if (!href || done[href]) return; done[href] = 1; var l = document.createElement('link'); l.rel = 'prefetch'; l.href = href; document.head.appendChild(l); }
  var pages = ['index.html', 'boutique.html', 'contact.html'];
  var idle = window.requestIdleCallback || function (f) { setTimeout(f, 1200); };
  window.addEventListener('load', function () { idle(function () { pages.forEach(function (p) { if (location.pathname.indexOf(p) === -1) pre(p); }); }); });
  document.addEventListener('pointerover', function (e) { var a = e.target.closest && e.target.closest('a[href$=".html"]'); if (a && a.origin === location.origin) pre(a.pathname.replace(/^\//, '')); }, { passive: true });
})();

/* ---------- bandeau de l'offre : les morceaux du message défilent l'un après l'autre ---------- */
(function () {
  var tk = document.querySelector('.lb-tk'); if (!tk) return;
  var ms = tk.querySelectorAll('.lb-m'), k = 0, pause = false;
  if (ms.length < 2) return;
  tk.parentNode.addEventListener('pointerenter', function () { pause = true; });
  tk.parentNode.addEventListener('pointerleave', function () { pause = false; });
  setInterval(function () {
    if (pause || document.hidden) return;
    var a = ms[k]; k = (k + 1) % ms.length; var b = ms[k];
    a.classList.remove('on'); a.classList.add('out');
    b.classList.remove('out'); b.classList.add('on');
    setTimeout(function () { a.classList.remove('out'); }, 520);
  }, 2200);
})();
