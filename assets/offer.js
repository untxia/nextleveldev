/* Offre de lancement & prix — réglages à modifier ici (seul endroit à toucher). */
(function () {
  var O = window.NLD_OFFER = {
    PLACES_RESTANTES: 5,      // ← nombre de places restantes (0 = l'offre de lancement disparaît, prix normaux affichés)
    PLACES_TOTAL: 5,          // nombre de places au lancement
    PRICE_BASIS: 'TTC',       // 'TTC' ou 'HT'
    VAT_FR: 'TVA non applicable, art. 293 B du CGI',
    VAT_EN: 'VAT not applicable, art. 293 B of the French Tax Code'
  };
  O.active = function () { return O.PLACES_RESTANTES > 0; };
  function en() { return window.NLD_I18N && window.NLD_I18N.lang() === 'en'; }
  function setAll(sel, txt) { Array.prototype.forEach.call(document.querySelectorAll(sel), function (e) { e.textContent = txt; }); }
  function apply() {
    var n = O.PLACES_RESTANTES, e = en();
    document.documentElement.classList.toggle('launch-off', !O.active());
    var label = n >= O.PLACES_TOTAL ? (n + (e ? ' spots' : ' places')) : n === 1 ? (e ? 'Only 1 spot left' : 'Plus qu’une place') : (e ? 'Only ' + n + ' spots left' : 'Plus que ' + n + ' places');
    setAll('[data-places-label]', label);
    setAll('[data-places-extra]', (O.active() && n < O.PLACES_TOTAL) ? ' ' + (n === 1 ? (e ? 'Only 1 spot left.' : 'Plus qu’une place.') : (e ? 'Only ' + n + ' spots left.' : 'Plus que ' + n + ' places.')) : '');
    var basis = O.PRICE_BASIS;
    setAll('[data-vat]', e ? 'All prices ' + basis + ' · ' + O.VAT_EN : 'Tous les prix sont en ' + basis + ' · ' + O.VAT_FR);
  }
  O.apply = apply;
  apply();
  if (window.NLD_I18N) window.NLD_I18N.onChange(apply);
})();
