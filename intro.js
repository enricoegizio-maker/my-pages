/* =====================================================
   intro.js  -  تحكم المقدمة المتحركة
   1) يعمل الفيديو
   2) يظهر الشعار (صورة) بدل الفيديو
   3) يطير الشعار إلى مكانه في رأس الصفحة وتظهر الصفحة
   ===================================================== */
(function () {
  var root  = document.documentElement;
  var intro = document.getElementById('intro');
  if (!intro || !root.classList.contains('has-intro')) { return; }

  var video  = document.getElementById('intro-video');
  var logo   = document.getElementById('intro-logo');
  var logoLight = document.getElementById('intro-logo-light');   /* نسخة الشعار الفاتحة التي تظهر فوق الرأس الداكن */
  var target = document.getElementById('site-logo');
  var skip   = document.getElementById('intro-skip');

  var raf, finished = false, logoShown = false;
  window.scrollTo(0, 0);

  /* لون خلفية الفيديو عبر الزمن (ثانية، درجة الرمادي) حتى تذوب حواف الفيديو */
  var BG = [[0, 253], [1, 251], [2, 244], [3, 235], [4, 228], [5, 227]];
  function grayAt(t) {
    for (var i = 1; i < BG.length; i++) {
      if (t <= BG[i][0]) {
        var a = BG[i - 1], b = BG[i];
        return a[1] + (b[1] - a[1]) * ((t - a[0]) / (b[0] - a[0]));
      }
    }
    return BG[BG.length - 1][1];
  }
  function tick() {
    var g = Math.round(grayAt(video.currentTime));
    intro.style.backgroundColor = 'rgb(' + g + ',' + g + ',' + g + ')';
    raf = requestAnimationFrame(tick);
  }

  /* المرحلة 2: إظهار صورة الشعار */
  function showLogo() {
    if (logoShown || finished) { return; }
    logoShown = true;
    cancelAnimationFrame(raf);
    intro.classList.add('logo-in');
    setTimeout(fly, 1000);
  }

  /* المرحلة 3: طيران الشعار إلى الرأس */
  function fly() {
    if (finished) { return; }
    var from = logo.getBoundingClientRect();
    var to   = target.getBoundingClientRect();
    var s  = to.height / from.height;
    var dx = (to.left + to.width / 2)  - (from.left + from.width / 2);
    var dy = (to.top  + to.height / 2) - (from.top  + from.height / 2);
    intro.classList.add('leaving');
    intro.style.backgroundColor = 'rgba(227,227,227,0)';
    var tf = 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')';
    logo.style.transform = tf;
    if (logoLight) { logoLight.style.transform = tf; }
    setTimeout(finish, 1200);
  }

  /* النهاية: إزالة المقدمة وإظهار الصفحة */
  function finish() {
    if (finished) { return; }
    finished = true;
    cancelAnimationFrame(raf);
    try { video.pause(); } catch (e) {}
    root.classList.add('intro-done');
    try { sessionStorage.setItem('introSeen', '1'); } catch (e) {}
    if (intro.parentNode) { intro.parentNode.removeChild(intro); }
  }

  /* زر التخطي: ينهي المقدمة بسرعة */
  skip.addEventListener('click', function () {
    intro.classList.add('leaving');
    intro.style.backgroundColor = 'rgba(227,227,227,0)';
    intro.style.opacity = '0';
    intro.style.transition = 'opacity .4s ease';
    setTimeout(finish, 450);
  });

  /* الفيديو */
  video.addEventListener('ended', showLogo);
  video.addEventListener('error', showLogo);        /* إن تعذر الفيديو ننتقل للشعار مباشرة */
  var started = false;
  video.addEventListener('playing', function () { started = true; tick(); });
  setTimeout(function () { if (!started) { showLogo(); } }, 3000);   /* احتياط: الفيديو لم يبدأ */

  var p = video.play();
  if (p && p.catch) { p.catch(showLogo); }
})();
