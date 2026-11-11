/* =====================================================================
   projects.js  -  قائمة مشاريعك (هنا تضيف مشروعًا جديدًا)

   كيف تضيف مشروعًا جديدًا (3 خطوات):
   1) أنشئ مجلدًا داخل  images/projects/  باسم إنجليزي بدون مسافات، مثل:  villa-zayed
      وضع فيه صورة الغلاف باسم  cover.jpg  وبقية الصور 1.jpg  2.jpg  3.jpg ...
   2) انسخ أحد المشاريع بالأسفل (من  {  إلى  },  ) والصقه في أول القائمة.
   3) غيّر النصوص (بالإنجليزي والعربي) وقائمة الصور، ثم احفظ. هذا كل شيء.

   sector (القطاع) يجب أن يكون واحدًا من:
   industrial | educational | healthcare | administrative | residential
   ===================================================================== */
window.PROJECTS = [
  {
    id: 'university-campus',
    sector: 'educational',
    year: '',
    title:    { en: 'University Campus',                ar: 'حرم جامعي' },
    location: { en: 'Egypt',                            ar: 'مصر' },
    area:     { en: '25 Feddan · 9 Faculties',          ar: '25 فدانًا · 9 كليات' },
    role:     { en: 'Concept & initial design, supervision of execution',
                ar: 'التصميم الأولي والإشراف على التنفيذ' },
    summary:  { en: 'A complete university campus covering nine faculties.',
                ar: 'حرم جامعي متكامل يضم تسع كليات.' },
    description: {
      en: 'A complete university campus on 25 feddan covering nine faculties, developed over multiple stages including engineering, physiotherapy and dental faculties, a lecture hall building and services buildings. I produced the concept and initial designs and supervised the execution on site.',
      ar: 'حرم جامعي متكامل على مساحة 25 فدانًا يضم تسع كليات، جرى تطويره على عدة مراحل شملت كليات الهندسة والعلاج الطبيعي وطب الأسنان ومبنى مدرجات ومباني خدمية. قمت بإعداد التصميمات الأولية والإشراف على التنفيذ في الموقع.'
    },
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg']
  },
  {
    id: 'industrial-complex',
    sector: 'industrial',
    year: '',
    title:    { en: 'Industrial Factory Complex',       ar: 'مجمع مصانع صناعي' },
    location: { en: 'Sadat City, Egypt',                ar: 'مدينة السادات، مصر' },
    area:     { en: 'Approx. 35,000 m²',                ar: 'نحو 35,000 م²' },
    role:     { en: 'Architectural design, façade concept and site supervision',
                ar: 'التصميم المعماري وفكرة الواجهات والإشراف الموقعي' },
    summary:  { en: 'Electrical panel assembly and steel-structure cable manufacturing buildings.',
                ar: 'مبنى لتجميع لوحات الكهرباء ومبنى بهيكل معدني لتصنيع الكابلات.' },
    description: {
      en: 'An industrial complex of approximately 35,000 m² including an electrical panel assembly building and a steel-structure building for cable manufacturing. The work covers architectural design, façade concept and daily site supervision.',
      ar: 'مجمع صناعي بمساحة تقارب 35,000 م² يضم مبنى لتجميع لوحات الكهرباء ومبنى بهيكل معدني لتصنيع الكابلات. ويشمل العمل التصميم المعماري وفكرة الواجهات والإشراف الموقعي اليومي.'
    },
    images: ['1.jpg', '2.jpg', '3.jpg']
  },
  {
    id: 'private-hospital',
    sector: 'healthcare',
    year: '',
    title:    { en: 'Private Hospital',                 ar: 'مستشفى خاص' },
    location: { en: 'New Cairo, Egypt',                 ar: 'القاهرة الجديدة، مصر' },
    area:     { en: '',                                 ar: '' },
    role:     { en: 'Architectural design',             ar: 'التصميم المعماري' },
    summary:  { en: 'Design of a private hospital in New Cairo.',
                ar: 'تصميم مستشفى خاص بالقاهرة الجديدة.' },
    description: {
      en: 'Architectural design of a private hospital in New Cairo, organised around clear patient, staff and service circulation.',
      ar: 'تصميم معماري لمستشفى خاص بالقاهرة الجديدة، مع تنظيم واضح لحركة المرضى والعاملين والخدمات.'
    },
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg']
  },
  {
    id: 'kafr-shokr-hospital',
    sector: 'healthcare',
    year: '',
    title:    { en: 'Kafr Shokr Hospital',              ar: 'مستشفى كفر شكر' },
    location: { en: 'Kafr Shokr, Egypt',                ar: 'كفر شكر، مصر' },
    area:     { en: '',                                 ar: '' },
    role:     { en: 'Landscape and shop-drawing coordination',
                ar: 'تنسيق الموقع العام والمخططات التنفيذية' },
    summary:  { en: 'Landscape design and shop-drawing coordination.',
                ar: 'تنسيق أعمال الموقع العام والمخططات التنفيذية.' },
    description: {
      en: 'Participation in the landscape and external works and the coordination of shop drawings for Kafr Shokr Hospital.',
      ar: 'المشاركة في أعمال الموقع العام وتنسيق المخططات التنفيذية لمستشفى كفر شكر.'
    },
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg']
  },
  {
    id: 'administrative-buildings',
    sector: 'administrative',
    year: '2022-2026',
    title:    { en: 'Administrative Buildings',         ar: 'مباني إدارية' },
    location: { en: 'Smart Village & 6th of October City', ar: 'القرية الذكية ومدينة 6 أكتوبر' },
    area:     { en: '',                                 ar: '' },
    role:     { en: 'Design and supervision',           ar: 'التصميم والإشراف' },
    summary:  { en: 'Office and administrative buildings.',
                ar: 'مباني مكتبية وإدارية.' },
    description: {
      en: 'Design of administrative buildings in Smart Village and 6th of October City, and supervision of an administrative building in Abu Rawash.',
      ar: 'تصميم مباني إدارية في القرية الذكية ومدينة 6 أكتوبر، والإشراف على مبنى إداري في أبو رواش.'
    },
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg']
  },
  {
    id: 'villas-residential',
    sector: 'residential',
    year: '',
    title:    { en: 'Villas & Residential Buildings',   ar: 'فيلات ومباني سكنية' },
    location: { en: '6th of October & Sheikh Zayed', ar: '6 أكتوبر والشيخ زايد' },
    area:     { en: '',                                 ar: '' },
    role:     { en: 'Design and supervision',           ar: 'التصميم والإشراف' },
    summary:  { en: 'Private villas and residential buildings.',
                ar: 'فيلات ومباني سكنية خاصة.' },
    description: {
      en: 'Design and supervision of villas and residential buildings in 6th of October City and Sheikh Zayed City, including projects in Allegria Compound.',
      ar: 'تصميم وإشراف على فيلات ومباني سكنية في مدينة 6 أكتوبر ومدينة الشيخ زايد، ومنها مشروعات في كمبوند أليجريا.'
    },
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg']
  },
  {
    id: 'downtown-cairo-rehabilitation',
    sector: 'heritage',
    year: '2002',
    title: { en: 'Architectural Documentation of Historic Downtown Cairo', ar: 'التوثيق المعماري لمنطقة وسط القاهرة التاريخية'},
    location: { en: 'Downtown Cairo, Egypt', ar: 'وسط القاهرة، مصر' },
    area: { en: 'Khedivial Cairo', ar: 'القاهرة الخديوية' },
    role: { en: 'Architectural surveying and documentation under the supervision of Prof. Dr. Soheir Hawas', ar: 'أعمال الرفع والتوثيق المعماري تحت إشراف أ.د. سهير حواس' },
    summary: { en: 'Architectural documentation of historic buildings and urban character in Khedivial Cairo.', ar: 'توثيق المباني التاريخية والطابع العمراني لمنطقة القاهرة الخديوية.' },
    description: {
       en: 'Participated in architectural surveying, documentation and preparation of drawings for the Khedivial Cairo project in 2002, under the supervision of Prof. Dr. Soheir Hawas. The work contributed to documenting the architectural character and historic buildings of Downtown Cairo as part of the area’s rehabilitation studies.',
       ar: 'المشاركة في أعمال الرفع والتوثيق المعماري وإعداد الرسومات لمشروع القاهرة الخديوية عام 2002، تحت إشراف الأستاذة الدكتورة سهير حواس، وذلك للمساهمة في توثيق الطابع المعماري والمباني التاريخية لمنطقة وسط القاهرة ضمن دراسات تطوير المنطقة.'
     },
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
  }
];
