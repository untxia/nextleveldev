/* Thème du mois — change tout seul au 1er de chaque mois (date du visiteur).
   Aperçu d'un autre mois : ajouter ?mois=12 à l'adresse de la page (1 à 12). */
(function () {
  var CFG = [
    { fr: 'Bonne année {Y} !', en: 'Happy New Year {Y}!', icon: '🎆', tint: '#f5c542', kind: 'confetti', n: 44, cols: ['#22d3ee', '#8b5cf6', '#f5c542', '#ff6b9a', '#e8e8f0'] },
    { fr: 'Février : le froid s’installe', en: 'February: the cold sets in', icon: '❄️', tint: '#7dd3fc', kind: 'snow', n: 55, cols: ['#e0f2fe', '#bae6fd', '#ffffff'], slow: 1 },
    { fr: 'Mars : le printemps arrive', en: 'March: spring is on its way', icon: '🌱', tint: '#86efac', kind: 'petal', n: 36, cols: ['#fbcfe8', '#f9a8d4', '#bbf7d0', '#fde68a'] },
    { fr: 'Joyeuses Pâques !', en: 'Happy Easter!', icon: '🐣', tint: '#fcd34d', kind: 'egg', n: 20, cols: ['#f9a8d4', '#fde68a', '#a5f3fc', '#c4b5fd', '#bbf7d0'] },
    { fr: 'Mai : les beaux jours sont là', en: 'May: the sunny days are here', icon: '☀️', tint: '#fbbf24', kind: 'pollen', n: 40, cols: ['#fde68a', '#fcd34d', '#bef264'] },
    { fr: 'Juin : c’est l’été !', en: 'June: summer is here!', icon: '🌞', tint: '#fb923c', kind: 'sun', n: 22, cols: ['#fde68a', '#fdba74', '#ffffff'] },
    { fr: 'Juillet : bonnes vacances !', en: 'July: happy holidays!', icon: '🏖️', tint: '#22d3ee', kind: 'bubble', n: 30, cols: ['#67e8f9', '#a5f3fc', '#ffffff'] },
    { fr: 'Août : plage ou montagne ?', en: 'August: beach or mountains?', icon: '🌊', tint: '#38bdf8', kind: 'waves', n: 14, cols: ['#38bdf8', '#22d3ee', '#818cf8'] },
    { fr: 'Septembre : c’est la rentrée !', en: 'September: back to school!', icon: '🎒', tint: '#f87171', kind: 'pencil', n: 24, cols: ['#f87171', '#fbbf24', '#60a5fa', '#34d399', '#a78bfa'] },
    { fr: 'Octobre : l’automne et ses couleurs', en: 'October: autumn colours', icon: '🎃', tint: '#fb923c', kind: 'leaf', n: 34, cols: ['#ea580c', '#f59e0b', '#b91c1c', '#a16207', '#7c3aed'] },
    { fr: 'Novembre : l’automne s’installe', en: 'November: autumn settles in', icon: '🍂', tint: '#d97706', kind: 'leaf', n: 34, cols: ['#d97706', '#b45309', '#92400e', '#ca8a04', '#9a3412'] },
    { fr: 'Joyeux Noël et bonnes fêtes !', en: 'Merry Christmas & happy holidays!', icon: '🎄', tint: '#f87171', kind: 'xmas', n: 50, cols: ['#ffffff', '#e0f2fe', '#fecaca'] }
  ];
  var now = new Date(), month = now.getMonth(), year = now.getFullYear();
  try { var q = parseInt(new URLSearchParams(location.search).get('mois'), 10); if (q >= 1 && q <= 12) month = q - 1; } catch (e) {}
  var C = CFG[month];
  if (month === 0 && now.getMonth() !== 0) year += 1; // aperçu de janvier : année à venir
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  root.style.setProperty('--season', C.tint);
  root.setAttribute('data-season', String(month + 1));

  function txt() { var en = root.lang === 'en'; return (en ? C.en : C.fr).replace('{Y}', String(year)); }
  // sprites animés du bandeau : [emoji, mouvement, nombre]
  var SPR = [
    [['🎆','twinkle',5],['✨','twinkle',6],['🥂','bob',2],['🎉','fall',4]],
    [['❄️','fall',7],['⛄','bob',2],['🧣','drift',1],['🧊','twinkle',3]],
    [['🌸','fall',6],['🌷','bob',3],['🦋','drift',2],['🐝','driftl',1]],
    [['🥚','bob',4],['🐰','drift',1],['🐣','bob',2],['🌼','fall',4],['🐇','driftl',1]],
    [['☀️','twinkle',2],['🌻','bob',3],['🦋','drift',2],['🌼','fall',3],['🐝','driftl',1]],
    [['☀️','bob',2],['🍦','bob',2],['🕶️','drift',1],['🌴','bob',2],['🍉','driftl',1]],
    [['🏖️','bob',2],['🌊','drift',2],['🩴','bob',2],['⛱️','bob',2],['🫧','rise',5]],
    [['🌊','drift',2],['🐚','bob',2],['⛰️','bob',2],['🦀','driftl',1],['🫧','rise',5],['🏔️','bob',1]],
    [['✏️','drift',2],['🎒','bob',2],['📚','bob',2],['📐','driftl',1],['🍎','fall',3],['🖍️','bob',2]],
    [['🍁','fall',7],['🍂','fall',6],['🎃','bob',2],['🦇','drift',2],['👻','driftl',1]],
    [['🍂','fall',7],['🍁','fall',5],['🍄','bob',3],['🌰','fall',3],['🦔','drift',1],['🍃','driftl',2]],
    [['🎄','bob',3],['🎅','drift',1],['🦌','driftl',1],['⛄','bob',2],['❄️','fall',7],['🎁','bob',2],['⭐','twinkle',4]]
  ];
  var TINT2 = ['#22d3ee','#c4b5fd','#f9a8d4','#fbbf24','#86efac','#fdba74','#67e8f9','#818cf8','#60a5fa','#a855f7','#b45309','#22c55e'];
  root.style.setProperty('--season2', TINT2[month]);
  function r(a, b) { return a + Math.random() * (b - a); }
  var bar = document.createElement('div');
  bar.className = 'season-bar'; bar.setAttribute('role', 'status');
  bar.innerHTML = '<span class="si" aria-hidden="true"></span><span class="st"></span>';
  bar.firstChild.textContent = C.icon;
  SPR[month].forEach(function (g) {
    for (var i = 0; i < g[2]; i++) {
      var s = document.createElement('span'); s.className = 'sp ' + g[1]; s.setAttribute('aria-hidden', 'true'); s.textContent = g[0];
      s.style.fontSize = r(.9, 1.5).toFixed(2) + 'rem';
      s.style.setProperty('--y', r(8, 62).toFixed(0) + '%'); s.style.setProperty('--x', r(2, 96).toFixed(0) + '%');
      s.style.setProperty('--d', (g[1] === 'drift' || g[1] === 'driftl' ? r(16, 30) : g[1] === 'fall' ? r(3.5, 7) : g[1] === 'rise' ? r(4, 8) : r(2, 4)).toFixed(1) + 's');
      s.style.setProperty('--dl', (-r(0, 12)).toFixed(1) + 's');
      bar.appendChild(s);
    }
  });
  function setText() { bar.querySelector('.st').textContent = txt(); }
  setText();
  document.body.insertBefore(bar, document.body.firstChild);
  try { new MutationObserver(setText).observe(root, { attributes: true, attributeFilter: ['lang'] }); } catch (e) {}

  var cv = document.createElement('canvas'); cv.className = 'bg-season'; cv.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cv);
  var ctx = cv.getContext('2d'), W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.5), P = [], t0 = performance.now();
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function spawn(init) {
    var k = C.kind, p = { x: rnd(0, W), y: init ? rnd(0, H) : rnd(-40, -10), s: rnd(5, 12), a: rnd(0, 6.28), va: rnd(-.02, .02), vx: rnd(-.25, .25), vy: rnd(.35, 1), c: pick(C.cols), ph: rnd(0, 6.28), al: rnd(.35, .75) };
    if (k === 'snow') { p.s = rnd(2.5, 7); p.vy = rnd(.25, .8) * (C.slow ? .8 : 1); p.al = rnd(.4, .9); }
    if (k === 'xmas') { p.s = rnd(2, 6); p.vy = rnd(.3, .9); p.al = rnd(.4, .9); }
    if (k === 'confetti') { p.s = rnd(5, 9); p.vy = rnd(.5, 1.5); p.vx = rnd(-.6, .6); p.al = rnd(.5, .9); }
    if (k === 'pollen') { p.s = rnd(2, 6); p.vy = -rnd(.1, .4); p.y = init ? rnd(0, H) : H + 10; p.al = rnd(.25, .6); }
    if (k === 'bubble') { p.s = rnd(4, 14); p.vy = -rnd(.25, .8); p.y = init ? rnd(0, H) : H + 20; p.al = rnd(.25, .6); }
    if (k === 'egg') { p.s = rnd(9, 15); p.vy = rnd(.3, .6); p.al = rnd(.45, .8); }
    if (k === 'pencil') { p.s = rnd(9, 15); p.vy = rnd(.4, .9); p.al = rnd(.5, .85); }
    if (k === 'sun') { p.s = rnd(3, 7); p.vy = -rnd(.05, .25); p.y = init ? rnd(0, H) : H + 10; p.al = rnd(.3, .7); }
    if (k === 'waves') { p.s = rnd(3, 8); p.vy = -rnd(.1, .35); p.y = init ? rnd(H * .5, H) : H + 10; p.al = rnd(.25, .5); }
    return p;
  }
  function size() {
    W = window.innerWidth; H = window.innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.round(C.n * Math.min(1, W / 1200) + 8); P = []; for (var i = 0; i < n; i++) P.push(spawn(true));
  }
  function leaf(p) { var s = p.s; ctx.beginPath(); ctx.moveTo(0, -s); ctx.quadraticCurveTo(s * .95, 0, 0, s); ctx.quadraticCurveTo(-s * .95, 0, 0, -s); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, -s); ctx.lineTo(0, s); ctx.stroke(); }
  function flake(p) { var s = p.s; ctx.strokeStyle = p.c; ctx.lineWidth = 1.2; ctx.beginPath(); for (var i = 0; i < 3; i++) { var a = i * Math.PI / 3; ctx.moveTo(Math.cos(a) * s, Math.sin(a) * s); ctx.lineTo(-Math.cos(a) * s, -Math.sin(a) * s); } ctx.stroke(); }
  function ell(rx, ry) { ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 6.283); ctx.fill(); }
  function star(s) { ctx.beginPath(); for (var i = 0; i < 8; i++) { var r = i % 2 ? s * .25 : s, a = i * Math.PI / 4; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); ctx.fill(); }
  function draw(p, t) {
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.globalAlpha = p.al; ctx.fillStyle = p.c;
    switch (C.kind) {
      case 'leaf': leaf(p); break;
      case 'snow': case 'xmas': if (p.s > 4.5) { flake(p); } else { ctx.beginPath(); ctx.arc(0, 0, p.s * .6, 0, 6.283); ctx.fill(); } break;
      case 'petal': ell(p.s * .55, p.s * .95); break;
      case 'egg': ell(p.s * .62, p.s); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-p.s * .55, p.s * .1); ctx.lineTo(p.s * .55, p.s * .1); ctx.stroke(); break;
      case 'confetti': ctx.scale(1, Math.sin(p.ph + t * .004)); ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); break;
      case 'pollen': case 'sun': { var g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.s * 2); g.addColorStop(0, p.c); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, p.s * 2, 0, 6.283); ctx.fill(); if (C.kind === 'sun') { ctx.fillStyle = p.c; star(p.s); } break; }
      case 'bubble': case 'waves': ctx.strokeStyle = p.c; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(0, 0, p.s, 0, 6.283); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.arc(-p.s * .35, -p.s * .35, p.s * .18, 0, 6.283); ctx.fill(); break;
      case 'pencil': ctx.fillRect(-p.s * .13, -p.s, p.s * .26, p.s * 1.6); ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.moveTo(-p.s * .13, p.s * .6); ctx.lineTo(p.s * .13, p.s * .6); ctx.lineTo(0, p.s); ctx.closePath(); ctx.fill(); break;
      default: ctx.fillRect(-2, -2, 4, 4);
    }
    ctx.restore();
  }
  function scenery(t) {
    var k = C.kind;
    if (k === 'sun') {
      ctx.save(); ctx.translate(W * .9, -20); ctx.globalAlpha = .16; var g = ctx.createRadialGradient(0, 0, 0, 0, 0, 420); g.addColorStop(0, '#fbbf24'); g.addColorStop(1, 'rgba(251,191,36,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 420, 0, 6.283); ctx.fill();
      ctx.rotate(t * .00006); ctx.globalAlpha = .08; ctx.fillStyle = '#fde68a'; for (var i = 0; i < 12; i++) { ctx.rotate(Math.PI / 6); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(560, -26); ctx.lineTo(560, 26); ctx.closePath(); ctx.fill(); } ctx.restore();
    } else if (k === 'pollen') {
      ctx.save(); ctx.globalAlpha = .1; var g2 = ctx.createRadialGradient(W * .85, 0, 0, W * .85, 0, 480); g2.addColorStop(0, '#fbbf24'); g2.addColorStop(1, 'rgba(251,191,36,0)'); ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H); ctx.restore();
    } else if (k === 'waves') {
      for (var w = 0; w < 3; w++) { ctx.save(); ctx.globalAlpha = .13 + w * .05; ctx.fillStyle = C.cols[w]; ctx.beginPath(); ctx.moveTo(0, H); for (var x = 0; x <= W; x += 16) { ctx.lineTo(x, H - 36 - w * 22 + Math.sin(x * .012 + t * .0011 * (w + 1) + w) * (10 + w * 3)); } ctx.lineTo(W, H); ctx.closePath(); ctx.fill(); ctx.restore(); }
    } else if (k === 'xmas') {
      ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 1.2; ctx.beginPath(); var n = Math.ceil(W / 70), pts = [];
      for (var i = 0; i <= n; i++) { var x0 = i * 70, y0 = 84 + Math.sin(i * Math.PI) * 0; pts.push([x0, y0]); }
      ctx.moveTo(0, 82); for (var j = 0; j < n; j++) { ctx.quadraticCurveTo(j * 70 + 35, 112, (j + 1) * 70, 82); } ctx.stroke();
      var lc = ['#ef4444', '#22c55e', '#fbbf24', '#38bdf8', '#e879f9'];
      for (var b = 0; b < n; b++) { var bx = b * 70 + 35, by = 104, on = reduce ? 1 : (Math.sin(t * .003 + b * 1.7) > -.3 ? 1 : .35); ctx.globalAlpha = .75 * on; ctx.fillStyle = lc[b % 5]; ctx.beginPath(); ctx.arc(bx, by, 4, 0, 6.283); ctx.fill(); ctx.globalAlpha = .18 * on; ctx.beginPath(); ctx.arc(bx, by, 11, 0, 6.283); ctx.fill(); }
      ctx.restore();
    }
  }
  function step(t) {
    ctx.clearRect(0, 0, W, H); scenery(t);
    for (var i = 0; i < P.length; i++) {
      var p = P[i];
      if (!reduce) {
        p.ph += .02; p.x += p.vx + Math.sin(p.ph) * (C.kind === 'leaf' || C.kind === 'petal' ? .7 : .25); p.y += p.vy; p.a += p.va;
        if (p.y > H + 30 || p.y < -50 || p.x < -40 || p.x > W + 40) { var q = spawn(false); if (q.vy < 0) { q.y = H + 20; } P[i] = q; p = q; }
      }
      draw(p, t);
    }
  }
  var raf = 0;
  function loop(t) { step(t - t0); raf = requestAnimationFrame(loop); }
  size();
  window.addEventListener('resize', function () { size(); if (reduce) step(0); });
  if (reduce) { step(0); } else {
    raf = requestAnimationFrame(loop);
    document.addEventListener('visibilitychange', function () { if (document.hidden) { cancelAnimationFrame(raf); } else { raf = requestAnimationFrame(loop); } });
  }
  window.NLD_SEASON = { month: month + 1 };
})();
