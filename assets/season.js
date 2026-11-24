/* Thème du mois — scène illustrée animée dans le header.
   Change tout seul au 1er de chaque mois (date du visiteur).
   Aperçu d'un autre mois : ajouter ?mois=12 à l'adresse de la page (1 à 12). */
(function () {
  var TXT = [
    ['Bonne année {Y} !', 'Happy New Year {Y}!', '#f5c542'],
    ['Février : le froid s’installe', 'February: the cold sets in', '#7dd3fc'],
    ['Mars : le printemps arrive', 'March: spring is on its way', '#86efac'],
    ['Joyeuses Pâques !', 'Happy Easter!', '#fcd34d'],
    ['Mai : les beaux jours sont là', 'May: the sunny days are here', '#fbbf24'],
    ['Juin : c’est l’été !', 'June: summer is here!', '#fb923c'],
    ['Juillet : bonnes vacances !', 'July: happy holidays!', '#22d3ee'],
    ['Août : plage ou montagne ?', 'August: beach or mountains?', '#38bdf8'],
    ['Septembre : c’est la rentrée !', 'September: back to school!', '#f87171'],
    ['Octobre rose : mobilisés contre le cancer du sein', 'Pink October: standing together against breast cancer', '#ec4899'],
    ['Movember : des moustaches contre les cancers masculins', 'Movember: moustaches against men’s cancers', '#3b82f6'],
    ['Joyeux Noël et bonnes fêtes !', 'Merry Christmas & happy holidays!', '#f87171']
  ];
  var SKY = [['#06060f', '#221548'], ['#0a1220', '#2b4666'], ['#0b1424', '#2a5a68'], ['#0c1526', '#3a6076'], ['#0c1830', '#3f7494'], ['#1a1238', '#b8583a'], ['#0b1a3a', '#2f80aa'], ['#0e1a38', '#c2704a'], ['#10142c', '#5c4c80'], ['#170d24', '#80305f'], ['#0a1124', '#27447c'], ['#060916', '#1d2e5a']];

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function dk(h, f) { f = f == null ? .7 : f; var n = parseInt(h.slice(1), 16); return 'rgb(' + ((n >> 16) * f | 0) + ',' + (((n >> 8) & 255) * f | 0) + ',' + ((n & 255) * f | 0) + ')'; }
  function S(vb, inner, cls) { return '<svg' + (cls ? ' class="' + cls + '"' : '') + ' viewBox="' + vb + '" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>'; }
  var SH = 'fill="url(#ss-shade)"';
  var STACHE = 'M0,0 C.25,-.35 .7,-.35 .9,-.05 C1,.1 1.15,.05 1.2,-.15 C1.2,.25 .8,.35 .55,.2 C.35,.1 .15,.15 0,.25Z';
  function stache(x, y, s, col) { return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')" fill="' + col + '"><path d="' + STACHE + '"/><path transform="scale(-1,1)" d="' + STACHE + '"/></g>'; }
  function ribbon(x, y, s, col) { return '<path transform="translate(' + x + ',' + y + ') scale(' + s + ')" d="M-.45,1 C-.1,.2 .55,-.5 0,-.85 C-.55,-.5 .1,.2 .45,1" fill="none" stroke="' + col + '" stroke-width=".3" stroke-linecap="round"/>'; }

  /* ---------- personnage ---------- */
  function person(o) {
    o = o || {};
    var sk = o.skin || '#f0c8a4', sh = o.shirt || '#8b5cf6', pa = o.pants || '#2a3350', ha = o.hair || '#3a2a20', HX = 40.4, HY = 31.5, s = '';
    s += '<ellipse cx="20" cy="62.6" rx="10" ry="1.5" fill="rgba(0,0,0,.4)"/>';
    if (o.acc === 'backpack') s += '<rect x="5.5" y="20.5" width="9" height="16" rx="3.5" fill="' + (o.accCol || '#ef4444') + '"/><rect x="5.5" y="20.5" width="9" height="16" rx="3.5" ' + SH + '/>';
    s += '<g class="am-a"><rect x="10.4" y="21.5" width="4.8" height="16.5" rx="2.4" fill="' + dk(sh) + '"/><circle cx="12.8" cy="38.4" r="2.4" fill="' + dk(sk, .85) + '"/></g>';
    s += '<g class="lg-a"><rect x="14.4" y="38" width="5.6" height="20.5" rx="2.8" fill="' + dk(pa) + '"/><rect x="14" y="57" width="8.6" height="4.6" rx="2.3" fill="#15151d"/></g>';
    s += '<g class="lg-b"><rect x="19.8" y="38" width="5.6" height="20.5" rx="2.8" fill="' + pa + '"/><rect x="19.4" y="57" width="8.6" height="4.6" rx="2.3" fill="#262633"/></g>';
    s += '<rect x="12" y="19.5" width="16" height="23" rx="6.5" fill="' + sh + '"/><rect x="12" y="19.5" width="16" height="23" rx="6.5" ' + SH + '/>';
    if (o.ribbon) s += ribbon(22.5, 28.5, 3.4, o.ribbon);
    if (o.acc === 'ring') s += '<ellipse cx="20" cy="36" rx="13" ry="4.6" fill="none" stroke="#f97316" stroke-width="4.4"/><ellipse cx="20" cy="36" rx="13" ry="4.6" fill="none" stroke="#fff" stroke-width="4.4" stroke-dasharray="5 9"/>';
    if (o.acc === 'scarf') s += '<rect x="12.4" y="17.8" width="15.4" height="4.8" rx="2.4" fill="' + (o.accCol || '#22d3ee') + '"/><rect x="14" y="20.5" width="4.2" height="10" rx="1.7" fill="' + dk(o.accCol || '#22d3ee', .85) + '"/>';
    if (o.long) s += '<path d="M12.7,9.5 q-2.6,8 -.8,14.5 l4.4,0 q-2.2,-7 -.4,-13.5z" fill="' + ha + '"/>';
    s += '<circle cx="20" cy="11.5" r="7.6" fill="' + sk + '"/><circle cx="20" cy="11.5" r="7.6" ' + SH + ' opacity=".7"/>';
    var hc = o.hatCol || '#ef4444';
    if (o.hat === 'bonnet') s += '<path d="M12.3,9.8 a7.7,7.9 0 0 1 15.4,0z" fill="' + hc + '"/><rect x="11.8" y="8.2" width="16.4" height="3.2" rx="1.6" fill="' + dk(hc, .8) + '"/><circle cx="20" cy="1.6" r="2.2" fill="#fff"/>';
    else if (o.hat === 'santa') s += '<path d="M12.4,9.6 C13,2.5 20,.2 26.5,3.6 C24.5,5 23,7 27.6,9.6z" fill="#dc2626"/><rect x="11.8" y="8" width="16.4" height="3.2" rx="1.6" fill="#fff"/><circle cx="27" cy="3.6" r="2.1" fill="#fff"/>';
    else if (o.hat === 'cap') s += '<path d="M12.4,9.4 a7.6,7.8 0 0 1 15.2,0z" fill="' + hc + '"/><rect x="24.5" y="7.8" width="7.5" height="2" rx="1" fill="' + dk(hc, .75) + '"/>';
    else if (o.hat === 'straw') s += '<ellipse cx="20" cy="7.6" rx="11.5" ry="2.3" fill="#e2bd62"/><path d="M14,7.6 a6,5.4 0 0 1 12,0z" fill="#eccb78"/><rect x="14" y="6" width="12" height="1.6" fill="#b45309"/>';
    else s += '<path d="M12.4,10.6 a7.6,7.6 0 0 1 15.1,-1.2 c-2,-2.6 -6,-3.4 -9,-2.4 c-2.6,.5 -4.7,1.7 -6.1,3.6z" fill="' + ha + '"/>';
    s += '<circle cx="23.5" cy="11" r=".95" fill="#17171f"/>';
    if (o.glasses) s += '<rect x="20.2" y="9" width="7.6" height="3.6" rx="1.7" fill="#0b0b12"/><path d="M20.2,10.4 L12.8,9.6" stroke="#0b0b12" stroke-width=".8"/>';
    if (o.stache) s += stache(24.4, 14.2, 3.3, o.stache === true ? '#2a1c14' : o.stache);
    else s += '<path d="M22.3,14.6 q1.7,1.3 3.3,0" fill="none" stroke="#7a4a3a" stroke-width=".8" stroke-linecap="round"/>';
    var h = o.hold;
    if (h === 'balloon') s += '<g class="swayt"><path d="M' + HX + ',' + HY + ' L41,-3" stroke="#cbd5e1" stroke-width=".6"/><ellipse cx="41" cy="-13" rx="7.2" ry="9.2" fill="' + (o.holdCol || '#f5c542') + '"/><ellipse cx="38.6" cy="-16" rx="2" ry="3" fill="#fff" opacity=".45"/></g>';
    if (h === 'gift') s += '<rect x="36.2" y="31.5" width="9.6" height="9" rx="1.2" fill="#dc2626"/><rect x="40" y="31.5" width="2" height="9" fill="#fcd34d"/><rect x="36.2" y="35" width="9.6" height="2" fill="#fcd34d"/><path d="M41,31.5 q-3,-4 -4,-1 M41,31.5 q3,-4 4,-1" fill="none" stroke="#fcd34d" stroke-width="1.2"/>';
    if (h === 'basket') s += '<path d="M35.6,33 a5.2,5.6 0 0 1 10.4,0" fill="none" stroke="#92400e" stroke-width="1.2"/><circle cx="38.4" cy="33.2" r="2" fill="#f9a8d4"/><circle cx="41.4" cy="32.4" r="2" fill="#a5f3fc"/><circle cx="43.8" cy="33.4" r="1.8" fill="#fde68a"/><path d="M34.8,33.4 h12 l-1.6,7 h-8.8z" fill="#b45309"/><path d="M35.4,36 h10.8" stroke="#92400e" stroke-width=".8"/>';
    if (h === 'icecream') s += '<path d="M38.2,27 h5.2 l-2.6,8z" fill="#d6a05a"/><circle cx="40.8" cy="24.8" r="3.2" fill="#f9a8d4"/><circle cx="40.8" cy="21" r="2.6" fill="#fef3c7"/>';
    if (h === 'sparkler') s += '<path d="M' + HX + ',' + HY + ' L46,18" stroke="#9ca3af" stroke-width=".9"/><g class="twk"><path d="M46,11 l1.4,5 5,1.4 -5,1.4 -1.4,5 -1.4,-5 -5,-1.4 5,-1.4z" fill="#fde68a"/><circle cx="46" cy="18" r="2" fill="#fff"/></g>';
    if (h === 'can') s += '<rect x="36.6" y="29" width="8.6" height="8" rx="1.6" fill="#38bdf8"/><path d="M45,31 l6.5,-3" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round"/><path d="M36.6,31 a3,3 0 0 0 0,5" fill="none" stroke="#0ea5e9" stroke-width="1.2"/><circle class="drip" cx="52.4" cy="30" r="1" fill="#a5f3fc"/><circle class="drip d2" cx="53.6" cy="31" r="1" fill="#a5f3fc"/>';
    if (h === 'stick') s += '<path d="M' + HX + ',' + (HY - 2) + ' L44,62" stroke="#a16207" stroke-width="1.5" stroke-linecap="round"/>';
    if (h === 'string') s += '<path d="M' + HX + ',' + HY + ' Q52,10 70,-26" fill="none" stroke="#e5e7eb" stroke-width=".5"/>';
    s += '<g class="am-b ' + (o.wave ? 'am-w' : h ? 'am-h' : 'sw') + '"><rect x="24.5" y="21.5" width="4.8" height="16.5" rx="2.4" fill="' + sh + '"/><rect x="24.5" y="21.5" width="4.8" height="16.5" rx="2.4" ' + SH + '/><circle cx="26.9" cy="38.4" r="2.4" fill="' + sk + '"/></g>';
    return S('-8 -30 64 94', s, 'pp ' + (o.mode || 'walk'));
  }

  /* ---------- décors ---------- */
  function tree(col, o) {
    o = o || {}; var s = '<rect x="18" y="32" width="4.4" height="28" rx="1.5" fill="#4a3424"/><circle cx="20" cy="20" r="14" fill="' + col + '"/><circle cx="10.5" cy="28" r="9" fill="' + dk(col, .88) + '"/><circle cx="29.5" cy="28" r="9.5" fill="' + dk(col, .8) + '"/><circle cx="15.5" cy="14.5" r="6" fill="#fff" opacity=".1"/>';
    if (o.dots) for (var i = 0; i < 9; i++) s += '<circle cx="' + (8 + (i * 37 % 25)) + '" cy="' + (10 + (i * 53 % 22)) + '" r="1.7" fill="' + o.dots + '"/>';
    return S('0 0 40 60', '<g class="sway">' + s + '</g>');
  }
  function pine(snow) {
    var g = '#1d5a43', s = '<rect x="13" y="46" width="4" height="12" fill="#4a3424"/>';
    [[15, 4, 13, 22], [15, 16, 16, 36], [15, 28, 19, 50]].forEach(function (t, i) { s += '<path d="M' + t[0] + ',' + t[1] + ' L' + (15 + t[2] * .78) + ',' + t[3] + ' L' + (15 - t[2] * .78) + ',' + t[3] + 'Z" fill="' + dk(g, 1 - i * .1) + '"/>'; if (snow) s += '<path d="M' + t[0] + ',' + t[1] + ' L' + (15 + t[2] * .34) + ',' + (t[1] + (t[3] - t[1]) * .45) + ' q-3,3 -5,0 q-3,3 -5,0z" fill="#eef4fb"/>'; });
    return S('0 0 30 58', s);
  }
  function bare() { return S('0 0 40 60', '<g fill="none" stroke="#3b2c22" stroke-linecap="round"><path d="M20,60 V26" stroke-width="4"/><path d="M20,40 L9,26 M20,34 L32,20 M20,28 L13,12 M20,27 L26,8 M9,26 L4,22 M32,20 L37,19 M13,12 L9,8" stroke-width="2"/></g>'); }
  function palm() { var f = ''; [-70, -35, 0, 35, 70].forEach(function (a) { f += '<path transform="rotate(' + a + ' 22 14)" d="M22,14 q4,-12 1,-22 q-6,10 -1,22z" fill="#2f9a5a"/>'; }); return S('0 0 44 62', '<path d="M24,62 q-6,-24 -2,-48" fill="none" stroke="#8a5a34" stroke-width="3.6" stroke-linecap="round"/><g class="sway">' + f + '</g><circle cx="21" cy="16" r="2" fill="#6b3f1f"/>'); }
  function house(col, snow) {
    return S('0 0 50 46', '<rect x="6" y="20" width="38" height="26" fill="' + col + '"/><rect x="6" y="20" width="38" height="26" ' + SH + '/><path d="M2,22 L25,3 L48,22Z" fill="' + (snow ? '#eef4fb' : '#7c2d12') + '"/><rect x="34" y="5" width="5" height="10" fill="' + dk(col, .7) + '"/><rect x="21" y="32" width="8" height="14" rx="1" fill="#3b2416"/><rect class="blink" x="10" y="26" width="8" height="8" rx="1" fill="#fde68a"/><rect x="32" y="26" width="8" height="8" rx="1" fill="#fcd34d"/>' + (snow ? '<rect x="33" y="3" width="7" height="3" rx="1.5" fill="#eef4fb"/>' : ''));
  }
  function skyline() {
    var s = '', x = 0, i = 0;
    while (x < 1200) { var w = 34 + (i * 47 % 40), h = 18 + (i * 61 % 38); s += '<rect x="' + x + '" y="' + (60 - h) + '" width="' + w + '" height="' + h + '" fill="' + (i % 2 ? '#262257' : '#1b1942') + '"/>'; for (var k = 0; k < 5; k++) { if ((i + k) % 3) s += '<rect' + ((i + k) % 4 === 0 ? ' class="blink b2"' : '') + ' x="' + (x + 5 + (k * 13 % (w - 10))) + '" y="' + (64 - h + (k * 17 % Math.max(6, h - 10))) + '" width="4" height="4" fill="' + ((i + k) % 5 === 0 ? '#22d3ee' : '#fde68a') + '" opacity=".85"/>'; } x += w + 3; i++; }
    return '<svg class="ss-g city" viewBox="0 0 1200 60" preserveAspectRatio="none">' + s + '</svg>';
  }
  function school() { return S('0 0 96 58', '<rect x="6" y="24" width="84" height="34" fill="#c2674a"/><rect x="6" y="24" width="84" height="34" ' + SH + '/><path d="M32,24 L48,6 L64,24Z" fill="#8a3a22"/><rect x="34" y="24" width="28" height="34" fill="#d4775a"/><circle cx="48" cy="20" r="5" fill="#f8fafc"/><path d="M48,20 V17 M48,20 h2.4" stroke="#1f2937" stroke-width=".9"/><rect x="43" y="40" width="10" height="18" rx="1" fill="#3b2416"/><g fill="#bfe3ff"><rect x="12" y="32" width="8" height="9"/><rect x="23" y="32" width="8" height="9"/><rect x="65" y="32" width="8" height="9"/><rect x="76" y="32" width="8" height="9"/></g><path d="M48,6 V-8" stroke="#9ca3af" stroke-width="1"/><path class="swayt" d="M48,-8 h11 v6 h-11z" fill="#2563eb"/><path d="M51.6,-8 h3.8 v6 h-3.8z" fill="#fff"/><path d="M55.4,-8 h3.6 v6 h-3.6z" fill="#ef4444"/>'); }
  function snowman() { return S('0 0 34 50', '<ellipse cx="17" cy="48.6" rx="12" ry="1.6" fill="rgba(0,0,0,.25)"/><circle cx="17" cy="37" r="11" fill="#f1f6fc"/><circle cx="17" cy="20" r="8" fill="#f8fbff"/><circle cx="17" cy="37" r="11" ' + SH + '/><path d="M9,14 h16 M12,14 V4 h10 V14" fill="#1f2937" stroke="#1f2937" stroke-width="2"/><path d="M17,21 l8,1.6 -8,1.4z" fill="#f97316"/><circle cx="14" cy="18" r="1" fill="#111"/><circle cx="20" cy="18" r="1" fill="#111"/><rect x="9.5" y="26" width="15" height="3.4" rx="1.7" fill="#dc2626"/><path d="M6,34 L-1,27 M28,34 L35,27" stroke="#5b3a22" stroke-width="1.4" stroke-linecap="round"/><circle cx="17" cy="34" r="1" fill="#111"/><circle cx="17" cy="39" r="1" fill="#111"/>'); }
  function xmas() {
    var s = '<rect x="21" y="60" width="6" height="8" fill="#4a3424"/>', c = ['#ef4444', '#fcd34d', '#38bdf8', '#e879f9'];
    [[24, 8, 15, 30], [24, 22, 20, 46], [24, 36, 24, 62]].forEach(function (t, i) { s += '<path d="M' + t[0] + ',' + t[1] + ' L' + (24 + t[2]) + ',' + t[3] + ' L' + (24 - t[2]) + ',' + t[3] + 'Z" fill="' + dk('#1f7a4d', 1 - i * .12) + '"/>'; });
    [[18, 24], [29, 27], [13, 41], [24, 38], [34, 43], [9, 57], [20, 54], [30, 56], [38, 58]].forEach(function (p, i) { s += '<circle class="blink b' + (i % 3 + 1) + '" cx="' + p[0] + '" cy="' + p[1] + '" r="2" fill="' + c[i % 4] + '"/>'; });
    return S('0 0 48 68', s + '<path class="twk" d="M24,0 l2,5.4 5.6,.4 -4.4,3.6 1.5,5.6 -4.7,-3.2 -4.7,3.2 1.5,-5.6 -4.4,-3.6 5.6,-.4z" fill="#fde047"/>');
  }
  function parasol(c) { return S('0 0 50 50', '<path d="M25,10 V50" stroke="#e5e7eb" stroke-width="1.6"/><path d="M2,22 a23,17 0 0 1 46,0z" fill="' + c + '"/><path d="M13.5,22 a11.5,17 0 0 1 11.5,-17 a11.5,17 0 0 1 11.5,17z" fill="#fff" opacity=".85"/><path d="M2,22 a23,17 0 0 1 46,0z" ' + SH + '/><rect x="30" y="44" width="16" height="3" rx="1.5" fill="#f97316"/>'); }
  function boat(c) { return S('0 0 50 50', '<path d="M24,4 V38" stroke="#e5e7eb" stroke-width="1.4"/><path d="M26,6 L44,34 H26Z" fill="#f8fafc"/><path d="M22,10 L8,34 H22Z" fill="' + c + '"/><path d="M4,38 H46 L40,47 H10Z" fill="#7c2d12"/><path d="M4,38 H46" stroke="#fde68a" stroke-width="1.4"/>'); }
  function sun(c, rays) { var r = ''; for (var i = 0; i < 12; i++) r += '<path transform="rotate(' + i * 30 + ' 40 40)" d="M40,4 l3,11 h-6z" fill="' + c + '" opacity=".8"/>'; return S('0 0 80 80', '<circle cx="40" cy="40" r="38" fill="' + c + '" opacity=".14"/>' + (rays ? '<g class="spin slow">' + r + '</g>' : '') + '<circle cx="40" cy="40" r="20" fill="' + c + '"/><circle cx="34" cy="34" r="9" fill="#fff" opacity=".25"/>'); }
  function moon() { return S('0 0 40 40', '<circle cx="20" cy="20" r="19" fill="#fef9c3" opacity=".12"/><circle cx="20" cy="20" r="11" fill="#fef9c3"/><circle cx="25" cy="16" r="10" fill="' + '#0b1030' + '" opacity=".92"/>'); }
  function cloud() { return S('0 0 70 30', '<g fill="#fff" opacity=".2"><ellipse cx="22" cy="20" rx="18" ry="8"/><ellipse cx="38" cy="14" rx="16" ry="11"/><ellipse cx="52" cy="20" rx="15" ry="8"/></g>'); }
  function flower(c) { var p = ''; for (var i = 0; i < 6; i++) p += '<ellipse transform="rotate(' + i * 60 + ' 8 8)" cx="8" cy="3.4" rx="2.4" ry="3.4" fill="' + c + '"/>'; return S('0 0 16 30', '<g class="sway"><path d="M8,10 V30" stroke="#2f8a50" stroke-width="1.4"/><path d="M8,22 q5,-1 6,-6 q-5,1 -6,6z" fill="#3aa35f"/>' + p + '<circle cx="8" cy="8" r="2.4" fill="#fde047"/></g>'); }
  function sunflower() { var p = ''; for (var i = 0; i < 12; i++) p += '<ellipse transform="rotate(' + i * 30 + ' 12 12)" cx="12" cy="3.6" rx="2.2" ry="4.4" fill="#fbbf24"/>'; return S('0 0 24 46', '<g class="sway"><path d="M12,14 V46" stroke="#2f8a50" stroke-width="2"/><path d="M12,32 q8,-2 9,-9 q-8,2 -9,9z M12,36 q-8,-2 -9,-9 q8,2 9,9z" fill="#3aa35f"/>' + p + '<circle cx="12" cy="12" r="5" fill="#6b3f1f"/></g>'); }
  function egg(c, c2) { return S('0 0 14 18', '<ellipse cx="7" cy="10" rx="6" ry="7.6" fill="' + c + '"/><path d="M1.6,8 q2.7,-3 5.4,0 t5.4,0 M1.2,12 q2.9,3 5.8,0 t5.8,0" fill="none" stroke="' + c2 + '" stroke-width="1.3"/><ellipse cx="7" cy="10" rx="6" ry="7.6" ' + SH + '/>'); }
  function lamp() { return S('0 0 20 60', '<circle cx="10" cy="9" r="9" fill="#fde68a" opacity=".16"/><path d="M10,60 V12" stroke="#1f2433" stroke-width="2.2"/><path d="M5,12 h10 l-2,-7 h-6z" fill="#fde68a"/><rect x="6" y="56" width="8" height="4" fill="#1f2433"/>'); }
  function arch() { return S('0 0 90 62', '<rect x="4" y="12" width="5" height="50" fill="#f472b6"/><rect x="81" y="12" width="5" height="50" fill="#f472b6"/><rect x="2" y="4" width="86" height="15" rx="4" fill="#ec4899"/><rect x="2" y="4" width="86" height="15" rx="4" ' + SH + '/>' + ribbon(45, 11.5, 6.2, '#fff') + '<g class="swayt"><path d="M10,4 V-6" stroke="#fff" stroke-width=".5"/><ellipse cx="10" cy="-13" rx="5.6" ry="7" fill="#f9a8d4"/></g><g class="swayt"><path d="M80,4 V-8" stroke="#fff" stroke-width=".5"/><ellipse cx="80" cy="-15" rx="5.6" ry="7" fill="#fbcfe8"/></g>'); }
  function stacheBalloon() { return S('0 0 60 60', '<path d="M30,30 q3,14 -1,30" fill="none" stroke="#cbd5e1" stroke-width=".7"/><ellipse cx="30" cy="16" rx="26" ry="15" fill="#3b82f6"/><ellipse cx="30" cy="16" rx="26" ry="15" ' + SH + '/><ellipse cx="18" cy="9" rx="7" ry="3.4" fill="#fff" opacity=".25"/>' + stache(30, 16, 14, '#fff')); }
  function mountain() { return S('0 0 200 70', '<path d="M0,70 L52,14 L86,46 L124,4 L200,70Z" fill="#33415c"/><path d="M124,4 L200,70 H132Z" fill="#232e44"/><path d="M52,14 L86,46 L70,70 H40Z" fill="#283552" opacity=".7"/><path d="M52,14 l-10,11 6,3 5,-5 6,6 4,-4z M124,4 l-13,15 8,4 6,-7 7,8 6,-5z" fill="#f1f6fc"/>'); }
  function kite() { return S('0 0 30 50', '<g class="swayt"><path d="M15,2 L27,16 L15,34 L3,16Z" fill="#8b5cf6"/><path d="M15,2 L27,16 L15,34Z" fill="#22d3ee"/><path d="M15,2 V34 M3,16 H27" stroke="#0b0b12" stroke-width=".6"/><path d="M15,34 q-6,6 0,10 q6,3 0,6" fill="none" stroke="#f472b6" stroke-width="1.2"/></g>'); }
  function firework(c) { var r = ''; for (var i = 0; i < 14; i++) r += '<path transform="rotate(' + (i * 25.7) + ' 30 30)" d="M30,22 V5" stroke="' + c + '" stroke-width="1.8" stroke-linecap="round"/><circle transform="rotate(' + (i * 25.7 + 12) + ' 30 30)" cx="30" cy="9" r="1.2" fill="#fff"/>'; return S('0 0 60 60', '<g class="fw">' + r + '<circle cx="30" cy="30" r="3" fill="#fff"/></g>'); }

  /* ---------- animaux et véhicules ---------- */
  function bird(c) { return S('0 0 30 18', '<path class="flap" d="M3,9 Q9,-2 15,9 Q21,-2 27,9 Q21,5 15,10 Q9,5 3,9Z" fill="' + (c || '#e5e7eb') + '"/>'); }
  function butterfly(c) { return S('0 0 24 18', '<path class="flapx r" d="M12,9 C6,-3 -2,2 2,9 C-1,15 7,18 12,9Z" fill="' + c + '"/><path class="flapx" d="M12,9 C18,-3 26,2 22,9 C25,15 17,18 12,9Z" fill="' + dk(c, .85) + '"/><rect x="11.3" y="4" width="1.4" height="10" rx=".7" fill="#1f1f29"/>'); }
  function rabbit() { return S('0 0 40 32', '<ellipse cx="18" cy="30.6" rx="12" ry="1.3" fill="rgba(0,0,0,.3)"/><circle cx="7" cy="22" r="3.4" fill="#fff"/><ellipse cx="18" cy="21" rx="11.5" ry="8.4" fill="#e7ddd0"/><ellipse cx="18" cy="21" rx="11.5" ry="8.4" ' + SH + '/><ellipse cx="14" cy="27.4" rx="6" ry="2.6" fill="#d8ccbc"/><path d="M27,10 q-4,-11 0,-10 q3,2 2.6,10z" fill="#e7ddd0"/><path d="M31,10 q-1,-11 3,-9 q2,3 -.6,10z" fill="#d8ccbc"/><circle cx="29.5" cy="14.5" r="6" fill="#efe6da"/><circle cx="31.8" cy="13.4" r="1" fill="#1f1f29"/><circle cx="35" cy="15.6" r="1" fill="#f472b6"/><ellipse cx="29" cy="27.6" rx="4" ry="2" fill="#efe6da"/>'); }
  function bike(o) {
    function wh(x) { return '<g class="spin"><circle cx="' + x + '" cy="46" r="11" fill="none" stroke="#d1d5db" stroke-width="1.8"/><path d="M' + (x - 11) + ',46 h22 M' + x + ',35 v22 M' + (x - 7.8) + ',38.2 l15.6,15.6 M' + (x - 7.8) + ',53.8 l15.6,-15.6" stroke="#9ca3af" stroke-width=".7"/></g>'; }
    var sh = o.shirt || '#22d3ee';
    return S('0 0 76 60', '<ellipse cx="38" cy="58.4" rx="30" ry="1.4" fill="rgba(0,0,0,.35)"/>' + wh(14) + wh(60) + '<path d="M14,46 L30,26 H52 L60,46 M30,26 L40,46 H14 M52,26 L49,19 h6 M28,24 h7" fill="none" stroke="' + (o.frame || '#8b5cf6') + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><g class="gal" style="animation-duration:.5s"><path d="M33,25 L41,36 L40,46" fill="none" stroke="#2a3350" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/></g><path d="M32,24 L43,8" stroke="' + sh + '" stroke-width="9" stroke-linecap="round"/><path d="M42,10 L52,19" stroke="' + dk(sh, .82) + '" stroke-width="3.6" stroke-linecap="round"/><circle cx="46" cy="1" r="6.4" fill="' + (o.skin || '#f0c8a4') + '"/><path d="M39.8,0 a6.4,6.6 0 0 1 12.6,-1.4z" fill="' + (o.helmet || '#f97316') + '"/><circle cx="49" cy="1" r=".9" fill="#17171f"/>' + (o.stache ? stache(50, 3.8, 3, '#2a1c14') : ''));
  }
  function bus() { var w = ''; [16, 36, 56, 76].forEach(function (x, i) { w += '<rect x="' + x + '" y="10" width="15" height="13" rx="2" fill="#bfe3ff"/><circle cx="' + (x + 7.5) + '" cy="19" r="4" fill="' + ['#f0c8a4', '#c98d62', '#f0c8a4', '#8a5a3c'][i] + '"/><path d="M' + (x + 3.5) + ',18 a4,4.4 0 0 1 8,0z" fill="' + ['#3a2a20', '#111', '#b45309', '#111'][i] + '"/>'; }); return S('0 0 120 52', '<ellipse cx="60" cy="50.6" rx="54" ry="1.4" fill="rgba(0,0,0,.35)"/><rect x="6" y="4" width="108" height="36" rx="7" fill="#fbbf24"/><rect x="6" y="4" width="108" height="36" rx="7" ' + SH + '/>' + w + '<rect x="96" y="10" width="14" height="15" rx="2" fill="#dbeafe"/><rect x="6" y="28" width="108" height="3" fill="#1f2937"/><rect x="110" y="30" width="5" height="4" rx="1" fill="#fef08a"/><g class="spin"><circle cx="30" cy="41" r="8" fill="#17171f"/><path d="M22,41 h16 M30,33 v16" stroke="#6b7280" stroke-width="1.4"/></g><g class="spin"><circle cx="90" cy="41" r="8" fill="#17171f"/><path d="M82,41 h16 M90,33 v16" stroke="#6b7280" stroke-width="1.4"/></g>'); }
  function sleigh() {
    function deer(x) { return '<g transform="translate(' + x + ',0)"><g class="gal"><path d="M9,26 V38" stroke="#6b4423" stroke-width="2.2" stroke-linecap="round"/></g><g class="gal g2"><path d="M23,26 V38" stroke="#6b4423" stroke-width="2.2" stroke-linecap="round"/></g><ellipse cx="16" cy="22" rx="10.5" ry="5.6" fill="#8a5a34"/><path d="M24,20 L30,10" stroke="#8a5a34" stroke-width="4.4" stroke-linecap="round"/><ellipse cx="32" cy="9" rx="4.6" ry="3.2" fill="#9a6a40"/><path d="M30,6 l-2,-7 m1,3 l-3,-1 M33,6 l2,-7 m-1,3 l3,-1" stroke="#d6b98a" stroke-width="1.1" fill="none" stroke-linecap="round"/><circle cx="33.4" cy="8.4" r=".8" fill="#111"/></g>'; }
    return S('0 0 170 52', deer(96) + deer(128).replace('<circle cx="33.4" cy="8.4" r=".8" fill="#111"/>', '<circle cx="33.4" cy="8.4" r=".8" fill="#111"/><circle class="blink" cx="37" cy="9.6" r="1.9" fill="#ef4444"/>') + '<path d="M62,24 H140" stroke="#fcd34d" stroke-width=".9"/><path d="M8,40 q-8,-2 -4,-10 M10,44 H62 q8,0 8,-8" fill="none" stroke="#fcd34d" stroke-width="2"/><path d="M12,22 H58 q4,0 4,5 V38 H18 q-8,0 -6,-16z" fill="#b91c1c"/><path d="M12,22 H58 q4,0 4,5 V38 H18 q-8,0 -6,-16z" ' + SH + '/><circle cx="24" cy="17" r="9" fill="#8a5a34"/><path d="M17,12 l14,-4" stroke="#fcd34d" stroke-width="1.4"/><rect x="36" y="10" width="14" height="14" rx="5" fill="#dc2626"/><circle cx="44" cy="6" r="5" fill="#f0c8a4"/><path d="M39.6,7 q4.4,9 9.4,0 q-1,6 -4.6,6.4 q-4,0 -4.8,-6.4z" fill="#fff"/><path d="M39.4,4.4 q4,-9 9.6,-1.4z" fill="#dc2626"/><circle cx="39" cy="-1.6" r="1.8" fill="#fff"/><g fill="#fde68a"><circle class="twk" cx="2" cy="20" r="1.4"/><circle class="twk" cx="-8" cy="27" r="1"/><circle class="twk" cx="-16" cy="21" r="1.2"/></g>');
  }
  function sled() { return S('0 0 60 44', '<path d="M4,40 H50 q6,0 6,-7" fill="none" stroke="#d1d5db" stroke-width="2"/><rect x="8" y="32" width="38" height="4" rx="2" fill="#b45309"/><path d="M14,36 V40 M40,36 V40" stroke="#92400e" stroke-width="2"/><path d="M20,32 L40,32 L44,24" fill="none" stroke="#2a3350" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><rect x="15" y="12" width="13" height="20" rx="6" fill="#ef4444"/><rect x="15" y="12" width="13" height="20" rx="6" ' + SH + '/><path d="M26,18 L38,24" stroke="#ef4444" stroke-width="3.8" stroke-linecap="round"/><circle cx="22" cy="6.6" r="6" fill="#f0c8a4"/><path d="M15.8,5.4 a6.2,6.4 0 0 1 12.4,0z" fill="#22d3ee"/><circle cx="22" cy="-1.4" r="1.9" fill="#fff"/><rect x="15.4" y="10.4" width="13" height="3.6" rx="1.8" fill="#fcd34d"/><path class="swayt" d="M15,12 q-8,2 -12,-2" fill="none" stroke="#fcd34d" stroke-width="2.6" stroke-linecap="round"/>'); }
  function surfer() { return S('0 0 70 54', '<path d="M2,44 Q35,54 68,42 Q36,48 2,44Z" fill="#fde68a"/><path d="M0,46 q10,-10 22,-2" fill="none" stroke="#fff" stroke-width="2" opacity=".8"/><path d="M28,44 L32,32 L42,44" fill="none" stroke="#1e3a8a" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M32,32 L36,16" stroke="#f97316" stroke-width="8.4" stroke-linecap="round"/><path d="M35,18 L22,24 M36,18 L50,20" stroke="#f0c8a4" stroke-width="3.2" stroke-linecap="round"/><circle cx="38" cy="8" r="5.8" fill="#f0c8a4"/><path d="M32.4,7 a5.8,6 0 0 1 11.2,-1 q-6,-2 -11.2,1z" fill="#b45309"/>'); }

  function plane() { return S('0 0 76 36', '<path d="M8,16 L0,4 h9 l9,10z" fill="#8b5cf6"/><path d="M6,18 Q8,10 30,10 H52 Q68,11 70,19 Q68,26 52,26 H22 Q8,26 6,18Z" fill="#e4e6ed"/><path d="M6,18 Q8,10 30,10 H52 Q68,11 70,19 Q68,26 52,26 H22 Q8,26 6,18Z" ' + SH + '/><path d="M44,10 q6,-6 14,-1 l2,4z" fill="#29d3ee"/><path d="M24,20 L46,20 L34,33 H26Z" fill="#8b5cf6"/><path d="M10,19 H62" stroke="#29d3ee" stroke-width="1.6"/><circle cx="71" cy="19" r="2.2" fill="#1f2433"/><ellipse class="flap" cx="72.5" cy="19" rx="1.3" ry="12" fill="#cbd5e1" opacity=".75" style="transform-origin:50% 50%;animation-duration:.09s"/>'); }

  /* ---------- assemblage ---------- */
  function build(m, year) {
    var H = [], bar = document.createElement('div');
    function prop(svg, l, w, b, cls) { H.push('<span class="ss-i ' + (cls || '') + '" style="left:' + l + '%;width:' + (w * 1.14).toFixed(2) + 'em;bottom:' + (b == null ? .5 : b) + 'em">' + svg + '</span>'); }
    function act(svg, w, d, dl, o) { o = o || {}; H.push('<span class="ss-a ' + (o.rev ? 'rev ' : '') + (o.cls || '') + '" style="width:' + (w * 1.14).toFixed(2) + 'em;bottom:' + (o.b == null ? .32 : o.b) + 'em;--d:' + d + 's;--dl:' + dl + 's;--sx:' + (o.sx == null ? 50 : o.sx) + '%"><span class="fl' + (o.hop ? ' hop' : o.boat ? ' bobw' : '') + '">' + svg + '</span></span>'); }
    function fall(n, cols, cls, smin, smax) { for (var i = 0; i < n; i++) H.push('<span class="ss-f ' + (cls || '') + '" style="left:' + rnd(1, 99).toFixed(1) + '%;--s:' + rnd(smin || 3, smax || 5).toFixed(1) + 'px;--c:' + pick(cols) + ';--d:' + rnd(4, 9).toFixed(1) + 's;--dl:-' + rnd(0, 9).toFixed(1) + 's;--dx:' + rnd(-24, 24).toFixed(0) + 'px;--ry:' + rnd(8, 70).toFixed(0) + '%"></span>'); }
    function stars(n) { for (var i = 0; i < n; i++) H.push('<span class="ss-s" style="left:' + rnd(1, 99).toFixed(1) + '%;top:' + rnd(4, 52).toFixed(0) + '%;--d:' + rnd(1.5, 4).toFixed(1) + 's;--dl:-' + rnd(0, 4).toFixed(1) + 's"></span>'); }
    function land(g2, g1, line) { H.push('<svg class="ss-g" viewBox="0 0 1200 40" preserveAspectRatio="none"><path d="M0,40 V20 Q150,4 320,16 T640,14 T960,10 T1200,18 V40Z" fill="' + g2 + '"/><path d="M0,40 V27 Q200,16 420,25 T820,24 T1200,22 V40Z" fill="' + g1 + '"/><path d="M0,27 Q200,16 420,25 T820,24 T1200,22" fill="none" stroke="' + (line || '#22d3ee') + '" stroke-width="1.2" vector-effect="non-scaling-stroke" opacity=".55"/></svg>'); }
    function sea(c1, c2, tall) { function wp(y, a) { var d = 'M-100,60 V' + y; for (var x = -100; x < 1400; x += 50) d += ' q12.5,' + (-a) + ' 25,0 t25,0'; return d + ' V60Z'; } H.push('<svg class="ss-g' + (tall ? ' tall' : '') + '" viewBox="0 0 1200 60" preserveAspectRatio="none"><g class="wv w2"><path d="' + wp(14, 7) + '" fill="' + c2 + '"/></g><g class="wv"><path d="' + wp(26, 6) + '" fill="' + c1 + '"/></g></svg>'); }
    var P = person;

    switch (m) {
      case 0: // Nouvel an
        stars(26); H.push(skyline());
        prop(firework('#22d3ee'), 8, 3.4, 2.2, 'sky'); prop(firework('#f5c542').replace('class="fw"', 'class="fw" style="animation-delay:-.9s"'), 27, 2.8, 2.6, 'sky hm'); prop(firework('#e879f9').replace('class="fw"', 'class="fw" style="animation-delay:-1.6s"'), 66, 3, 2.4, 'sky'); prop(firework('#8b5cf6').replace('class="fw"', 'class="fw" style="animation-delay:-.4s"'), 86, 3.6, 2, 'sky hm');
        land('#0d0d1c', '#141428', '#8b5cf6');
        prop(P({ mode: 'idle', shirt: '#8b5cf6', hat: 'bonnet', hatCol: '#22d3ee', acc: 'scarf', hold: 'sparkler' }), 17, 3.1, .3); prop(P({ mode: 'idle', shirt: '#e11d48', long: true, hair: '#7c2d12', wave: true, acc: 'scarf', accCol: '#fcd34d' }), 23, 3.1, .3, 'hm'); prop(P({ mode: 'idle', shirt: '#0ea5e9', hat: 'bonnet', hatCol: '#f5c542', hold: 'sparkler', skin: '#b9805a' }), 76, 3.1, .3);
        act(P({ shirt: '#22d3ee', hat: 'bonnet', hatCol: '#e879f9', hold: 'balloon', holdCol: '#f5c542' }), 3.1, 34, -6, { sx: 38 }); act(P({ shirt: '#f97316', acc: 'scarf', accCol: '#8b5cf6', hold: 'balloon', holdCol: '#22d3ee', skin: '#c98d62' }), 3.1, 40, -24, { rev: true, sx: 62 });
        fall(16, ['#22d3ee', '#8b5cf6', '#f5c542', '#f472b6', '#fff'], 'rect', 4, 7); break;
      case 1: // Février
        stars(14); prop(moon(), 88, 2.2, 3, 'sky'); prop(cloud(), 20, 5, 3.4, 'sky cloud');
        land('#93a8c6', '#dbe7f5', '#fff');
        prop(pine(1), 4, 2, .7); prop(pine(1), 9.5, 2.6, .5); prop(pine(1), 84, 2.4, .6); prop(pine(1), 91, 1.9, .7, 'hm'); prop(pine(1), 58, 1.7, .9, 'hm'); prop(snowman(), 70, 2.3, .4); prop(house('#7c4a3a', 1), 30, 3, .7, 'hm');
        act(sled(), 3.6, 13, -3, { rev: true, sx: 44, b: .2 }); act(P({ shirt: '#dc2626', hat: 'bonnet', hatCol: '#22d3ee', acc: 'scarf', accCol: '#fcd34d' }), 3.1, 38, -10, { sx: 22 }); act(P({ shirt: '#7c3aed', hat: 'bonnet', hatCol: '#f472b6', acc: 'scarf', accCol: '#fff', long: true, hair: '#111', skin: '#c98d62' }), 2.7, 44, -30, { rev: true, sx: 60 });
        fall(34, ['#fff', '#e0f2fe'], '', 2, 5); break;
      case 2: // Mars
        prop(sun('#fde68a'), 86, 3.2, 2.6, 'sky'); prop(cloud(), 12, 5, 3.3, 'sky cloud'); prop(cloud(), 55, 4, 3.8, 'sky cloud hm');
        land('#1f5a44', '#2f7d54', '#86efac');
        prop(tree('#f9a8d4', { dots: '#fff' }), 5, 2.8, .6); prop(tree('#63c383', { dots: '#f9a8d4' }), 13, 2.3, .7, 'hm'); prop(tree('#fbcfe8', { dots: '#fff' }), 88, 3, .5); prop(tree('#63c383'), 80, 2.2, .8, 'hm');
        [34, 38, 42, 62, 66, 73].forEach(function (x, i) { prop(flower(['#f472b6', '#fde047', '#c4b5fd', '#fb7185'][i % 4]), x, .8, .55, i % 2 ? 'hm' : ''); });
        prop(P({ mode: 'idle', shirt: '#22c55e', hat: 'straw', hold: 'can', long: true, hair: '#7c2d12' }), 27, 3.1, .32);
        act(P({ shirt: '#8b5cf6', hold: 'balloon', holdCol: '#f9a8d4', skin: '#b9805a', hair: '#111' }), 3.1, 36, -4, { sx: 52 }); act(rabbit(), 1.7, 22, -9, { hop: true, rev: true, sx: 70 });
        act(bird(), 1.5, 19, -2, { cls: 'sky', b: 3.6 }); act(bird(), 1.2, 23, -11, { cls: 'sky', b: 3 }); act(butterfly('#f472b6'), .9, 30, -14, { b: 1.9, rev: true });
        fall(12, ['#fbcfe8', '#f9a8d4', '#fff'], 'leaf', 4, 6); break;
      case 3: // Pâques
        prop(sun('#fde68a'), 10, 3, 2.7, 'sky'); prop(cloud(), 68, 5, 3.4, 'sky cloud');
        land('#2a6a48', '#3f9159', '#fcd34d');
        prop(tree('#58b877'), 4, 2.6, .7); prop(tree('#f9a8d4', { dots: '#fff' }), 90, 2.8, .6); prop(tree('#58b877'), 82, 2.1, .8, 'hm');
        [[16, '#f9a8d4', '#fff'], [22, '#a5f3fc', '#0ea5e9'], [37, '#fde68a', '#f97316'], [47, '#c4b5fd', '#fff'], [58, '#bbf7d0', '#16a34a'], [66, '#fb7185', '#fde68a'], [76, '#a5f3fc', '#fff']].forEach(function (e, i) { prop(egg(e[1], e[2]), e[0], .8, .42, 'front' + (i % 3 === 1 ? ' hm' : '')); });
        [30, 52, 71].forEach(function (x, i) { prop(flower(['#fde047', '#f472b6', '#c4b5fd'][i]), x, .8, .6); });
        act(rabbit(), 1.9, 17, -2, { hop: true, sx: 28 }); act(rabbit(), 1.6, 21, -12, { hop: true, rev: true, sx: 64 });
        act(P({ shirt: '#f472b6', pants: '#3b4a7a', hold: 'basket', long: true, hair: '#b45309' }), 2.7, 38, -8, { sx: 42 }); act(P({ shirt: '#38bdf8', hat: 'cap', hatCol: '#fbbf24', hold: 'basket', skin: '#8a5a3c', hair: '#111' }), 2.4, 44, -27, { rev: true, sx: 84 });
        act(butterfly('#fde047'), .9, 26, -5, { b: 2 }); act(bird(), 1.3, 20, -9, { cls: 'sky', b: 3.4, rev: true }); break;
      case 4: // Mai
        prop(sun('#fbbf24', 1), 87, 3.6, 2.2, 'sky'); prop(cloud(), 8, 5.4, 3.5, 'sky cloud'); prop(cloud(), 48, 4, 3.9, 'sky cloud hm');
        land('#2d6f4a', '#48a562', '#bef264');
        prop(tree('#4fb672'), 4, 2.9, .6); prop(tree('#6fce86'), 92, 2.5, .7); prop(tree('#4fb672'), 62, 2, .9, 'hm');
        [14, 19, 36, 44, 56, 70, 78, 84].forEach(function (x, i) { prop(flower(['#fde047', '#f472b6', '#fff', '#fb7185', '#c4b5fd'][i % 5]), x, .8, .55, i % 3 === 2 ? 'hm' : ''); });
        prop(P({ mode: 'idle', shirt: '#f97316', hat: 'cap', hatCol: '#22d3ee', hold: 'string' }), 23, 3.1, .32); prop(kite(), 28.5, 1.7, 3, 'sky');
        act(bike({ shirt: '#22d3ee', frame: '#8b5cf6' }), 3.9, 15, -3, { sx: 50, b: .22 }); act(P({ shirt: '#e879f9', hat: 'straw', long: true, hair: '#3a2a20' }), 3.1, 40, -18, { rev: true, sx: 72 });
        act(butterfly('#f472b6'), .9, 27, -6, { b: 1.8 }); act(butterfly('#fde047'), .8, 33, -20, { b: 2.3, rev: true }); act(bird(), 1.4, 18, -8, { cls: 'sky', b: 3.5 }); break;
      case 5: // Juin
        prop(sun('#fdba74', 1), 76, 5.4, .2, 'sky'); prop(cloud(), 14, 5, 3.6, 'sky cloud');
        land('#7a5a2a', '#b98a3c', '#fde68a');
        for (var i5 = 0; i5 < 15; i5++) prop(sunflower(), 3 + i5 * 6.6, 1.15, .5 + (i5 % 2) * .12, i5 % 3 === 1 ? 'hm' : '');
        prop(tree('#3f9d5f'), 1, 2.6, .7, 'hm');
        act(P({ shirt: '#22d3ee', pants: '#3b4a7a', glasses: true, hold: 'icecream' }), 3.1, 36, -5, { sx: 30, cls: 'front' }); act(bike({ shirt: '#f472b6', frame: '#22d3ee', helmet: '#fde047', skin: '#c98d62' }), 3.9, 14, -9, { rev: true, sx: 62, b: .22, cls: 'front' }); act(P({ shirt: '#f97316', hat: 'straw', long: true, hair: '#7c2d12', hold: 'icecream' }), 2.9, 42, -26, { rev: true, sx: 86, cls: 'front' });
        act(bird('#1f1f29'), 1.4, 20, -3, { cls: 'sky', b: 3.4 }); act(bird('#1f1f29'), 1.1, 24, -14, { cls: 'sky', b: 3.8 }); act(butterfly('#fff'), .8, 28, -10, { b: 2.1 }); break;
      case 6: // Juillet
        prop(sun('#fde68a', 1), 85, 3.6, 2.3, 'sky'); prop(cloud(), 10, 5, 3.6, 'sky cloud');
        sea('#2a8fc0', '#1f6f9c', 1);
        act(boat('#ef4444'), 2.6, 46, -8, { cls: 'sky', b: 1.55, boat: true }); act(boat('#8b5cf6'), 2, 60, -40, { cls: 'sky', b: 1.75, boat: true, rev: true });
        H.push('<svg class="ss-g" viewBox="0 0 1200 40" preserveAspectRatio="none"><path d="M0,40 V22 Q300,10 600,20 T1200,16 V40Z" fill="#e3c37f"/><path d="M0,22 Q300,10 600,20 T1200,16" fill="none" stroke="#fff" stroke-width="1.6" vector-effect="non-scaling-stroke" opacity=".7"/></svg>');
        prop(palm(), 4, 2.9, .6); prop(palm(), 90, 2.6, .7); prop(parasol('#ef4444'), 16, 2.6, .5); prop(parasol('#22d3ee'), 72, 2.4, .55, 'hm'); prop(parasol('#fbbf24'), 46, 2.2, .6, 'hm');
        act(P({ shirt: '#f472b6', pants: '#f0c8a4', acc: 'ring', glasses: true }), 3.1, 34, -4, { sx: 34 }); act(P({ shirt: '#22d3ee', pants: '#c98d62', hat: 'straw', hold: 'icecream', skin: '#c98d62', hair: '#111' }), 3.1, 40, -22, { rev: true, sx: 60 }); act(P({ shirt: '#fbbf24', pants: '#f0c8a4', hat: 'cap', hatCol: '#ef4444', hold: 'balloon', holdCol: '#8b5cf6' }), 2.5, 30, -15, { sx: 82 });
        act(bird('#fff'), 1.4, 17, -2, { cls: 'sky', b: 3.7 }); act(bird('#fff'), 1.1, 21, -12, { cls: 'sky', b: 3.2, rev: true }); break;
      case 7: // Août
        prop(sun('#fdba74', 1), 38, 4.2, .5, 'sky');
        sea('#2a8fc0', '#1f6f9c', 1);
        prop(mountain(), -2, 15, 1, 'sky'); prop(mountain(), 22, 10, 1, 'sky hm');
        act(boat('#fbbf24'), 2.4, 50, -10, { cls: 'sky half-r', b: 1.55, boat: true, sx: 86 }); act(surfer(), 3.4, 12, -3, { cls: 'sky half-r', b: 1.1, sx: 70 });
        H.push('<svg class="ss-g" viewBox="0 0 1200 40" preserveAspectRatio="none"><path d="M0,40 V16 Q200,6 420,16 Q520,21 600,40Z" fill="#3c7a52"/><path d="M0,16 Q200,6 420,16 Q520,21 600,40" fill="none" stroke="#bef264" stroke-width="1.2" vector-effect="non-scaling-stroke" opacity=".6"/><path d="M560,40 Q640,24 760,30 T1200,34 V40Z" fill="#e3c37f"/></svg>');
        prop(pine(), 3, 2, .9); prop(pine(), 9, 2.5, .8); prop(pine(), 30, 1.9, .9, 'hm'); prop(parasol('#ef4444'), 66, 2.4, .25); prop(palm(), 92, 2.6, .3);
        act(P({ shirt: '#f97316', hat: 'cap', hatCol: '#22d3ee', acc: 'backpack', accCol: '#16a34a', hold: 'stick' }), 3.1, 30, -4, { cls: 'half-l', sx: 14, b: .6 }); act(P({ shirt: '#8b5cf6', hat: 'straw', acc: 'backpack', accCol: '#ef4444', hold: 'stick', long: true, hair: '#7c2d12' }), 2.9, 30, -18, { cls: 'half-l', sx: 24, b: .6 });
        prop(P({ mode: 'idle', shirt: '#22d3ee', pants: '#f0c8a4', acc: 'ring', wave: true, glasses: true }), 78, 3, .1);
        act(bird('#fff'), 1.3, 18, -5, { cls: 'sky', b: 3.7 }); break;
      case 8: // Rentrée
        prop(cloud(), 10, 5, 3.5, 'sky cloud'); prop(cloud(), 60, 4.4, 3.9, 'sky cloud hm'); prop(sun('#fde68a'), 90, 2.8, 2.9, 'sky');
        land('#33473a', '#4f6f48', '#fbbf24');
        prop(school(), 74, 5.6, .6); prop(tree('#c9a43a'), 4, 2.8, .6); prop(tree('#7fb35a'), 12, 2.2, .8, 'hm'); prop(tree('#d98a2b'), 93, 2.4, .7); prop(tree('#7fb35a'), 58, 2, .9, 'hm');
        act(bus(), 6.2, 20, -4, { sx: 34, b: .12, cls: 'front' });
        act(P({ shirt: '#22d3ee', acc: 'backpack', accCol: '#ef4444' }), 2.5, 34, -2, { sx: 20 }); act(P({ shirt: '#f472b6', acc: 'backpack', accCol: '#8b5cf6', long: true, hair: '#111', skin: '#b9805a' }), 2.4, 36, -9, { sx: 46 }); act(P({ shirt: '#fbbf24', hat: 'cap', hatCol: '#2563eb', acc: 'backpack', accCol: '#16a34a' }), 2.5, 32, -20, { sx: 60 }); act(P({ shirt: '#8b5cf6', acc: 'backpack', accCol: '#f97316', long: true, hair: '#b45309', hold: 'balloon', holdCol: '#ef4444' }), 2.3, 38, -28, { sx: 8 });
        fall(8, ['#d97706', '#ca8a04', '#b45309'], 'leaf', 5, 7); act(bird('#1f1f29'), 1.2, 21, -6, { cls: 'sky', b: 3.6, rev: true }); break;
      case 9: // Octobre rose
        prop(cloud(), 14, 5, 3.6, 'sky cloud');
        land('#4f2b3c', '#7a3a58', '#f472b6');
        prop(tree('#e2703a'), 4, 2.9, .6); prop(tree('#f29b3a'), 12, 2.2, .8, 'hm'); prop(tree('#d1495b'), 92, 2.6, .7); prop(tree('#f29b3a'), 64, 2, .9, 'hm'); prop(arch(), 76, 5.2, .5);
        var pk = ['#ec4899', '#f472b6', '#db2777'];
        act(P({ mode: 'run', shirt: pk[0], ribbon: '#fff', long: true, hair: '#3a2a20', pants: '#27272f' }), 3.1, 15, -2, { sx: 20 }); act(P({ mode: 'run', shirt: pk[1], ribbon: '#fff', hat: 'cap', hatCol: '#fff', skin: '#b9805a', hair: '#111', pants: '#27272f' }), 3.1, 17, -8, { sx: 34 }); act(P({ mode: 'run', shirt: pk[2], ribbon: '#fff', long: true, hair: '#b45309', pants: '#3b3b4a' }), 2.9, 14, -11, { sx: 48 }); act(P({ shirt: '#f9a8d4', ribbon: '#db2777', hold: 'balloon', holdCol: '#ec4899', long: true, hair: '#6b7280' }), 3.1, 38, -20, { sx: 62 }); act(P({ mode: 'run', shirt: pk[0], ribbon: '#fff', stache: false, hat: 'cap', hatCol: '#f472b6', pants: '#27272f' }), 3, 16, -5, { sx: 8, cls: 'hm' });
        fall(10, ['#f9a8d4', '#fbcfe8', '#ec4899'], 'up', 5, 8); fall(8, ['#ea580c', '#f59e0b'], 'leaf', 5, 7); break;
      case 10: // Movember
        stars(10); prop(moon(), 90, 2.1, 3.1, 'sky'); prop(cloud(), 30, 5, 3.6, 'sky cloud');
        land('#1c2740', '#2b3a5e', '#60a5fa');
        prop(bare(), 3, 2.6, .6); prop(bare(), 94, 2.4, .7); prop(tree('#b5651d'), 10, 2.2, .8, 'hm'); prop(lamp(), 20, 1.1, .5); prop(lamp(), 50, 1.1, .5, 'hm'); prop(lamp(), 80, 1.1, .5);
        prop(stacheBalloon(), 13, 3.2, 1.7, 'sky float'); prop(stacheBalloon(), 84, 2.7, 2, 'sky float hm');
        act(P({ shirt: '#3b82f6', stache: true, ribbon: '#fff', acc: 'scarf', accCol: '#e5e7eb' }), 3.1, 36, -3, { sx: 28 }); act(P({ shirt: '#1d4ed8', stache: '#111', hat: 'cap', hatCol: '#e5e7eb', ribbon: '#fff', skin: '#8a5a3c', hair: '#111' }), 3.1, 40, -22, { rev: true, sx: 44 }); act(P({ shirt: '#60a5fa', stache: '#9ca3af', hair: '#9ca3af', ribbon: '#fff', hold: 'balloon', holdCol: '#3b82f6' }), 3.1, 44, -12, { sx: 64 }); act(bike({ shirt: '#2563eb', frame: '#e5e7eb', helmet: '#e5e7eb', stache: 1 }), 3.9, 16, -7, { rev: true, sx: 72, b: .22 }); act(P({ shirt: '#93c5fd', stache: '#7c2d12', hair: '#7c2d12', ribbon: '#1d4ed8', hat: 'bonnet', hatCol: '#1d4ed8' }), 2.9, 38, -30, { sx: 88, cls: 'hm' });
        fall(9, ['#b45309', '#92400e', '#ca8a04'], 'leaf', 5, 7); break;
      default: // Noël
        stars(26); prop(moon(), 6, 2.2, 3, 'sky');
        
        land('#a3b6d2', '#e6eef9', '#fff');
        prop(house('#8a4a3a', 1), 8, 3.2, .7); prop(house('#5a6a8a', 1), 16, 2.6, .8, 'hm'); prop(house('#7a5a3a', 1), 87, 3, .7); prop(pine(1), 2, 2, .8); prop(pine(1), 95, 1.9, .8); prop(pine(1), 62, 1.8, .9, 'hm');
        prop(xmas(), 70, 3, .5); prop(snowman(), 30, 2.2, .4);
        prop(P({ mode: 'idle', shirt: '#16a34a', hat: 'santa', acc: 'scarf', accCol: '#fff', wave: true, long: true, hair: '#7c2d12' }), 77, 2.9, .3, 'hm');
        act(P({ shirt: '#dc2626', hat: 'santa', hold: 'gift', acc: 'scarf', accCol: '#fff' }), 3.1, 34, -5, { sx: 42 }); act(P({ shirt: '#22d3ee', hat: 'bonnet', hatCol: '#8b5cf6', acc: 'scarf', accCol: '#fcd34d', hold: 'gift', skin: '#b9805a' }), 2.6, 40, -24, { rev: true, sx: 56 }); act(sled(), 3.4, 15, -9, { sx: 20, b: .2 });
        fall(34, ['#fff', '#e0f2fe'], '', 2, 5);
    }
    bar.className = 'season-bar'; bar.setAttribute('role', 'status');
    bar.style.setProperty('--sky1', SKY[m][0]); bar.style.setProperty('--sky2', SKY[m][1]); bar.style.setProperty('--season', TXT[m][2]);
    bar.innerHTML = H.join('') + '<span class="ss-ban' + (m === 11 ? ' sl' : '') + '"><span class="bn"><span class="st"></span></span><i class="rope"></i><span class="pl">' + (m === 11 ? sleigh() : plane()) + '</span></span>';
    var st = bar.querySelector('.st');
    bar._setText = function () { st.textContent = (document.documentElement.lang === 'en' ? TXT[m][1] : TXT[m][0]).replace('{Y}', String(year)); };
    bar._setText();
    return bar;
  }
  function defs() {
    if (document.getElementById('ss-shade')) return;
    var d = document.createElement('div'); d.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    d.innerHTML = '<svg width="0" height="0"><defs><linearGradient id="ss-shade" x1="0" x2="1" y1="0" y2=".25"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".36"/></linearGradient></defs></svg>';
    document.body.appendChild(d);
  }

  /* ---------- décor discret sur le fond de la page ---------- */
  function backdrop(m) {
    var K = [['rect', ['#22d3ee', '#8b5cf6', '#f5c542', '#f472b6']], ['dot', ['#fff', '#e0f2fe']], ['petal', ['#fbcfe8', '#f9a8d4']], ['petal', ['#fde68a', '#f9a8d4', '#a5f3fc']], ['dot', ['#fde68a', '#bef264']], ['dot', ['#fde68a', '#fdba74']], ['ring', ['#67e8f9', '#fff']], ['ring', ['#38bdf8', '#fff']], ['leaf', ['#d97706', '#ca8a04']], ['ribbon', ['#ec4899', '#f9a8d4']], ['stache', ['#e8e8f0', '#93c5fd', '#60a5fa']], ['dot', ['#fff', '#e0f2fe']]][m];
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var cv = document.createElement('canvas'); cv.className = 'bg-season'; cv.setAttribute('aria-hidden', 'true'); document.body.appendChild(cv);
    var ctx = cv.getContext('2d'), W = 0, Hh = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.5), P = [], up = K[0] === 'ring';
    function spawn(init) { var s = K[0] === 'stache' ? rnd(12, 20) : K[0] === 'ribbon' ? rnd(7, 12) : rnd(2.5, 7); return { x: rnd(0, W), y: init ? rnd(0, Hh) : (up ? Hh + 20 : -20), s: s, a: K[0] === 'stache' ? rnd(-.3, .3) : rnd(0, 6.28), va: K[0] === 'stache' ? 0 : rnd(-.015, .015), vx: rnd(-.2, .2), vy: rnd(.25, .7) * (up ? -1 : 1), c: pick(K[1]), ph: rnd(0, 6.28), al: rnd(.14, .34) }; }
    function size() { W = window.innerWidth; Hh = window.innerHeight; cv.width = W * dpr; cv.height = Hh * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); var n = Math.round(8 * Math.min(1, W / 1200) + 3); P = []; for (var i = 0; i < n; i++) P.push(spawn(true)); }
    function draw(p) {
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.globalAlpha = p.al; ctx.fillStyle = p.c; ctx.strokeStyle = p.c; var s = p.s;
      if (K[0] === 'dot') { ctx.beginPath(); ctx.arc(0, 0, s * .6, 0, 6.283); ctx.fill(); }
      else if (K[0] === 'rect') ctx.fillRect(-s, -s / 2.4, s * 2, s / 1.2);
      else if (K[0] === 'petal' || K[0] === 'leaf') { ctx.beginPath(); ctx.moveTo(0, -s * 1.4); ctx.quadraticCurveTo(s * 1.2, 0, 0, s * 1.4); ctx.quadraticCurveTo(-s * 1.2, 0, 0, -s * 1.4); ctx.fill(); }
      else if (K[0] === 'ring') { ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(0, 0, s * 1.4, 0, 6.283); ctx.stroke(); }
      else if (K[0] === 'ribbon') { ctx.lineWidth = s * .28; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-s * .45, s); ctx.bezierCurveTo(-s * .1, s * .2, s * .55, -s * .5, 0, -s * .85); ctx.bezierCurveTo(-s * .55, -s * .5, s * .1, s * .2, s * .45, s); ctx.stroke(); }
      else { for (var k = -1; k <= 1; k += 2) { ctx.save(); ctx.scale(k * s, s); ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(.25, -.35, .7, -.35, .9, -.05); ctx.bezierCurveTo(1, .1, 1.15, .05, 1.2, -.15); ctx.bezierCurveTo(1.2, .25, .8, .35, .55, .2); ctx.bezierCurveTo(.35, .1, .15, .15, 0, .25); ctx.closePath(); ctx.fill(); ctx.restore(); } }
      ctx.restore();
    }
    function step() { ctx.clearRect(0, 0, W, Hh); for (var i = 0; i < P.length; i++) { var p = P[i]; if (!reduce) { p.ph += .02; p.x += p.vx + Math.sin(p.ph) * .4; p.y += p.vy; p.a += p.va; if (p.y > Hh + 30 || p.y < -30 || p.x < -40 || p.x > W + 40) p = P[i] = spawn(false); } draw(p); } }
    var raf = 0; function loop() { step(); raf = requestAnimationFrame(loop); }
    size(); window.addEventListener('resize', function () { size(); if (reduce) step(); });
    if (reduce) step(); else { raf = requestAnimationFrame(loop); document.addEventListener('visibilitychange', function () { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(loop); }); }
  }

  window.NLD_SEASON = { build: function (m, y) { defs(); return build(m - 1, y || new Date().getFullYear()); } };
  if (document.documentElement.hasAttribute('data-season-preview')) return;
  var now = new Date(), month = now.getMonth(), year = now.getFullYear();
  try { var q = parseInt(new URLSearchParams(location.search).get('mois'), 10); if (q >= 1 && q <= 12) month = q - 1; } catch (e) {}
  if (month === 0 && now.getMonth() !== 0) year += 1; // aperçu de janvier : année à venir
  var root = document.documentElement;
  root.style.setProperty('--season', TXT[month][2]); root.setAttribute('data-season', String(month + 1));
  defs();
  var bar = build(month, year);
  document.body.insertBefore(bar, document.body.firstChild);
  try { new MutationObserver(bar._setText).observe(root, { attributes: true, attributeFilter: ['lang'] }); } catch (e) {}
  backdrop(month);
  window.NLD_SEASON.month = month + 1;
})();
