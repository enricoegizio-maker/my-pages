/* =====================================================================
   layout.js  -  يبني رأس الصفحة (الشعار والقائمة) وأسفلها (الفوتر)
   وزر تبديل اللغة وزر الموسيقى، فتكتبها مرة واحدة وتظهر في كل الصفحات.
   ===================================================================== */
(function () {
  var page = document.body.getAttribute('data-page') || '';

  /* قائمة التنقل: [الرابط، اسم الصفحة، الإنجليزي، العربي] */
  var NAV = [
    ['projects.html', 'projects', 'Projects', 'المشروعات'],
    ['about.html',    'about',    'About',    'عن المكتب'],
    ['services.html', 'services', 'Services', 'الخدمات'],
    ['insights.html', 'insights', 'Insights', 'المقالات'],
    ['contact.html',  'contact',  'Contact',  'تواصل']
  ];

  function bi(en, ar) { return '<span class="en">' + en + '</span><span class="ar">' + ar + '</span>'; }

  var links = NAV.map(function (n) {
    return '<a href="' + n[0] + '"' + (n[1] === page ? ' class="active" aria-current="page"' : '') + '>' + bi(n[2], n[3]) + '</a>';
  }).join('');

  var header =
    '<div class="wrap header-inner">' +
      '<a class="brand-link" href="index.html" aria-label="Architetto Egizio">' +
        '<img id="site-logo" src="images/logo-light.png" alt="Architetto Egizio logo">' +
        '<span class="brand">' +
          '<span class="brand-en">Architetto Egizio</span>' +
          '<span class="brand-ar" lang="ar" dir="rtl">المعماري المصري</span>' +
        '</span>' +
      '</a>' +
      '<nav class="main-nav" id="main-nav" aria-label="Main">' + links + '</nav>' +
      '<button class="lang-btn" id="lang-btn" type="button" aria-label="Language">' +
        '<span class="en">العربية</span><span class="ar">English</span>' +
      '</button>' +
      '<button class="nav-toggle" id="nav-toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="main-nav">' +
        '<i></i><i></i><i></i>' +
      '</button>' +
    '</div>';

  var footer =
    '<div class="wrap footer-inner">' +
      '<div class="footer-brand"><strong>Architetto Egizio</strong>' +
        '<span class="ar-name" lang="ar" dir="rtl">المعماري المصري</span></div>' +
      '<nav class="footer-nav" aria-label="Footer">' + links.replace(/ class="active" aria-current="page"/, '') + '</nav>' +
      '<p class="copy">' + bi('© 2026 Architetto Egizio. All rights reserved.', '© 2026 المعماري المصري. جميع الحقوق محفوظة.') + '</p>' +
      '<p class="credit">Music used from <a href="https://www.FesliyanStudios.com" target="_blank" rel="noopener">https://www.FesliyanStudios.com</a></p>' +
    '</div>';

  var h = document.getElementById('site-header');
  var f = document.getElementById('site-footer');
  if (h) { h.className = 'site-header'; h.innerHTML = header; }
  if (f) { f.className = 'site-footer'; f.innerHTML = footer; }

  /* الموسيقى الخلفية (يتحكم بها music.js) */
  var svg = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9H3z" fill="currentColor"/><path class="waves" d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var audio = document.createElement('audio');
  audio.id = 'bg-music'; audio.src = 'audio/music.mp3'; audio.loop = true; audio.preload = 'none';
  var btn = document.createElement('button');
  btn.id = 'music-toggle'; btn.type = 'button'; btn.setAttribute('aria-pressed', 'false');
  btn.setAttribute('data-on-en', 'Play music'); btn.setAttribute('data-off-en', 'Mute music');
  btn.setAttribute('data-on-ar', 'تشغيل الموسيقى'); btn.setAttribute('data-off-ar', 'إيقاف الموسيقى');
  btn.innerHTML = svg + '<span></span>';
  document.body.appendChild(audio);
  document.body.appendChild(btn);

  /* تبديل اللغة (تُحفظ في المتصفح) */
  function applyLang(l) {
    document.documentElement.lang = l;
    document.documentElement.dir = (l === 'ar') ? 'rtl' : 'ltr';
    try { localStorage.setItem('lang', l); } catch (e) {}
    document.dispatchEvent(new CustomEvent('langchange', { detail: l }));
  }
  var lb = document.getElementById('lang-btn');
  if (lb) {
    lb.addEventListener('click', function () {
      applyLang(document.documentElement.lang === 'ar' ? 'en' : 'ar');
    });
  }

  /* قائمة الموبايل */
  var tg = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');
  if (tg && nav) {
    tg.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      tg.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();
