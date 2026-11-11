/* =====================================================================
   projects-ui.js  -  يعرض المشاريع من ملف data/projects.js:
   - شبكة البطاقات في الصفحة الرئيسية وصفحة المشاريع (مع الفلاتر)
   - صفحة المشروع الواحد (الوصف + معرض الصور + تكبير الصور)
   ===================================================================== */
(function () {
  var P = window.PROJECTS || [];
  var FALLBACK = 'images/placeholder.svg';

  
var SECTORS = {
    industrial:     { en: 'Industrial',                ar: 'صناعي' },
    educational:    { en: 'Educational',               ar: 'تعليمي' },
    healthcare:     { en: 'Healthcare',                ar: 'رعاية صحية' },
    administrative: { en: 'Administrative & Banking',  ar: 'إداري ومصرفي' },
    residential:    { en: 'Residential',               ar: 'سكني' },
    heritage:       { en: 'Heritage & Conservation',   ar: 'التراث والحفاظ المعماري' }
};

  function bi(o) { return '<span class="en">' + (o.en || '') + '</span><span class="ar">' + (o.ar || '') + '</span>'; }
  function imgPath(p, file) { return 'images/projects/' + p.id + '/' + file; }
  function img(src, alt) {
    return '<img src="' + src + '" alt="' + alt + '" loading="lazy" onerror="this.onerror=null;this.src=\'' + FALLBACK + '\'">';
  }

  /* بطاقة مشروع */
  function card(p) {
    return '<a class="project-card" href="project.html?id=' + p.id + '" data-sector="' + p.sector + '">' +
      '<span class="card-img">' + img(imgPath(p, 'cover.jpg'), p.title.en) +
        '<span class="card-more">' + bi({ en: 'View project →', ar: 'عرض المشروع ←' }) + '</span></span>' +
      '<span class="card-body">' +
        '<span class="card-title">' + bi(p.title) + '</span>' +
        '<span class="card-meta">' + bi(SECTORS[p.sector] || { en: '', ar: '' }) +
          (p.location && p.location.en ? ' · ' + bi(p.location) : '') + '</span>' +
      '</span></a>';
  }

  /* ---- 1) المشاريع المختارة في الصفحة الرئيسية ---- */
  var featured = document.getElementById('featured-grid');
  if (featured) { featured.innerHTML = P.slice(0, 8).map(card).join(''); }

  /* ---- 2) صفحة كل المشاريع مع الفلاتر ---- */
  var grid = document.getElementById('projects-grid');
  var filters = document.getElementById('filters');
  if (grid) {
    grid.innerHTML = P.map(card).join('');
    if (filters) {
      var html = '<button type="button" class="chip active" data-f="all">' + bi({ en: 'All', ar: 'الكل' }) + '</button>';
      Object.keys(SECTORS).forEach(function (k) {
        if (P.some(function (p) { return p.sector === k; })) {
          html += '<button type="button" class="chip" data-f="' + k + '">' + bi(SECTORS[k]) + '</button>';
        }
      });
      filters.innerHTML = html;
      function apply(f) {
        [].forEach.call(filters.querySelectorAll('.chip'), function (c) { c.classList.toggle('active', c.getAttribute('data-f') === f); });
        [].forEach.call(grid.querySelectorAll('.project-card'), function (c) {
          c.style.display = (f === 'all' || c.getAttribute('data-sector') === f) ? '' : 'none';
        });
      }
      filters.addEventListener('click', function (e) {
        var b = e.target.closest('.chip'); if (b) { apply(b.getAttribute('data-f')); }
      });
      var q = new URLSearchParams(location.search).get('sector');
      if (q && SECTORS[q]) { apply(q); }
    }
  }

  /* ---- 3) صفحة مشروع واحد ---- */
  var detail = document.getElementById('project-detail');
  if (detail) {
    var id = new URLSearchParams(location.search).get('id');
    var idx = P.findIndex(function (p) { return p.id === id; });
    if (idx < 0) { idx = 0; }
    var p = P[idx];
    var prev = P[(idx - 1 + P.length) % P.length], next = P[(idx + 1) % P.length];
    document.title = p.title.en + ' | Architetto Egizio';

    var facts = [
      [{ en: 'Sector', ar: 'القطاع' }, SECTORS[p.sector]],
      [{ en: 'Location', ar: 'الموقع' }, p.location],
      [{ en: 'Area', ar: 'المساحة' }, p.area],
      [{ en: 'My role', ar: 'دوري' }, p.role],
      [{ en: 'Year', ar: 'السنة' }, p.year ? { en: p.year, ar: p.year } : null]
    ].filter(function (f) { return f[1] && (f[1].en || f[1].ar); })
     .map(function (f) { return '<div><dt>' + bi(f[0]) + '</dt><dd>' + bi(f[1]) + '</dd></div>'; }).join('');

    var files = ['cover.jpg'].concat(p.images || []);
    var gallery = files.map(function (f, i) {
      return '<button type="button" class="g-item' + (i === 0 ? ' g-first' : '') + '" data-i="' + i + '" aria-label="Open image ' + (i + 1) + '">' +
             img(imgPath(p, f), p.title.en + ' ' + (i + 1)) + '</button>';
    }).join('');

    detail.innerHTML =
      '<p class="crumbs"><a href="projects.html">' + bi({ en: '← All projects', ar: '→ كل المشروعات' }) + '</a></p>' +
      '<h1 class="page-title">' + bi(p.title) + '</h1>' +
      '<div class="detail-top">' +
        '<div class="detail-text"><p class="en">' + p.description.en + '</p><p class="ar">' + p.description.ar + '</p></div>' +
        '<dl class="facts">' + facts + '</dl>' +
      '</div>' +
      '<div class="gallery" id="gallery">' + gallery + '</div>' +
      '<div class="pager">' +
        '<a href="project.html?id=' + prev.id + '">' + bi({ en: '← ' + prev.title.en, ar: '→ ' + prev.title.ar }) + '</a>' +
        '<a href="project.html?id=' + next.id + '">' + bi({ en: next.title.en + ' →', ar: next.title.ar + ' ←' }) + '</a>' +
      '</div>';

    /* تكبير الصور (Lightbox) */
    var lb = document.createElement('div');
    lb.className = 'lightbox'; lb.hidden = true;
    lb.innerHTML = '<button type="button" class="lb-close" aria-label="Close">×</button>' +
      '<button type="button" class="lb-prev" aria-label="Previous">‹</button>' +
      '<img alt=""><button type="button" class="lb-next" aria-label="Next">›</button>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img'), cur = 0;
    function show(i) {
      cur = (i + files.length) % files.length;
      lbImg.onerror = function () { lbImg.onerror = null; lbImg.src = FALLBACK; };
      lbImg.src = imgPath(p, files[cur]);
    }
    function open(i) { show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; }
    function close() { lb.hidden = true; document.body.style.overflow = ''; }
    document.getElementById('gallery').addEventListener('click', function (e) {
      var b = e.target.closest('.g-item'); if (b) { open(parseInt(b.getAttribute('data-i'), 10)); }
    });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(cur - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(cur + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) { close(); } });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) { return; }
      if (e.key === 'Escape') { close(); }
      if (e.key === 'ArrowLeft')  { show(cur - 1); }
      if (e.key === 'ArrowRight') { show(cur + 1); }
    });
  }
})();
