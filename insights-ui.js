/* =====================================================================
   insights-ui.js  -  يعرض قسم Insights & Publications من ملف data/articles.js
   - بطاقات الأقسام الستة (الصفحة الرئيسية وصفحة Insights)
   - قائمة المقالات والمنشورات مع فلتر القسم
   - قائمة الأخبار المعمارية (روابط تفتح المصدر الأصلي)
   - صفحة المقال الواحد
   ===================================================================== */
(function () {
  var CATS = window.INSIGHT_CATS || [];
  var showDraft = /[?&]draft=1/.test(location.search);
  var ALL = (window.ARTICLES || []).filter(function (a) { return showDraft || !a.draft; })
    .sort(function (a, b) { return (b.date || '').localeCompare(a.date || ''); });
  var imgBase = 'images/insights/';

  function bi(o) { return '<span class="en">' + (o.en || '') + '</span><span class="ar">' + (o.ar || '') + '</span>'; }
  function cat(id) { return CATS.filter(function (c) { return c.id === id; })[0]; }
  /* سلسلة الصور: صورتك المحلية images/insights/cat-<id>.jpg ثم صورة Unsplash المجانية ثم الرسم الخطي */
  function fallbackCover(c) {
    var id = c ? c.id : 'design';
    return [imgBase + 'cat-' + id + '.jpg', c && c.photo ? c.photo : '', imgBase + 'cat-' + id + '.svg'].filter(Boolean);
  }
  function img(src, alt, fb) {
    var chain = (Array.isArray(fb) ? fb : [fb]).join('|');
    return '<img src="' + src + '" alt="' + alt + '" loading="lazy" data-chain="' + chain + '" ' +
      'onerror="var c=(this.dataset.chain||\'\').split(\'|\');var n=c.shift();this.dataset.chain=c.join(\'|\');if(n){this.src=n;}else{this.onerror=null;}">';
  }
  function fmtDate(d) {
    if (!d) { return ''; }
    var dt = new Date(d + 'T00:00:00');
    var en = dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    var ar = dt.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' });
    return '<span class="en">' + en + '</span><span class="ar">' + ar + '</span>';
  }
  var TYPES = {
    article:     { en: 'Article',     ar: 'مقال' },
    news:        { en: 'News',        ar: 'خبر' },
    publication: { en: 'Publication', ar: 'منشور علمي' }
  };
  var ACT = {
    article:     { en: 'Read article →',  ar: 'اقرأ المقال ←' },
    news:        { en: 'Read at source ↗', ar: 'اقرأ في المصدر ↗' },
    publication: { en: 'Open publication ↗', ar: 'افتح المنشور ↗' }
  };
  function href(a) { return a.type === 'article' ? 'article.html?id=' + a.id + (showDraft ? '&draft=1' : '') : a.link; }
  function ext(a) { return a.type === 'article' ? '' : ' target="_blank" rel="noopener"'; }

  /* ---------- بطاقات الأقسام الستة ---------- */
  function catCard(c, active) {
    return '<a class="insight-card' + (active ? ' is-active' : '') + '" href="insights.html?cat=' + c.id + '#list">' +
      '<span class="ic-img">' + img(imgBase + 'cat-' + c.id + '.jpg', c.title.en, fallbackCover(c).slice(1)) + '</span>' +
      '<span class="ic-body">' +
        '<span class="ic-num">' + c.num + ' / ' + c.tag + '</span>' +
        '<span class="ic-title">' + bi(c.title) + '</span>' +
        '<span class="ic-text">' + bi(c.text) + '</span>' +
        '<span class="ic-btn">' + bi(c.cta) + ' <i class="arrow">→</i></span>' +
      '</span></a>';
  }
  var catsBox = document.getElementById('insight-cats');
  var params = new URLSearchParams(location.search);
  var activeCat = params.get('cat');
  if (catsBox) { catsBox.innerHTML = CATS.map(function (c) { return catCard(c, c.id === activeCat); }).join(''); }

  /* ---------- بطاقة مقال / خبر / منشور ---------- */
  function postCard(a) {
    var c = cat(a.cat);
    var cover = a.type === 'article' ? imgBase + a.id + '/cover.jpg' : imgBase + a.id + '/cover.jpg';
    return '<a class="post-card" href="' + href(a) + '"' + ext(a) + '>' +
      '<span class="pc-img">' + img(cover, a.title.en, fallbackCover(c)) + '</span>' +
      '<span class="pc-body">' +
        '<span class="pc-meta"><b class="badge badge-' + a.type + '">' + bi(TYPES[a.type] || TYPES.article) + '</b>' +
          (c ? '<span>' + bi(c.title) + '</span>' : '') + '<span>' + fmtDate(a.date) + '</span></span>' +
        '<span class="pc-title">' + bi(a.title) + '</span>' +
        '<span class="pc-text">' + bi(a.summary || { en: '', ar: '' }) + '</span>' +
        '<span class="pc-link">' + bi(ACT[a.type] || ACT.article) +
          (a.source ? ' <em>· ' + a.source + '</em>' : '') + '</span>' +
      '</span></a>';
  }

  /* ---------- قائمة المقالات والمنشورات (مع فلتر القسم) ---------- */
  var list = document.getElementById('insights-list');
  if (list) {
    var items = ALL.filter(function (a) { return a.type !== 'news' && (!activeCat || a.cat === activeCat); });
    var head = document.getElementById('list-title');
    var c0 = activeCat ? cat(activeCat) : null;
    if (head) {
      head.innerHTML = c0 ? bi(c0.title) : bi({ en: 'Latest Articles & Publications', ar: 'أحدث المقالات والمنشورات' });
    }
    var clear = document.getElementById('list-clear');
    if (clear) { clear.style.display = c0 ? '' : 'none'; }
    list.innerHTML = items.length ? items.map(postCard).join('') :
      '<p class="empty">' + bi({ en: 'Articles in this section are coming soon.', ar: 'المقالات في هذا القسم قادمة قريبًا.' }) + '</p>';
  }

  /* ---------- الأخبار المعمارية ---------- */
  var news = document.getElementById('news-list');
  if (news) {
    var n = ALL.filter(function (a) { return a.type === 'news'; });
    news.innerHTML = n.length ? n.slice(0, 8).map(function (a) {
      return '<a class="news-row" href="' + a.link + '" target="_blank" rel="noopener">' +
        '<span class="nr-date">' + fmtDate(a.date) + '</span>' +
        '<span class="nr-title">' + bi(a.title) + '</span>' +
        '<span class="nr-src">' + (a.source || '') + ' ↗</span></a>';
    }).join('') : '<p class="empty">' + bi({ en: 'Architecture news will appear here.', ar: 'ستظهر هنا الأخبار المعمارية.' }) + '</p>';
  }

  /* ---------- صفحة المقال الواحد ---------- */
  var box = document.getElementById('article-detail');
  if (box) {
    var id = params.get('id');
    var a = ALL.filter(function (x) { return x.id === id && x.type === 'article'; })[0];
    if (!a) {
      box.innerHTML = '<p class="crumbs"><a href="insights.html">' + bi({ en: '← All insights', ar: '→ كل المقالات' }) + '</a></p>' +
        '<h1 class="page-title">' + bi({ en: 'Article not found', ar: 'المقال غير موجود' }) + '</h1>';
    } else {
      var c = cat(a.cat);
      document.title = a.title.en + ' | Architetto Egizio';
      function blocks(arr) {
        return (arr || []).map(function (b) {
          if (typeof b === 'string') { return '<p>' + b + '</p>'; }
          if (b.h)     { return '<h2>' + b.h + '</h2>'; }
          if (b.list)  { return '<ul>' + b.list.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>'; }
          if (b.quote) { return '<blockquote>' + b.quote + '</blockquote>'; }
          if (b.img)   { return '<figure>' + img(imgBase + a.id + '/' + b.img, b.caption || '', 'images/placeholder.svg') +
                          (b.caption ? '<figcaption>' + b.caption + '</figcaption>' : '') + '</figure>'; }
          return '';
        }).join('');
      }
      var related = ALL.filter(function (x) { return x.type === 'article' && x.id !== a.id && x.cat === a.cat; }).slice(0, 2);
      var latestNews = ALL.filter(function (x) { return x.type === 'news'; }).slice(0, 4);
      box.innerHTML =
        '<p class="crumbs"><a href="insights.html">' + bi({ en: '← All insights', ar: '→ كل المقالات' }) + '</a></p>' +
        '<article class="article">' +
          '<p class="pc-meta">' + (c ? '<b class="badge badge-article">' + bi(c.title) + '</b>' : '') + '<span>' + fmtDate(a.date) + '</span></p>' +
          '<h1 class="page-title">' + bi(a.title) + '</h1>' +
          '<div class="article-cover">' + img(imgBase + a.id + '/cover.jpg', a.title.en, fallbackCover(c)) + '</div>' +
          '<div class="prose en">' + blocks(a.body && a.body.en) + '</div>' +
          '<div class="prose ar">' + blocks(a.body && a.body.ar) + '</div>' +
        '</article>' +
        (related.length ? '<h2 class="page-title sub-wide">' + bi({ en: 'More in this section', ar: 'المزيد في هذا القسم' }) + '</h2><div class="post-grid">' + related.map(postCard).join('') + '</div>' : '') +
        (latestNews.length ? '<h2 class="page-title sub-wide">' + bi({ en: 'Architecture News', ar: 'أخبار معمارية' }) + '</h2><div class="news-list">' +
          latestNews.map(function (x) {
            return '<a class="news-row" href="' + x.link + '" target="_blank" rel="noopener"><span class="nr-date">' + fmtDate(x.date) +
              '</span><span class="nr-title">' + bi(x.title) + '</span><span class="nr-src">' + (x.source || '') + ' ↗</span></a>';
          }).join('') + '</div>' : '');
    }
  }
})();
