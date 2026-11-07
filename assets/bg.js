/* NextLevel Dev — décor de fond : des lignes de code qui s'écrivent, restent un instant, puis s'effacent. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  var c = document.createElement('canvas');
  c.className = 'bg-code'; c.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(c, document.body.firstChild);
  root.classList.add('bg-on');
  var ctx = c.getContext('2d');
  var SNIPS = [
    'const site = await build({ fast: true, ai: true });',
    'export default function App() { return <Hero />; }',
    'git push origin main  // deploy auto',
    '<section class="hero"><h1>Next level.</h1></section>',
    'const reply = await claude.messages.create({ model, messages });',
    'npm run build && npm run deploy',
    '// { code. build. automate. innovate. }',
    'fetch("/api/agent", { method: "POST", body })',
    'SELECT * FROM clients WHERE statut = "actif";',
    'docker compose up -d --build',
    '@media (prefers-color-scheme: dark) { :root { --bg: #08080c; } }',
    'if (visitor.interested) { sendQuote(visitor); }',
    'import { chatbot } from "./ai/chatbot";',
    'async function ship() { await test(); await release(); }',
    'return <Card glow tilt float />;',
    'const rate = { day: 280, maintenance: 49 };',
    'while (true) { learn(); build(); ship(); }',
    '$ npx nextleveldev --init',
    'type Lead = { name: string; email: string; need: "site" | "ia" };',
    'await supabase.from("projets").select("*");'
  ];
  var KW = /^(const|let|var|await|async|export|default|function|return|import|from|if|while|type|true|false|new)$/;
  var W = 0, H = 0, dpr = 1, lines = [], MAX = 12, last = 0, FPS = 30;

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = window.innerWidth; H = window.innerHeight;
    c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    MAX = W < 700 ? 6 : 12; FPS = W < 700 ? 24 : 30;
  }
  function tokenize(s) {
    var out = [], re = /(\/\/.*$|"[^"]*"|'[^']*'|`[^`]*`|[A-Za-z_$][\w$]*|\s+|[^\w\s])/g, m;
    while ((m = re.exec(s))) {
      var t = m[0], col = '#9a9ea8';
      if (t.slice(0, 2) === '//') col = '#6b6f85';
      else if (/^["'`]/.test(t)) col = '#29d3ee';
      else if (KW.test(t)) col = '#a78bfa';
      else if (/^[{}()\[\];,<>=:.$]+$/.test(t)) col = '#6f7388';
      out.push({ t: t, c: col });
    }
    return out;
  }
  function spawn(now, instant) {
    var s = SNIPS[Math.floor(Math.random() * SNIPS.length)];
    var fs = 11 + Math.floor(Math.random() * 4);
    ctx.font = fs + 'px "JetBrains Mono", ui-monospace, monospace';
    var wpx = ctx.measureText(s).width;
    var x = Math.random() * Math.max(10, W - wpx - 20) + 10;
    lines.push({
      toks: tokenize(s), len: s.length, fs: fs, x: x, y: Math.random() * H, depth: 0.08 + Math.random() * 0.14,
      t0: now - (instant ? Math.random() * 4000 : 0), cps: 22 + Math.random() * 26,
      hold: 2200 + Math.random() * 3200, fade: 1600, amax: 0.12 + Math.random() * 0.1
    });
  }
  function draw(now) {
    ctx.clearRect(0, 0, W, H);
    var sy = window.scrollY || 0;
    for (var i = lines.length - 1; i >= 0; i--) {
      var l = lines[i], age = (now - l.t0) / 1000, typeT = l.len / l.cps * 1000, ms = now - l.t0, a;
      if (reduce) a = l.amax;
      else if (ms < typeT) a = l.amax;
      else if (ms < typeT + l.hold) a = l.amax;
      else if (ms < typeT + l.hold + l.fade) a = l.amax * (1 - (ms - typeT - l.hold) / l.fade);
      else { lines.splice(i, 1); continue; }
      var n = reduce ? l.len : Math.min(l.len, Math.floor(age * l.cps));
      var y = (((l.y - sy * l.depth) % H) + H) % H;
      ctx.font = l.fs + 'px "JetBrains Mono", ui-monospace, monospace';
      ctx.globalAlpha = a; ctx.textBaseline = 'top';
      var x = l.x, used = 0;
      for (var k = 0; k < l.toks.length && used < n; k++) {
        var tk = l.toks[k], txt = tk.t.slice(0, n - used);
        ctx.fillStyle = tk.c; ctx.fillText(txt, x, y);
        x += ctx.measureText(txt).width; used += txt.length;
      }
      if (n < l.len) { ctx.fillStyle = '#29d3ee'; ctx.globalAlpha = Math.min(0.5, a * 3); ctx.fillRect(x + 1, y, l.fs * 0.55, l.fs + 2); }
    }
    ctx.globalAlpha = 1;
  }
  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden || now - last < 1000 / FPS) return;
    last = now;
    if (lines.length < MAX && Math.random() < 0.08) spawn(now, false);
    draw(now);
  }
  size();
  window.addEventListener('resize', size);
  var t = performance.now();
  if (reduce) {
    for (var i = 0; i < 7; i++) spawn(t, true);
    draw(t); // image fixe, jamais effacée
    return;
  }
  for (var j = 0; j < Math.min(MAX, 8); j++) spawn(t, true);
  requestAnimationFrame(frame);
})();
