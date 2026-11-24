/* NextLevel Dev — intro d'entrée (une fois par visite) et arrivée animée après un changement de page.
   Chargé tout en haut du <body> pour éviter tout flash. Rien ne s'affiche si « réduire les animations » est activé. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pt = null, seen = true;
  try { pt = sessionStorage.getItem('nld-pt'); sessionStorage.removeItem('nld-pt'); seen = !!sessionStorage.getItem('nld-intro'); sessionStorage.setItem('nld-intro', '1'); } catch (e) { return; }
  if (reduce) return;
  var root = document.documentElement;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  if (pt) { // arrivée depuis une autre page du site : le rideau s'ouvre
    var info = {}; try { info = JSON.parse(pt) || {}; } catch (e) {}
    var o = document.createElement('div'); o.className = 'pt hold'; o.setAttribute('aria-hidden', 'true');
    o.innerHTML = info.t ? '<div class="pl"><small>NextLevel Dev</small><b>' + esc(info.t) + '</b><i></i></div>' : '<div class="pl"><i></i></div>';
    document.body.appendChild(o);
    var open = function () { o.classList.remove('hold'); o.classList.add('in'); void o.offsetWidth; o.classList.add('open'); o.classList.remove('in'); setTimeout(function () { if (o.parentNode) o.parentNode.removeChild(o); }, 600); };
    var done = false, go = function () { if (done) return; done = true; setTimeout(open, info.t ? 140 : 40); };
    if (document.readyState !== 'loading') go(); else { document.addEventListener('DOMContentLoaded', go); setTimeout(go, 900); }
    return;
  }
  if (seen) return;
  var en = /^en/i.test((function () { try { return localStorage.getItem('nld-lang') || ''; } catch (e) { return ''; } })() || root.lang || '');
  var d = document.createElement('div'); d.id = 'nld-intro'; d.setAttribute('role', 'presentation');
  d.innerHTML = '<div class="ip l"></div><div class="ip r"></div><div class="seam"></div>' +
    '<div class="ic"><div class="mk"><svg viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="ni-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a78bfa"/><stop offset="1" stop-color="#29d3ee"/></linearGradient></defs><path d="M24,80 V20 L76,80 V20"/></svg><img src="assets/logo-mark-320.webp" alt=""></div>' +
    '<div class="nm">NextLevel<span>Dev</span></div><div class="sl">' + (en ? 'Beyond limits' : 'Au-delà des limites') + '</div><div class="pb"><i></i></div></div>' +
    '<div class="sk">' + (en ? 'Click to skip' : 'Cliquer pour passer') + '</div>';
  document.body.appendChild(d); root.classList.add('intro-on');
  var closed = false;
  function close() { if (closed) return; closed = true; d.classList.add('out'); root.classList.remove('intro-on'); setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 850); document.removeEventListener('keydown', close); }
  d.addEventListener('click', close); document.addEventListener('keydown', close);
  setTimeout(close, 2000);
})();
