/* NextLevel Dev — envoi des formulaires.
   Chaque message part vers Netlify (historique dans l'onglet Forms)
   et vers Web3Forms (envoi par e-mail). Il est réussi si l'un des deux l'a reçu. */
(function () {
  var KEY = '2499e516-e824-49d1-b982-b48b913a6218'; // clé publique Web3Forms (faite pour être visible dans le site)
  window.NLD_SUBMIT = function (form, done) {
    var fd = new FormData(form);
    var netlify = fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(fd).toString() })
      .then(function (r) { return r.ok; }, function () { return false; });
    var body = { access_key: KEY, from_name: 'Site NextLevel Dev', botcheck: '' };
    fd.forEach(function (v, k) { if (k === 'form-name' || k === 'bot-field') return; body[k] = v; });
    if (fd.get('bot-field')) body.botcheck = 'on';
    body.formulaire = fd.get('form-name') || '';
    if (body.email) body.replyto = body.email;
    var mail = fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().then(function (j) { return !!(j && j.success); }, function () { return r.ok; }); }, function () { return false; });
    Promise.all([netlify, mail]).then(function (res) { done(res[0] || res[1]); });
  };
})();
