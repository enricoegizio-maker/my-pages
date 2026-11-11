/* =====================================================
   music.js  -  الموسيقى الخلفية للموقع
   - لا تبدأ تلقائيًا (المتصفحات تمنع ذلك)، بل عند ضغط زر الموسيقى
   - تستمر بعد انتهاء المقدمة وأثناء تصفح الصفحة
   - تتذكر حالتها عند الانتقال بين الصفحة العربية والإنجليزية
   ===================================================== */
(function () {
  var btn   = document.getElementById('music-toggle');
  var audio = document.getElementById('bg-music');
  if (!btn || !audio) { return; }

  var label = btn.querySelector('span');
  var START = 2.0;      /* نقطة بدء الأغنية (بعد الثواني الأولى الصامتة) */
  var VOLUME = 0.7;     /* مستوى الصوت من 0 إلى 1 */
  var fader, wantOn = false;

  function store(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  function read(k)     { try { return sessionStorage.getItem(k); } catch (e) { return null; } }

  var playing = false;
  function setUI(on) {
    playing = on;
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    var l = document.documentElement.lang === 'ar' ? 'ar' : 'en';
    label.textContent = btn.getAttribute((on ? 'data-off-' : 'data-on-') + l);
  }
  document.addEventListener('langchange', function () { setUI(playing); });
  setUI(false);

  /* تغيير تدريجي لمستوى الصوت */
  function fadeTo(target, ms, done) {
    clearInterval(fader);
    var steps = 20, i = 0, from = audio.volume, d = (target - from) / steps;
    fader = setInterval(function () {
      i++;
      audio.volume = Math.min(1, Math.max(0, from + d * i));
      if (i >= steps) { clearInterval(fader); if (done) { done(); } }
    }, ms / steps);
  }

  /* الانتقال لنقطة معيّنة في الأغنية (ننتظر تحميل بياناتها إن لم تُحمَّل بعد) */
  function seek(time) {
    if (time === null) { return; }
    if (audio.readyState >= 1) { audio.currentTime = time; return; }
    audio.addEventListener('loadedmetadata', function h() {
      audio.removeEventListener('loadedmetadata', h);
      audio.currentTime = time;
    });
  }

  function start(fromTime) {
    audio.loop = true;
    audio.volume = 0;
    seek(fromTime);
    var p = audio.play();
    function ok() { wantOn = true; setUI(true); store('musicOn', '1'); fadeTo(VOLUME, 1500); }
    function no() { wantOn = false; setUI(false); store('musicOn', '0'); }
    if (p && p.then) { p.then(ok).catch(no); } else { ok(); }
  }

  function stop() {
    wantOn = false;
    setUI(false);
    store('musicOn', '0');
    fadeTo(0, 500, function () { audio.pause(); });
  }

  btn.addEventListener('click', function () {
    if (!audio.paused) { stop(); return; }
    /* إن كانت المقدمة تعمل، نزامن الموسيقى مع مشهد الفيديو */
    var v = document.getElementById('intro-video');
    var introRunning = v && document.getElementById('intro') && !v.ended && v.currentTime > 0;
    var resume = audio.currentTime > START ? audio.currentTime : null;
    start(introRunning ? START + v.currentTime : (resume !== null ? resume : START));
  });

  /* نحفظ مكان الموسيقى باستمرار، لنكملها من نفس المكان عند الانتقال لصفحة أخرى */
  audio.addEventListener('timeupdate', function () { store('musicTime', String(audio.currentTime)); });
  if (read('musicOn') === '1') {
    var t = parseFloat(read('musicTime'));
    start(isNaN(t) || t < START ? START : t);          /* إن منعها المتصفح يعود الزر إلى وضع "تشغيل" */
  }

  /* تتوقف مؤقتًا عند مغادرة التبويب وتعود عند الرجوع */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { if (!audio.paused) { audio.pause(); } }
    else if (wantOn) { audio.play().catch(function () {}); }
  });
})();
