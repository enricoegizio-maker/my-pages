/* =====================================================
   brand-fit.js  -  يجعل سطر الاسم الإنجليزي وسطر الاسم العربي
   بنفس العرض تمامًا (مهما كان الخط أو حجم الشاشة)
   ===================================================== */
(function () {
  var en   = document.querySelector('.brand-en');
  var ar   = document.querySelector('.brand-ar');
  var logo = document.getElementById('site-logo');
  if (!en || !ar || !logo) { return; }

  function fit() {
    /* العرض المطلوب: 250 بكسل كحد أقصى، ويصغر على الشاشات الضيقة */
    var logoW  = logo.getBoundingClientRect().width;
    var target = Math.max(120, Math.min(250, window.innerWidth - logoW - 210));

    [en, ar].forEach(function (el) {
      el.style.fontSize = '100px';                    /* قياس أولي */
      var w = el.getBoundingClientRect().width;
      el.style.fontSize = (100 * target / w) + 'px';  /* الحجم الذي يعطي العرض المطلوب */
    });
  }

  fit();
  window.addEventListener('resize', fit);
  window.addEventListener('load', fit);
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(fit); }
})();
