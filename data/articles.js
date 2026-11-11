/* =====================================================================
   articles.js  -  أقسام ومقالات وأخبار صفحة Insights & Publications

   ثلاثة أنواع من العناصر (type):
   'article'      مقال تكتبه أنت، وله صفحة داخل موقعك  (article.html?id=...)
   'news'         خبر معماري: عنوان + المصدر + رابط يفتح موقع الخبر الأصلي
   'publication'  بحث أو ورقة علمية: رابط إلى النشر الأصلي (DOI أو PDF)

   كيف تضيف مقالًا جديدًا (3 خطوات):
   1) (اختياري) أنشئ مجلدًا  images/insights/اسم-المقال/  وضع فيه  cover.jpg  وصور المقال.
   2) انسخ أحد العناصر بالأسفل (من  {  إلى  },  ) والصقه في أول القائمة  ARTICLES.
   3) غيّر النصوص بالإنجليزي والعربي، واحذف السطر  draft: true  ليظهر للزوار. ثم احفظ.

   cat (القسم) يجب أن يكون واحدًا من:
   design | technology | management | environment | research | professional

   draft: true  = العنصر مخفي عن الزوار (للمعاينة على جهازك افتح:  insights.html?draft=1 )
   ===================================================================== */

/* ---------- الأقسام الستة (من تصميمك) ---------- */
window.INSIGHT_CATS = [
  { id: 'design', photo: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=80&auto=format&fit=crop', num: '01', tag: 'DESIGN',
    title: { en: 'Architectural Design & Innovation', ar: 'التصميم المعماري والابتكار' },
    text:  { en: 'Design Concepts, Innovation & Architectural Trends.', ar: 'أفكار التصميم والابتكار والاتجاهات المعمارية.' },
    cta:   { en: 'Explore Articles', ar: 'استكشف المقالات' } },
  { id: 'technology', photo: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format&fit=crop', num: '02', tag: 'TECHNOLOGY',
    title: { en: 'Building Science & Technology', ar: 'علوم وتكنولوجيا البناء' },
    text:  { en: 'Materials, Sustainability & Building Technology.', ar: 'مواد البناء والاستدامة وتكنولوجيا التشييد.' },
    cta:   { en: 'Explore Articles', ar: 'استكشف المقالات' } },
  { id: 'management', photo: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80&auto=format&fit=crop', num: '03', tag: 'MANAGEMENT',
    title: { en: 'Project Management & Construction', ar: 'إدارة المشروعات والتنفيذ' },
    text:  { en: 'Construction, BIM & Quality Control.', ar: 'التنفيذ وإدارة المواقع ونظم BIM وضبط الجودة.' },
    cta:   { en: 'Explore Articles', ar: 'استكشف المقالات' } },
  { id: 'environment', photo: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80&auto=format&fit=crop', num: '04', tag: 'ENVIRONMENT',
    title: { en: 'Indoor Environmental Quality', ar: 'جودة البيئة الداخلية' },
    text:  { en: 'Indoor Air Quality, Ventilation & Comfort.', ar: 'جودة الهواء والتهوية والراحة داخل المباني.' },
    cta:   { en: 'Explore Articles', ar: 'استكشف المقالات' } },
  { id: 'research', photo: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=900&q=80&auto=format&fit=crop', num: '05', tag: 'RESEARCH',
    title: { en: 'Research & Publications', ar: 'الأبحاث والمنشورات العلمية' },
    text:  { en: 'Scientific Papers, Studies & Publications.', ar: 'الأبحاث والدراسات والأوراق العلمية المنشورة.' },
    cta:   { en: 'Explore Research', ar: 'استكشف الأبحاث' } },
  { id: 'professional', photo: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&q=80&auto=format&fit=crop', num: '06', tag: 'PROFESSIONAL',
    title: { en: 'Professional Insights & News', ar: 'رؤى وآراء مهنية' },
    text:  { en: 'Professional Opinions, News & Activities.', ar: 'الآراء المهنية والأخبار والأنشطة والمؤتمرات.' },
    cta:   { en: 'Explore Articles', ar: 'استكشف المقالات' } }
];

/* ---------- المقالات والأخبار (الأمثلة التالية مخفية draft: true، استبدلها بمحتواك) ---------- */
window.ARTICLES = [

  /* مثال 1: مقال داخلي (له صفحة في موقعك) */
  {
    id: 'sample-article',
    draft: true,
    type: 'article',
    cat: 'design',
    date: '2026-11-11',
    title:   { en: 'Sample Article: Reading a Façade Before Drawing It',
               ar: 'مقال تجريبي: قراءة الواجهة قبل رسمها' },
    summary: { en: 'A short example showing how an article looks on the site.',
               ar: 'مثال قصير يوضح شكل المقال في الموقع.' },
    /* الصورة: images/insights/sample-article/cover.jpg (إن لم تُوجد تظهر صورة القسم) */
    body: {
      en: [
        'This is the first paragraph of the article. Write plain text here.',
        { h: 'A section heading' },
        'Each line between quotes is a paragraph. Add as many as you need.',
        { list: ['First point', 'Second point', 'Third point'] },
        { quote: 'A short quotation or a key idea can be highlighted like this.' },
        { img: '1.jpg', caption: 'Image caption (put 1.jpg inside images/insights/sample-article/)' }
      ],
      ar: [
        'هذه هي الفقرة الأولى من المقال. اكتب النص العادي هنا.',
        { h: 'عنوان فرعي' },
        'كل سطر بين علامتي الاقتباس هو فقرة. أضف ما تحتاجه من فقرات.',
        { list: ['النقطة الأولى', 'النقطة الثانية', 'النقطة الثالثة'] },
        { quote: 'اقتباس قصير أو فكرة رئيسية يمكن إبرازها هكذا.' },
        { img: '1.jpg', caption: 'تعليق الصورة (ضع 1.jpg داخل images/insights/sample-article/)' }
      ]
    }
  },

  /* مثال 2: خبر معماري (يفتح موقع الخبر الأصلي، ضع الرابط الحقيقي) */
  {
    id: 'sample-news',
    draft: true,
    type: 'news',
    cat: 'professional',
    date: '2026-11-10',
    source: 'ArchDaily',                         /* اسم الموقع صاحب الخبر */
    link: 'https://www.archdaily.com/',          /* رابط الخبر نفسه */
    title:   { en: 'Sample News Headline from an Architecture Website',
               ar: 'عنوان خبر تجريبي من موقع معماري' },
    summary: { en: 'One or two lines of your own words about why this news matters.',
               ar: 'سطر أو سطران بكلماتك عن أهمية هذا الخبر.' }
  },

  /* مثال 3: بحث منشور (رابط النشر الأصلي) */
  {
    id: 'sample-publication',
    draft: true,
    type: 'publication',
    cat: 'research',
    date: '2025-06-01',
    source: 'Journal name',
    link: 'https://doi.org/',                    /* رابط البحث أو ملف PDF */
    title:   { en: 'Sample Publication: Indoor Air Quality Study',
               ar: 'بحث منشور تجريبي: دراسة جودة الهواء الداخلي' },
    summary: { en: 'A two-line abstract of the study.',
               ar: 'ملخص من سطرين للدراسة.' }
  }

];
